"use client";

import { useEffect } from 'react';
import useFluidCursor from '@/hooks/use-FluidCursor';

export default function FluidCursor({ isActive = true, onTriggerReady }) {
    const { canvasRef, triggerSplat } = useFluidCursor(isActive);

    useEffect(() => {
        if (onTriggerReady && triggerSplat) {
            onTriggerReady(triggerSplat);
        }
    }, [triggerSplat, onTriggerReady]);

    if (!isActive) return null;

    return (
        <div className="fixed top-0 left-0 z-20 pointer-events-none w-full h-full">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}
