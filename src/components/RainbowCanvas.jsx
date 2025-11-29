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

        // Mouse events
        const startDrawing = (e) => {
            setIsDrawing(true);
            lastPos.current = { x: e.clientX, y: e.clientY };
        };

        const stopDrawing = () => {
            setIsDrawing(false);
            ctx.beginPath();
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

        // Touch events
        const startTouch = (e) => {
            // Prevent default to stop scrolling while drawing
            if (e.target === canvas) e.preventDefault();
            const touch = e.touches[0];
            setIsDrawing(true);
            lastPos.current = { x: touch.clientX, y: touch.clientY };
        };

        const moveTouch = (e) => {
            if (!isDrawing) return;
            if (e.target === canvas) e.preventDefault();
            const touch = e.touches[0];

            ctx.beginPath();
            ctx.moveTo(lastPos.current.x, lastPos.current.y);
            ctx.lineTo(touch.clientX, touch.clientY);
            ctx.strokeStyle = `hsl(${hue.current}, 100%, 50%)`;
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();

            lastPos.current = { x: touch.clientX, y: touch.clientY };
            hue.current = (hue.current + 5) % 360;
        };

        window.addEventListener('mousedown', startDrawing);
        window.addEventListener('mouseup', stopDrawing);
        window.addEventListener('mousemove', draw);

        // Add passive: false to allow preventDefault
        canvas.addEventListener('touchstart', startTouch, { passive: false });
        canvas.addEventListener('touchend', stopDrawing);
        canvas.addEventListener('touchmove', moveTouch, { passive: false });

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousedown', startDrawing);
            window.removeEventListener('mouseup', stopDrawing);
            window.removeEventListener('mousemove', draw);

            canvas.removeEventListener('touchstart', startTouch);
            canvas.removeEventListener('touchend', stopDrawing);
            canvas.removeEventListener('touchmove', moveTouch);
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
