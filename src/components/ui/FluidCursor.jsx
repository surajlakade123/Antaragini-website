import { useEffect } from 'react';
import useFluidCursor from '@/hooks/use-FluidCursor';

export default function FluidCursor() {
    useEffect(() => {
        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.id = 'fluid';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        document.body.appendChild(canvas);

        // Initialize fluid cursor
        useFluidCursor();

        // Cleanup
        return () => {
            const existingCanvas = document.getElementById('fluid');
            if (existingCanvas) {
                document.body.removeChild(existingCanvas);
            }
        };
    }, []);

    return null;
}
