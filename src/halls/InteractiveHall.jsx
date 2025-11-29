import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Trophy } from 'lucide-react';

const InteractiveHall = () => {
    const [score, setScore] = useState(0);
    const [coins, setCoins] = useState([]);
    const [won, setWon] = useState(false);

    // Spawn coins
    useEffect(() => {
        if (won) return;

        const interval = setInterval(() => {
            if (coins.length < 5) {
                const newCoin = {
                    id: Date.now(),
                    x: Math.random() * 80 + 10, // 10% to 90%
                    y: Math.random() * 60 + 20, // 20% to 80%
                };
                setCoins(prev => [...prev, newCoin]);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [coins, won]);

    const collectCoin = (id) => {
        setCoins(prev => prev.filter(c => c.id !== id));
        setScore(prev => {
            const newScore = prev + 1;
            if (newScore >= 10) setWon(true);
            return newScore;
        });

        // Play sound (placeholder)
        // new Audio('/coin.mp3').play().catch(() => {});
    };

    return (
        <section id="interactive" className="section interactive-hall" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: 'radial-gradient(circle at center, #2a1a3a 0%, #000 100%)' }}>

            {/* UI Overlay */}
            <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Coins color="var(--color-gold)" />
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-gold)' }}>{score} / 10</span>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem', zIndex: 5, position: 'relative' }}>
                <h2 className="hall-title">The <span className="text-gold">Hunt</span></h2>
                <p style={{ color: '#aaa' }}>Collect 10 coins to reveal the treasure.</p>
            </div>

            {/* Game Area */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <AnimatePresence>
                    {!won && coins.map(coin => (
                        <motion.button
                            key={coin.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            transition={{ y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
                            onClick={() => collectCoin(coin.id)}
                            style={{
                                position: 'absolute',
                                left: `${coin.x}%`,
                                top: `${coin.y}%`,
                                pointerEvents: 'auto',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                boxShadow: 'none' // Override global button style
                            }}
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: 'radial-gradient(circle at 30% 30%, #FFD700, #B8860B)',
                                borderRadius: '50%',
                                boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                color: '#5e4300'
                            }}>
                                $
                            </div>
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>

            {/* Win State */}
            <AnimatePresence>
                {won && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0,0,0,0.8)',
                            zIndex: 20
                        }}
                    >
                        <motion.div
                            animate={{ rotateY: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Trophy size={120} color="var(--color-gold)" />
                        </motion.div>
                        <h1 style={{ fontSize: '4rem', color: 'var(--color-gold)', marginTop: '2rem', textShadow: '0 0 20px var(--color-gold)' }}>
                            TREASURE UNLOCKED
                        </h1>
                        <p style={{ fontSize: '1.5rem', color: '#fff' }}>You are a true collector.</p>
                        <button
                            onClick={() => { setScore(0); setWon(false); }}
                            style={{ marginTop: '2rem', fontSize: '1.2rem', padding: '1rem 2rem' }}
                        >
                            Play Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
};

export default InteractiveHall;
