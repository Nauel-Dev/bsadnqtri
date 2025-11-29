import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

// Import images
import img1 from '../assets/G63wD1IXYAArHXe.jpg';
import img2 from '../assets/G63xBedWoAA2cFD.jpg';
import img3 from '../assets/G668LVKXEAAGD4A.jpg';
import img4 from '../assets/G66iCmrW4AAylOb.png';
import img5 from '../assets/G67Ven4XIAA5Z9W.jpg';
import img6 from '../assets/G67YiC8WsAANVs3.jpg';

const artPieces = [
    { id: 1, title: 'Golden Era', category: 'Memes', src: img1, description: 'A glimpse into the golden age of digital wealth.' },
    { id: 2, title: 'Digital Asset', category: 'NFTs', src: img2, description: 'The tokenization of culture and art.' },
    { id: 3, title: 'Future Wealth', category: 'Memes', src: img3, description: 'Where we are going, we don\'t need roads.' },
    { id: 4, title: 'Community Power', category: 'Fan Art', src: img4, description: 'The strength of the collective.' },
    { id: 5, title: 'Rare Find', category: 'NFTs', src: img5, description: 'A unique piece from the early collection.' },
    { id: 6, title: 'To The Moon', category: 'Memes', src: img6, description: 'Visualizing the ascent to new heights.' },
];

const categories = ['All', 'Memes', 'NFTs', 'Fan Art'];

const GalleryHall = () => {
    const [filter, setFilter] = useState('All');
    const [selectedArt, setSelectedArt] = useState(null);

    const filteredArt = filter === 'All'
        ? artPieces
        : artPieces.filter(piece => piece.category === filter);

    return (
        <section id="gallery" className="section gallery-hall" style={{ padding: '4rem 0', minHeight: '100vh', background: '#111' }}>
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="hall-title"
                style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '3rem' }}
            >
                The <span className="text-gold">Gallery</span>
            </motion.h2>

            {/* Filters */}
            <div className="filters" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        style={{
                            background: filter === cat ? 'var(--color-gold)' : 'transparent',
                            color: filter === cat ? '#000' : 'var(--color-gold)',
                            border: '1px solid var(--color-gold)',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="art-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 20px'
                }}
            >
                <AnimatePresence>
                    {filteredArt.map(piece => (
                        <motion.div
                            layout
                            key={piece.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            onClick={() => setSelectedArt(piece)}
                            style={{
                                background: '#1a1a1a',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                border: '1px solid rgba(255, 215, 0, 0.1)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                            }}
                        >
                            <div style={{ position: 'relative', overflow: 'hidden' }}>
                                <img
                                    src={piece.src}
                                    alt={piece.title}
                                    style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'rgba(0,0,0,0.4)',
                                    opacity: 0,
                                    transition: 'opacity 0.3s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }} className="hover-overlay">
                                    <ZoomIn color="#fff" size={32} />
                                </div>
                            </div>
                            <div style={{ padding: '1rem' }}>
                                <h3 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>{piece.title}</h3>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-purple)', textTransform: 'uppercase' }}>{piece.category}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedArt && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.95)',
                            zIndex: 2000,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2rem'
                        }}
                        onClick={() => setSelectedArt(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                maxWidth: '900px',
                                width: '100%',
                                background: '#1a1a1a',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                position: 'relative',
                                border: '1px solid var(--color-gold)'
                            }}
                        >
                            <button
                                onClick={() => setSelectedArt(null)}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(0,0,0,0.5)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    zIndex: 10
                                }}
                            >
                                <X color="#fff" />
                            </button>

                            <div style={{ display: 'flex', flexDirection: 'column', md: { flexDirection: 'row' } }}>
                                <img
                                    src={selectedArt.src}
                                    alt={selectedArt.title}
                                    style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain', background: '#000' }}
                                />
                                <div style={{ padding: '2rem' }}>
                                    <h2 style={{ color: 'var(--color-gold)', marginBottom: '0.5rem' }}>{selectedArt.title}</h2>
                                    <span style={{ display: 'inline-block', padding: '0.2rem 0.8rem', background: 'var(--color-purple)', borderRadius: '12px', fontSize: '0.8rem', marginBottom: '1rem' }}>
                                        {selectedArt.category}
                                    </span>
                                    <p style={{ color: '#ccc', lineHeight: '1.6' }}>{selectedArt.description}</p>
                                    <button style={{ marginTop: '2rem', width: '100%' }}>View on Marketplace</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default GalleryHall;
