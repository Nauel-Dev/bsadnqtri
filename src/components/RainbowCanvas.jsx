import React, { useRef, useEffect, useState } from 'react';

const RainbowCanvas = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const lastPos = useRef({ x: 0, y: 0 });
    const hue = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const startDrawing = (e) => {
            setIsDrawing(true);
            lastPos.current = { x: e.clientX, y: e.clientY };
        };

        const stopDrawing = () => {
            setIsDrawing(false);
            ctx.beginPath(); // Reset path to avoid connecting lines
        };

        const draw = (e) => {
            if (!isDrawing) return;

            ctx.beginPath();
            ctx.moveTo(lastPos.current.x, lastPos.current.y);
            ctx.lineTo(e.clientX, e.clientY);
            ctx.strokeStyle = `hsl(${hue.current}, 100%, 50%)`;
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();

            lastPos.current = { x: e.clientX, y: e.clientY };
            hue.current = (hue.current + 5) % 360;
        };

        // We attach listeners to window to capture events everywhere
        window.addEventListener('mousedown', startDrawing);
        window.addEventListener('mouseup', stopDrawing);
        window.addEventListener('mousemove', draw);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousedown', startDrawing);
            window.removeEventListener('mouseup', stopDrawing);
            window.removeEventListener('mousemove', draw);
        };
    }, [isDrawing]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none', // Allow clicks to pass through
                zIndex: 9999 // On top of everything
            }}
        />
    );
};

export default RainbowCanvas;
