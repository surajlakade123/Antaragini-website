import { useEffect, useRef, useCallback } from 'react';

// WebGL Fluid Simulation
// Adapted to support programmatic splat triggers from external components

const config = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,
    CAPTURE_RESOLUTION: 512,
    DENSITY_DISSIPATION: 1,
    VELOCITY_DISSIPATION: 0.2,
    PRESSURE: 0.8,
    PRESSURE_ITERATIONS: 20,
    CURL: 30,
    SPLAT_RADIUS: 0.25,
    SPLAT_FORCE: 6000,
    SHADING: true,
    COLORFUL: true,
    COLOR_UPDATE_SPEED: 10,
    PAUSED: false,
    BACK_COLOR: { r: 0, g: 0, b: 0 },
    TRANSPARENT: true,
    BLOOM: true,
    BLOOM_ITERATIONS: 8,
    BLOOM_RESOLUTION: 256,
    BLOOM_INTENSITY: 0.8,
    BLOOM_THRESHOLD: 0.6,
    BLOOM_SOFT_KNEE: 0.7,
    SUNRAYS: true,
    SUNRAYS_RESOLUTION: 196,
    SUNRAYS_WEIGHT: 1.0,
};

function useFluidCursor(isActive = true) {
    const canvasRef = useRef(null);
    const glRef = useRef(null);
    const programsRef = useRef({});
    const pointersRef = useRef([]);
    const splatStackRef = useRef([]);
    const animationFrameRef = useRef(null);

    // External API: Trigger a splat at specific screen coordinates
    const triggerSplat = useCallback((x, y, dx = 0, dy = 0, color = null) => {
        if (!glRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const pointer = {
            id: -1,
            texcoordX: x / canvas.width,
            texcoordY: 1.0 - y / canvas.height,
            prevTexcoordX: (x - dx) / canvas.width,
            prevTexcoordY: 1.0 - (y - dy) / canvas.height,
            deltaX: dx,
            deltaY: dy,
            down: true,
            moved: Math.abs(dx) > 0 || Math.abs(dy) > 0,
            color: color || generateColor()
        };

        splatStackRef.current.push(pointer);
    }, []);

    useEffect(() => {
        if (!isActive) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const { gl, ext } = getWebGLContext(canvas);
        if (!gl) return;

        glRef.current = gl;

        // Initialize WebGL programs
        const programs = initPrograms(gl, ext);
        programsRef.current = programs;

        // Initialize framebuffers
        let velocity, density, pressure, divergence, curl, bloom, sunrays;

        initFramebuffers();

        let lastUpdateTime = Date.now();
        let colorUpdateTimer = 0.0;

        function update() {
            resizeCanvas();
            let dt = calcDeltaTime();
            if (dt < 1.0 / 240.0) dt = 1.0 / 240.0;

            if (!config.PAUSED) updateColors(dt);

            applyInputs();

            if (!config.PAUSED) {
                step(dt);
            }

            render(null);

            animationFrameRef.current = requestAnimationFrame(update);
        }

        function resizeCanvas() {
            if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;
                initFramebuffers();
            }
        }

        function initFramebuffers() {
            const simRes = getResolution(gl, config.SIM_RESOLUTION);
            const dyeRes = getResolution(gl, config.DYE_RESOLUTION);

            velocity = createDoubleFBO(gl, simRes.width, simRes.height, ext.formatRGBA.internalFormat, ext.formatRGBA.format, ext.halfFloatTexType, gl.LINEAR);
            density = createDoubleFBO(gl, dyeRes.width, dyeRes.height, ext.formatRGBA.internalFormat, ext.formatRGBA.format, ext.halfFloatTexType, gl.LINEAR);
            pressure = createDoubleFBO(gl, simRes.width, simRes.height, ext.formatR.internalFormat, ext.formatR.format, ext.halfFloatTexType, gl.NEAREST);
            divergence = createFBO(gl, simRes.width, simRes.height, ext.formatR.internalFormat, ext.formatR.format, ext.halfFloatTexType, gl.NEAREST);
            curl = createFBO(gl, simRes.width, simRes.height, ext.formatR.internalFormat, ext.formatR.format, ext.halfFloatTexType, gl.NEAREST);

            bloom = config.BLOOM ? initBloomFramebuffers(gl, ext) : null;
            sunrays = config.SUNRAYS ? initSunraysFramebuffers(gl, ext) : null;
        }

        function calcDeltaTime() {
            const now = Date.now();
            let dt = (now - lastUpdateTime) / 1000;
            dt = Math.min(dt, 0.016666);
            lastUpdateTime = now;
            return dt;
        }

        function updateColors(dt) {
            if (!config.COLORFUL) return;

            colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
            if (colorUpdateTimer >= 1) {
                colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
                pointersRef.current.forEach(p => {
                    p.color = generateColor();
                });
            }
        }

        function applyInputs() {
            if (splatStackRef.current.length > 0) {
                multipleSplats(splatStackRef.current.length);
            }

            pointersRef.current.forEach(p => {
                if (p.moved) {
                    p.moved = false;
                    splatPointer(p);
                }
            });
        }

        function step(dt) {
            gl.disable(gl.BLEND);

            programs.curlProgram.bind();
            gl.uniform2f(programs.curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(programs.curlProgram.uniforms.uVelocity, velocity.read.attach(0));
            blit(curl);

            programs.vorticityProgram.bind();
            gl.uniform2f(programs.vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(programs.vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
            gl.uniform1i(programs.vorticityProgram.uniforms.uCurl, curl.attach(1));
            gl.uniform1f(programs.vorticityProgram.uniforms.curl, config.CURL);
            gl.uniform1f(programs.vorticityProgram.uniforms.dt, dt);
            blit(velocity.write);
            velocity.swap();

            programs.divergenceProgram.bind();
            gl.uniform2f(programs.divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(programs.divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
            blit(divergence);

            programs.clearProgram.bind();
            gl.uniform1i(programs.clearProgram.uniforms.uTexture, pressure.read.attach(0));
            gl.uniform1f(programs.clearProgram.uniforms.value, config.PRESSURE);
            blit(pressure.write);
            pressure.swap();

            programs.pressureProgram.bind();
            gl.uniform2f(programs.pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(programs.pressureProgram.uniforms.uDivergence, divergence.attach(0));
            for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
                gl.uniform1i(programs.pressureProgram.uniforms.uPressure, pressure.read.attach(1));
                blit(pressure.write);
                pressure.swap();
            }

            programs.gradientSubtractProgram.bind();
            gl.uniform2f(programs.gradientSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(programs.gradientSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
            gl.uniform1i(programs.gradientSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
            blit(velocity.write);
            velocity.swap();

            programs.advectionProgram.bind();
            gl.uniform2f(programs.advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            if (!ext.supportLinearFiltering) {
                gl.uniform2f(programs.advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
            }
            const velocityId = velocity.read.attach(0);
            gl.uniform1i(programs.advectionProgram.uniforms.uVelocity, velocityId);
            gl.uniform1i(programs.advectionProgram.uniforms.uSource, velocityId);
            gl.uniform1f(programs.advectionProgram.uniforms.dt, dt);
            gl.uniform1f(programs.advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
            blit(velocity.write);
            velocity.swap();

            gl.uniform2f(programs.advectionProgram.uniforms.texelSize, density.texelSizeX, density.texelSizeY);
            if (!ext.supportLinearFiltering) {
                gl.uniform2f(programs.advectionProgram.uniforms.dyeTexelSize, density.texelSizeX, density.texelSizeY);
            }
            gl.uniform1i(programs.advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
            gl.uniform1i(programs.advectionProgram.uniforms.uSource, density.read.attach(1));
            gl.uniform1f(programs.advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
            blit(density.write);
            density.swap();
        }

        function render(target) {
            if (config.BLOOM) applyBloom(density.read, bloom);
            if (config.SUNRAYS) {
                applySunrays(density.read, density.write, sunrays);
                blur(density.write, density.read, 1);
            }

            if (target == null || !config.TRANSPARENT) {
                if (config.TRANSPARENT) {
                    gl.blendFunc(gl.ONE, gl.ONE);
                } else {
                    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                }
                gl.enable(gl.BLEND);
            } else {
                gl.disable(gl.BLEND);
            }

            const width = target == null ? gl.drawingBufferWidth : target.width;
            const height = target == null ? gl.drawingBufferHeight : target.height;
            gl.viewport(0, 0, width, height);

            const program = config.SHADING ? programs.colorProgram : programs.baseVertexShader;
            program.bind();
            gl.uniform1i(program.uniforms.uTexture, density.read.attach(0));

            if (config.BLOOM) {
                gl.uniform1i(program.uniforms.uBloom, bloom.final.attach(1));
                gl.uniform1f(program.uniforms.uDithering, config.BLOOM_DITHERING);
            }
            if (config.SUNRAYS) {
                gl.uniform1i(program.uniforms.uSunrays, sunrays.final.attach(2));
            }

            blit(target);
        }

        function applyBloom(source, destination) {
            if (destination.length < 2) return;

            let last = destination[0];
            gl.disable(gl.BLEND);
            programs.bloomPrefilterProgram.bind();
            const knee = config.BLOOM_THRESHOLD * config.BLOOM_SOFT_KNEE + 0.0001;
            const curve0 = config.BLOOM_THRESHOLD - knee;
            const curve1 = knee * 2;
            const curve2 = 0.25 / knee;
            gl.uniform3f(programs.bloomPrefilterProgram.uniforms.curve, curve0, curve1, curve2);
            gl.uniform1f(programs.bloomPrefilterProgram.uniforms.threshold, config.BLOOM_THRESHOLD);
            gl.uniform1i(programs.bloomPrefilterProgram.uniforms.uTexture, source.attach(0));
            blit(last);

            programs.bloomBlurProgram.bind();
            for (let i = 0; i < destination.length; i++) {
                const dest = destination[i];
                gl.uniform2f(programs.bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
                gl.uniform1i(programs.bloomBlurProgram.uniforms.uTexture, last.attach(0));
                blit(dest);
                last = dest;
            }

            gl.blendFunc(gl.ONE, gl.ONE);
            gl.enable(gl.BLEND);

            for (let i = destination.length - 2; i >= 0; i--) {
                const baseTex = destination[i];
                gl.uniform2f(programs.bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
                gl.uniform1i(programs.bloomBlurProgram.uniforms.uTexture, last.attach(0));
                gl.viewport(0, 0, baseTex.width, baseTex.height);
                blit(baseTex);
                last = baseTex;
            }

            gl.disable(gl.BLEND);
            programs.bloomFinalProgram.bind();
            gl.uniform2f(programs.bloomFinalProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
            gl.uniform1i(programs.bloomFinalProgram.uniforms.uTexture, last.attach(0));
            gl.uniform1f(programs.bloomFinalProgram.uniforms.intensity, config.BLOOM_INTENSITY);
            blit(destination.final);
        }

        function applySunrays(source, mask, destination) {
            gl.disable(gl.BLEND);
            programs.sunraysMaskProgram.bind();
            gl.uniform1i(programs.sunraysMaskProgram.uniforms.uTexture, source.attach(0));
            blit(mask);

            programs.sunraysProgram.bind();
            gl.uniform1f(programs.sunraysProgram.uniforms.weight, config.SUNRAYS_WEIGHT);
            gl.uniform1i(programs.sunraysProgram.uniforms.uTexture, mask.attach(0));
            blit(destination.final);
        }

        function blur(target, temp, iterations) {
            programs.blurProgram.bind();
            for (let i = 0; i < iterations; i++) {
                gl.uniform2f(programs.blurProgram.uniforms.texelSize, target.texelSizeX, 0.0);
                gl.uniform1i(programs.blurProgram.uniforms.uTexture, target.attach(0));
                blit(temp);

                gl.uniform2f(programs.blurProgram.uniforms.texelSize, 0.0, target.texelSizeY);
                gl.uniform1i(programs.blurProgram.uniforms.uTexture, temp.attach(0));
                blit(target);
            }
        }

        function splatPointer(pointer) {
            const dx = pointer.deltaX * config.SPLAT_FORCE;
            const dy = pointer.deltaY * config.SPLAT_FORCE;
            splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
        }

        function multipleSplats(amount) {
            for (let i = 0; i < amount; i++) {
                const color = generateColor();
                const pointer = splatStackRef.current.shift();
                if (pointer) {
                    splat(pointer.texcoordX, pointer.texcoordY, pointer.deltaX * config.SPLAT_FORCE, pointer.deltaY * config.SPLAT_FORCE, color);
                }
            }
        }

        function splat(x, y, dx, dy, color) {
            programs.splatProgram.bind();
            gl.uniform1i(programs.splatProgram.uniforms.uTarget, velocity.read.attach(0));
            gl.uniform1f(programs.splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
            gl.uniform2f(programs.splatProgram.uniforms.point, x, y);
            gl.uniform3f(programs.splatProgram.uniforms.color, dx, dy, 0.0);
            gl.uniform1f(programs.splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
            blit(velocity.write);
            velocity.swap();

            gl.uniform1i(programs.splatProgram.uniforms.uTarget, density.read.attach(0));
            gl.uniform3f(programs.splatProgram.uniforms.color, color.r, color.g, color.b);
            blit(density.write);
            density.swap();
        }

        function correctRadius(radius) {
            const aspectRatio = canvas.width / canvas.height;
            if (aspectRatio > 1) radius *= aspectRatio;
            return radius;
        }

        function blit(target) {
            if (target == null) {
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            } else {
                gl.viewport(0, 0, target.width, target.height);
                gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
            }
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }

        // Mouse/Touch event handlers
        function handleMouseMove(e) {
            const posX = scaleByPixelRatio(e.clientX);
            const posY = scaleByPixelRatio(e.clientY);
            updatePointerMoveData(0, posX, posY);
        }

        function handleTouchMove(e) {
            e.preventDefault();
            const touches = e.targetTouches;
            for (let i = 0; i < touches.length; i++) {
                const posX = scaleByPixelRatio(touches[i].clientX);
                const posY = scaleByPixelRatio(touches[i].clientY);
                updatePointerMoveData(touches[i].identifier, posX, posY);
            }
        }

        function updatePointerMoveData(id, posX, posY) {
            let pointer = pointersRef.current.find(p => p.id === id);
            if (pointer == null) {
                pointer = {
                    id,
                    texcoordX: posX / canvas.width,
                    texcoordY: 1.0 - posY / canvas.height,
                    prevTexcoordX: posX / canvas.width,
                    prevTexcoordY: 1.0 - posY / canvas.height,
                    deltaX: 0,
                    deltaY: 0,
                    down: false,
                    moved: false,
                    color: generateColor()
                };
                pointersRef.current.push(pointer);
            }

            pointer.prevTexcoordX = pointer.texcoordX;
            pointer.prevTexcoordY = pointer.texcoordY;
            pointer.texcoordX = posX / canvas.width;
            pointer.texcoordY = 1.0 - posY / canvas.height;
            pointer.deltaX = (pointer.texcoordX - pointer.prevTexcoordX) * 10.0;
            pointer.deltaY = (pointer.texcoordY - pointer.prevTexcoordY) * 10.0;
            pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
        }

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        // Initialize with some random splats
        multipleSplats(Math.random() * 20 + 5);

        update();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [isActive]);

    return { canvasRef, triggerSplat };
}

// Helper functions
function scaleByPixelRatio(input) {
    const pixelRatio = window.devicePixelRatio || 1;
    return Math.floor(input * pixelRatio);
}

function generateColor() {
    const c = HSVtoRGB(Math.random(), 1.0, 1.0);
    c.r *= 0.15;
    c.g *= 0.15;
    c.b *= 0.15;
    return c;
}

function HSVtoRGB(h, s, v) {
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r, g, b;
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return { r, g, b };
}

function wrap(value, min, max) {
    const range = max - min;
    if (range === 0) return min;
    return (value - min) % range + min;
}

function getWebGLContext(canvas) {
    const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };

    let gl = canvas.getContext('webgl2', params);
    const isWebGL2 = !!gl;
    if (!isWebGL2) {
        gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);
    }

    let halfFloat, supportLinearFiltering;
    if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
    } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
    let formatRGBA, formatRG, formatR;

    if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
    } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = formatRGBA;
        formatR = formatRGBA;
    }

    return {
        gl,
        ext: {
            formatRGBA,
            formatRG,
            formatR,
            halfFloatTexType,
            supportLinearFiltering
        }
    };
}

function getSupportedFormat(gl, internalFormat, format, type) {
    if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
            case gl.R16F:
                return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
            case gl.RG16F:
                return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
            default:
                return null;
        }
    }

    return { internalFormat, format };
}

function supportRenderTextureFormat(gl, internalFormat, format, type) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    return status === gl.FRAMEBUFFER_COMPLETE;
}

function getResolution(gl, resolution) {
    let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
    if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;

    const min = Math.round(resolution);
    const max = Math.round(resolution * aspectRatio);

    if (gl.drawingBufferWidth > gl.drawingBufferHeight) {
        return { width: max, height: min };
    } else {
        return { width: min, height: max };
    }
}

function createFBO(gl, w, h, internalFormat, format, type, param) {
    gl.activeTexture(gl.TEXTURE0);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const texelSizeX = 1.0 / w;
    const texelSizeY = 1.0 / h;

    return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX,
        texelSizeY,
        attach(id) {
            gl.activeTexture(gl.TEXTURE0 + id);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            return id;
        }
    };
}

function createDoubleFBO(gl, w, h, internalFormat, format, type, param) {
    let fbo1 = createFBO(gl, w, h, internalFormat, format, type, param);
    let fbo2 = createFBO(gl, w, h, internalFormat, format, type, param);

    return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() {
            return fbo1;
        },
        set read(value) {
            fbo1 = value;
        },
        get write() {
            return fbo2;
        },
        set write(value) {
            fbo2 = value;
        },
        swap() {
            const temp = fbo1;
            fbo1 = fbo2;
            fbo2 = temp;
        }
    };
}

function initPrograms(gl, ext) {
    // Shader source code
    const baseVertexShader = compileShader(gl, gl.VERTEX_SHADER, `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;
    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `);

    const blurVertexShader = compileShader(gl, gl.VERTEX_SHADER, `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform vec2 texelSize;
    void main () {
        vUv = aPosition * 0.5 + 0.5;
        float offset = 1.33333333;
        vL = vUv - texelSize * offset;
        vR = vUv + texelSize * offset;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `);

    const blurShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform sampler2D uTexture;
    void main () {
        vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
        sum += texture2D(uTexture, vL) * 0.35294117;
        sum += texture2D(uTexture, vR) * 0.35294117;
        gl_FragColor = sum;
    }
  `);

    const copyShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
  `);

    const clearShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;
    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
  `);

    const colorShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    uniform vec4 color;
    void main () {
        gl_FragColor = color;
    }
  `);

    const displayShaderSource = `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uSunrays;
    uniform float uDithering;
    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        #ifdef SHADING
            c = pow(c, vec3(1.0 / 2.2));
        #endif
        #ifdef BLOOM
            vec3 bloom = texture2D(uBloom, vUv).rgb;
            c += bloom;
        #endif
        #ifdef SUNRAYS
            float sunrays = texture2D(uSunrays, vUv).r;
            c *= sunrays;
        #endif
        #ifdef DITHERING
            c += uDithering / 255.0;
        #endif
        gl_FragColor = vec4(c, 1.0);
    }
  `;

    const bloomPrefilterShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;
    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        gl_FragColor = vec4(c, 0.0);
    }
  `);

    const bloomBlurShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }
  `);

    const bloomFinalShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;
    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }
  `);

    const sunraysMaskShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    void main () {
        vec4 c = texture2D(uTexture, vUv);
        float br = max(c.r, max(c.g, c.b));
        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
        gl_FragColor = c;
    }
  `);

    const sunraysShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float weight;
    #define ITERATIONS 16
    void main () {
        float Density = 0.3;
        float Decay = 0.95;
        float Exposure = 0.7;
        vec2 coord = vUv;
        vec2 dir = vUv - 0.5;
        dir *= 1.0 / float(ITERATIONS) * Density;
        float illuminationDecay = 1.0;
        float color = texture2D(uTexture, vUv).a;
        for (int i = 0; i < ITERATIONS; i++) {
            coord -= dir;
            float col = texture2D(uTexture, coord).a;
            color += col * illuminationDecay * weight;
            illuminationDecay *= Decay;
        }
        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
    }
  `);

    const splatShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;
    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
  `);

    const advectionShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;
    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;
        vec2 iuv = floor(st);
        vec2 fuv = fract(st);
        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }
    void main () {
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }
  `);

    const divergenceShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
  `);

    const curlShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
  `);

    const vorticityShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;
    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
  `);

    const pressureShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
  `);

    const gradientSubtractShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
  `);

    // Compile all programs
    const blit = (() => {
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);
        return (target) => {
            if (target == null) {
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            } else {
                gl.viewport(0, 0, target.width, target.height);
                gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
            }
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        };
    })();

    const ditheringTexture = createTextureAsync(gl, LDR_LLL1_0);

    const blurProgram = createProgram(gl, blurVertexShader, blurShader);
    const copyProgram = createProgram(gl, baseVertexShader, copyShader);
    const clearProgram = createProgram(gl, baseVertexShader, clearShader);
    let colorShaderSource = displayShaderSource;
    if (config.SHADING) colorShaderSource = '#define SHADING\n' + colorShaderSource;
    if (config.BLOOM) colorShaderSource = '#define BLOOM\n' + colorShaderSource;
    if (config.SUNRAYS) colorShaderSource = '#define SUNRAYS\n' + colorShaderSource;

    const colorProgram = createProgram(gl, baseVertexShader, compileShader(gl, gl.FRAGMENT_SHADER, colorShaderSource));
    const bloomPrefilterProgram = createProgram(gl, baseVertexShader, bloomPrefilterShader);
    const bloomBlurProgram = createProgram(gl, baseVertexShader, bloomBlurShader);
    const bloomFinalProgram = createProgram(gl, baseVertexShader, bloomFinalShader);
    const sunraysMaskProgram = createProgram(gl, baseVertexShader, sunraysMaskShader);
    const sunraysProgram = createProgram(gl, baseVertexShader, sunraysShader);
    const splatProgram = createProgram(gl, baseVertexShader, splatShader);
    const advectionProgram = createProgram(gl, baseVertexShader, ext.supportLinearFiltering ? advectionShader : advectionShader.replace('bilerp', 'texture2D'));
    const divergenceProgram = createProgram(gl, baseVertexShader, divergenceShader);
    const curlProgram = createProgram(gl, baseVertexShader, curlShader);
    const vorticityProgram = createProgram(gl, baseVertexShader, vorticityShader);
    const pressureProgram = createProgram(gl, baseVertexShader, pressureShader);
    const gradientSubtractProgram = createProgram(gl, baseVertexShader, gradientSubtractShader);

    return {
        blurProgram,
        copyProgram,
        clearProgram,
        colorProgram,
        bloomPrefilterProgram,
        bloomBlurProgram,
        bloomFinalProgram,
        sunraysMaskProgram,
        sunraysProgram,
        splatProgram,
        advectionProgram,
        divergenceProgram,
        curlProgram,
        vorticityProgram,
        pressureProgram,
        gradientSubtractProgram,
        baseVertexShader: copyProgram
    };
}

