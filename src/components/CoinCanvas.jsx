import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import coinTexture from '../assets/artdp.png';

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
                color="#ffffff"
                metalness={0.3}
                roughness={0.4}
                emissive="#ffffff"
                emissiveIntensity={0.05}
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
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 5, 5]} intensity={2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

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
