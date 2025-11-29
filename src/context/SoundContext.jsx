import React, { createContext, useState, useEffect, useContext } from 'react';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    // Serene ambient sound (Nature/Zen)
    const [audio] = useState(new Audio('https://cdn.pixabay.com/download/audio/2022/02/07/audio_1822e427af.mp3?filename=meditation-impulse-3000.mp3'));

    useEffect(() => {
        audio.loop = true;
        audio.volume = 0.3;
    }, [audio]);

    useEffect(() => {
        if (isPlaying) {
            audio.play().catch(e => console.log("Audio play failed:", e));
        } else {
            audio.pause();
        }
    }, [isPlaying, audio]);

    const toggleSound = () => setIsPlaying(!isPlaying);

    return (
        <SoundContext.Provider value={{ isPlaying, toggleSound }}>
            {children}
        </SoundContext.Provider>
    );
};
