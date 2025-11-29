import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ExternalLink } from 'lucide-react';

const shopItems = [
    { id: 1, title: 'Official Merch', description: 'Hoodies, Tees, and Physical Coins', link: '#', color: '#FFD700' },
    { id: 2, title: 'NFT Collection', description: 'Buy on MagicEden', link: 'https://magiceden.io', color: '#9D4EDD' },
    { id: 3, title: 'Buy $WEALTH', description: 'Trade on Jupiter', link: 'https://jup.ag', color: '#00C2FF' },
];

const ShopHall = () => {
    return (
        <section id="shop" className="section shop-hall" style={{ minHeight: '100vh', padding: '4rem 0', background: '#111' }}>
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="hall-title"
                style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '3rem' }}
            >
                Museum <span className="text-gold">Shop</span>
            </motion.h2>

            <div className="shop-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 20px'
            }}>
                {shopItems.map((item, index) => (
                    <motion.a
                        key={item.id}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        style={{
                            display: 'block',
                            background: '#1a1a1a',
                            border: `1px solid ${item.color}`,
                            borderRadius: '16px',
                            padding: '3rem 2rem',
                            textAlign: 'center',
                            textDecoration: 'none',
                            color: '#fff',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{
                            background: item.color,
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem auto',
                            boxShadow: `0 0 20px ${item.color}`
                        }}>
                            <ShoppingBag color="#000" />
                        </div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                        <p style={{ color: '#aaa', marginBottom: '2rem' }}>{item.description}</p>
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: item.color,
                            fontWeight: 'bold'
                        }}>
                            Visit Store <ExternalLink size={16} />
                        </span>
                    </motion.a>
                ))}
            </div>
        </section>
    );
};

export default ShopHall;
