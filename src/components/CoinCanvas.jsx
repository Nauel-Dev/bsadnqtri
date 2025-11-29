import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import coinTexture from '../assets/coin_texture.png';

const Coin = ({ onClick }) => {
    const meshRef = useRef();
    const [hovered, setHover] = useState(false);
    const texture = useTexture(coinTexture);

    // Auto-rotation
    useFrame((state, delta) => {
        if (!hovered) {
            meshRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <mesh
            ref={meshRef}
            onClick={onClick}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            rotation={[Math.PI / 2, 0, 0]}
            scale={2}
        >
            <cylinderGeometry args={[1, 1, 0.1, 64]} />
            <meshStandardMaterial
                map={texture}
                color="#FFD700"
                metalness={0.8}
                roughness={0.2}
                emissive="#FFD700"
                emissiveIntensity={0.1}
            />
        </mesh>
    );
};

const CoinCanvas = () => {
    const handleCoinClick = () => {
        document.getElementById('history').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9D4EDD" />

                <Coin onClick={handleCoinClick} />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 2 - 0.5}
                    maxPolarAngle={Math.PI / 2 + 0.5}
                />
            </Canvas>
        </div>
    );
};

export default CoinCanvas;
