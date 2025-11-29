import React, { createContext, useState, useEffect, useContext } from 'react';
import museSound from '../assets/muse.mp3';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    // Serene ambient sound (Nature/Zen)
    const [audio] = useState(new Audio(museSound));

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