function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
    }

    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
    }

    const uniforms = {};
    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
        const uniformName = gl.getActiveUniform(program, i).name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
    }

    return {
        program,
        uniforms,
        bind() {
            gl.useProgram(program);
        }
    };
}

function initBloomFramebuffers(gl, ext) {
    const res = getResolution(gl, config.BLOOM_RESOLUTION);

    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    const bloom = [];

    for (let i = 0; i < config.BLOOM_ITERATIONS; i++) {
        const width = res.width >> (i + 1);
        const height = res.height >> (i + 1);

        if (width < 2 || height < 2) break;

        const fbo = createFBO(gl, width, height, rgba.internalFormat, rgba.format, texType, filtering);
        bloom.push(fbo);
    }

    bloom.final = bloom[0];
    return bloom;
}

function initSunraysFramebuffers(gl, ext) {
    const res = getResolution(gl, config.SUNRAYS_RESOLUTION);

    const texType = ext.halfFloatTexType;
    const r = ext.formatR;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    const sunrays = createFBO(gl, res.width, res.height, r.internalFormat, r.format, texType, filtering);
    sunrays.final = sunrays;

    return sunrays;
}

function createTextureAsync(gl, url) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255]));

    const obj = {
        texture,
        width: 1,
        height: 1,
        attach(id) {
            gl.activeTexture(gl.TEXTURE0 + id);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            return id;
        }
    };

    return obj;
}

const LDR_LLL1_0 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';

export default useFluidCursor;
