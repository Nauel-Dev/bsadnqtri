import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const milestones = [
    {
        id: 1,
        year: '600 BC',
        title: 'The First $bsadnqtri[',
        description: 'Lorizzle ipsum $bsadnqtri[ sit amizzle, consectetuer adipiscing elit. Nullizzle sapizzle velizzle, $bsadnqtri[ volutpizzle, suscipizzle quizzle, gravida vizzle, arcizzle.',
        details: 'Maecenizzle $bsadnqtri[ augizzle. Curabitizzle faucibizzle mattizzle mi. Donizzle bsadnqtri[ nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
    },
    {
        id: 2,
        year: '11th Century',
        title: 'Paper $bsadnqtri[',
        description: 'Bling bling $bsadnqtri[ sed diam. Ut check it out enim ad minim veniam, quis nostrud exercitizzle ullamcorpizzle suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
        details: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        id: 3,
        year: '1971',
        title: 'Fiat $bsadnqtri[',
        description: 'Curabitizzle $bsadnqtri[ fo shizzle nisi. Nunc cool est. Maecenizzle convallizzle, arcu quis daahng elementum, nisl nisl placeraat sem, in semper purizzle ipsizzle sit amet velizzle.',
        details: 'Vestibulum in $bsadnqtri[ a ante varius dictum. Etiam egestas wisi a erat. Aliquam erat volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.'
    },
    {
        id: 4,
        year: '2009',
        title: 'Digital $bsadnqtri[',
        description: 'Pellentesque $bsadnqtri[ habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Donec nonummy, enim in interdum commodo.',
        details: 'Opes $bsadnqtri[ delar. Lorizzle ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi.'
    },
    {
        id: 5,
        year: '2020',
        title: '$bsadnqtri[ Summer',
        description: 'Sed $bsadnqtri[ dignissim lacinia justo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla tinci.',
        details: 'Fusce $bsadnqtri[ wisi. Praesent daahng. Nunc clita. Suspendisse potenti. Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est sit amet.'
    }
];

const HistoryHall = () => {
    const [selectedMilestone, setSelectedMilestone] = useState(null);

    return (
        <section id="history" className="section history-hall" style={{ padding: '4rem 0', minHeight: '100vh' }}>
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="hall-title"
                style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '3rem' }}
            >
                Evolution of <span className="text-gold">$bsadnqtri[</span>
            </motion.h2>

            <div className="timeline-container" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
                {/* Vertical Line */}
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    background: 'linear-gradient(to bottom, transparent, var(--color-gold), transparent)',
                    transform: 'translateX(-50%)'
                }} />

                {milestones.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                        onClick={() => setSelectedMilestone(item)}
                        style={{
                            display: 'flex',
                            justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                            padding: '2rem 0',
                            width: '100%',
                            position: 'relative',
                            cursor: 'pointer'
                        }}
                    >
                        {/* Content Card */}
                        <div style={{
                            width: '45%',
                            background: 'rgba(26, 26, 26, 0.8)',
                            border: '1px solid rgba(255, 215, 0, 0.2)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            textAlign: index % 2 === 0 ? 'right' : 'left',
                            backdropFilter: 'blur(5px)',
                            marginLeft: index % 2 === 0 ? 0 : '50%',
                            marginRight: index % 2 === 0 ? '50%' : 0,
                            transform: index % 2 === 0 ? 'translateX(-2rem)' : 'translateX(2rem)'
                        }}>
                            <span style={{ color: 'var(--color-gold)', fontSize: '0.9rem', fontWeight: 'bold' }}>{item.year}</span>
                            <h3 style={{ margin: '0.5rem 0', fontSize: '1.5rem' }}>{item.title}</h3>
                            <p style={{ color: '#ccc', fontSize: '0.9rem' }}>{item.description}</p>
                        </div>

                        {/* Center Dot */}
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            width: '16px',
                            height: '16px',
                            background: 'var(--color-gold)',
                            borderRadius: '50%',
                            transform: 'translate(-50%, -50%)',
                            boxShadow: '0 0 10px var(--color-gold)'
                        }} />
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedMilestone && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.9)',
                            zIndex: 2000,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2rem'
                        }}
                        onClick={() => setSelectedMilestone(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: '#1a1a1a',
                                border: '1px solid var(--color-gold)',
                                padding: '3rem',
                                maxWidth: '600px',
                                borderRadius: '16px',
                                position: 'relative',
                                boxShadow: '0 0 30px rgba(255, 215, 0, 0.2)'
                            }}
                        >
                            <button
                                onClick={() => setSelectedMilestone(null)}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    border: 'none',
                                    background: 'transparent',
                                    boxShadow: 'none',
                                    padding: '0.5rem'
                                }}
                            >
                                <X color="#fff" />
                            </button>

                            <h2 style={{ color: 'var(--color-gold)', marginBottom: '1rem' }}>{selectedMilestone.title}</h2>
                            <h4 style={{ color: '#888', marginBottom: '1.5rem' }}>{selectedMilestone.year}</h4>
                            <p style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>{selectedMilestone.details}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default HistoryHall;
