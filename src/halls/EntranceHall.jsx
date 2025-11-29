import React from 'react';
import { motion } from 'framer-motion';
import CoinCanvas from '../components/CoinCanvas';

const EntranceHall = () => {
    return (
        <section id="entrance" className="section entrance-hall">
            <div className="entrance-content" style={{ textAlign: 'center', zIndex: 10 }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="title"
                    style={{ fontSize: '4rem', marginBottom: '1rem' }}
                >
                    $bsadnqtri[
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="subtitle"
                    style={{ fontSize: '1.5rem', color: '#a0a0a0', marginBottom: '2rem' }}
                >
                    Explore the history, art, and future of value.
                </motion.p>

                {/* 3D Coin */}
                <div className="coin-container" style={{ height: '400px', margin: '2rem 0' }}>
                    <CoinCanvas />
                </div>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="enter-btn"
                    onClick={() => document.getElementById('history').scrollIntoView({ behavior: 'smooth' })}
                    style={{
                        marginTop: '2rem',
                        padding: '1rem 3rem',
                        fontSize: '1.2rem',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                    }}
                >
                    Enter Museum
                </motion.button>
            </div>
        </section>
    );
};

export default EntranceHall;
