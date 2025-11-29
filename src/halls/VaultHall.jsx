import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, TrendingUp, DollarSign, Activity } from 'lucide-react';

const VaultHall = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [tokenData, setTokenData] = useState(null);
    const [loading, setLoading] = useState(true);

    // DexScreener URL for CA: 4wVtRm2CExz1CN3jp8ujNNhiCSKMVerdYPTXTby4pump
    const ca = "4wVtRm2CExz1CN3jp8ujNNhiCSKMVerdYPTXTby4pump";
    const chartUrl = `https://dexscreener.com/solana/${ca}?embed=1&theme=dark&trades=0&info=0`;

    useEffect(() => {
        const fetchTokenData = async () => {
            try {
                const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${ca}`);
                const data = await response.json();
                if (data.pairs && data.pairs.length > 0) {
                    // Get the pair with the highest liquidity (usually the first one, but good to be safe)
                    const pair = data.pairs[0];
                    setTokenData({
                        price: pair.priceUsd,
                        priceChange: pair.priceChange.h24,
                        marketCap: pair.fdv, // Fully Diluted Valuation often used as Market Cap for memes
                        liquidity: pair.liquidity.usd
                    });
                }
            } catch (error) {
                console.error("Error fetching token data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTokenData();
        // Refresh every 30 seconds
        const interval = setInterval(fetchTokenData, 30000);
        return () => clearInterval(interval);
    }, []);

    const formatCurrency = (value) => {
        if (!value) return '---';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: value < 0.01 ? 6 : 2,
            maximumFractionDigits: value < 0.01 ? 6 : 2
        }).format(value);
    };

    const formatCompact = (value) => {
        if (!value) return '---';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: "compact",
            maximumFractionDigits: 1
        }).format(value);
    };

    return (
        <section id="vault" className="section vault-hall" style={{ minHeight: '100vh', padding: '4rem 0', background: '#0a0a0a' }}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="hall-title"
                    style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '3rem' }}
                >
                    The <span className="text-gold">Vault</span>
                </motion.h2>

                <div className="vault-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>

                    {/* Chart Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="chart-container"
                        style={{
                            background: '#1a1a1a',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: '1px solid var(--color-gold-dim)',
                            height: '500px',
                            position: 'relative',
                            boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                        }}
                    >
                        <iframe
                            src={chartUrl}
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            title="DexScreener"
                        />
                        <button
                            onClick={() => setIsExpanded(true)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'rgba(0,0,0,0.6)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.8rem'
                            }}
                        >
                            <Maximize2 size={16} /> Expand
                        </button>
                    </motion.div>

                    {/* Stats Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="stats-panel"
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    >
                        <div className="stat-card" style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888', marginBottom: '0.5rem' }}>
                                <DollarSign size={18} color="var(--color-gold)" /> Price
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>
                                {loading ? 'Loading...' : formatCurrency(tokenData?.price)}
                            </div>
                            <div style={{ color: tokenData?.priceChange >= 0 ? '#0f0' : '#f00', fontSize: '0.9rem' }}>
                                {loading ? '' : `${tokenData?.priceChange > 0 ? '+' : ''}${tokenData?.priceChange}% (24h)`}
                            </div>
                        </div>

                        <div className="stat-card" style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888', marginBottom: '0.5rem' }}>
                                <TrendingUp size={18} color="var(--color-purple)" /> Market Cap
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
                                {loading ? 'Loading...' : formatCompact(tokenData?.marketCap)}
                            </div>
                        </div>

                        <div className="stat-card" style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888', marginBottom: '0.5rem' }}>
                                <Activity size={18} color="#00C2FF" /> Liquidity
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
                                {loading ? 'Loading...' : formatCompact(tokenData?.liquidity)}
                            </div>
                        </div>

                        <button
                            style={{
                                width: '100%',
                                padding: '1rem',
                                fontSize: '1.1rem',
                                background: 'linear-gradient(45deg, var(--color-gold), #B8860B)',
                                color: '#000',
                                border: 'none',
                                marginTop: '1rem'
                            }}
                            onClick={() => window.open('https://jup.ag/?sell=So11111111111111111111111111111111111111112&buy=4wVtRm2CExz1CN3jp8ujNNhiCSKMVerdYPTXTby4pump', '_blank')}
                        >
                            Buy on Jupiter
                        </button>
                    </motion.div>

                </div>
            </div>

            {/* Expanded Modal */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.95)',
                            zIndex: 3000,
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <button
                            onClick={() => setIsExpanded(false)}
                            style={{
                                alignSelf: 'flex-end',
                                marginBottom: '1rem',
                                background: 'transparent',
                                border: '1px solid #fff',
                                color: '#fff'
                            }}
                        >
                            <X /> Close
                        </button>
                        <iframe
                            src={chartUrl}
                            style={{ width: '100%', flex: 1, border: 'none', borderRadius: '8px' }}
                            title="DexScreener Full"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default VaultHall;
