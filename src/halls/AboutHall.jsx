import React from 'react';
import { motion } from 'framer-motion';
import { Twitter } from 'lucide-react';
import founderImg from '../assets/founder.png';
import devImg from '../assets/dev.png';
import communityImg from '../assets/community.png';

const team = [
    { id: 1, name: 'Founder', role: 'Visionary', img: founderImg },
    { id: 2, name: 'Dev', role: 'Architect', img: devImg },
    { id: 3, name: 'Community', role: 'Manager', img: communityImg },
];

const AboutHall = () => {
    return (
        <section id="about" className="section about-hall" style={{ minHeight: '100vh', padding: '4rem 0', background: '#0a0a0a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

            <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="hall-title"
                    style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '3rem' }}
                >
                    The <span className="text-gold">Team</span>
                </motion.h2>

                <div className="team-grid" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '3rem',
                    flexWrap: 'wrap',
                    marginBottom: '5rem'
                }}>
                    {team.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="team-card"
                            style={{
                                width: '250px',
                                height: '300px',
                                position: 'relative',
                                background: '#1a1a1a',
                                borderRadius: '16px',
                                border: '1px solid var(--color-gold-dim)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1rem',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                            }}
                        >
                            <img
                                src={member.img}
                                alt={member.name}
                                style={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    marginBottom: '1rem',
                                    border: '2px solid var(--color-gold)',
                                    objectFit: 'cover'
                                }}
                            />
                            <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{member.name}</h3>
                            <span style={{ color: 'var(--color-purple)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{member.role}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer style={{
                borderTop: '1px solid rgba(255,255,255,0.1)',
                padding: '3rem 0',
                background: '#050505'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                    <div>
                        <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>$bsadnqtri[</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>© 2025 All Rights Reserved.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <a href="https://x.com/i/communities/1992720963960807785" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaa' }}><Twitter size={20} /> Community</a>
                    </div>
                </div>
            </footer>

        </section>
    );
};

export default AboutHall;
