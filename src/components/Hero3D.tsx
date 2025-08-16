import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Environment, Center } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface TechIconProps {
  position: [number, number, number];
  text: string;
  isActive: boolean;
  color: string;
  glowColor: string;
}

const TechIcon: React.FC<TechIconProps> = ({ position, text, isActive, color, glowColor }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      
      if (isActive) {
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
        groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
      }
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Center>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          size={0.3}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {text}
          <meshStandardMaterial 
            color={color}
            emissive={glowColor}
            emissiveIntensity={hovered || isActive ? 0.4 : 0.2}
            transparent
            opacity={0.9}
          />
        </Text3D>
      </Center>
    </group>
  );
};

interface AnimatedObjectProps {
  position: [number, number, number];
  isActive: boolean;
  type: 'frontend' | 'backend';
  techIndex: number;
}

const AnimatedObject: React.FC<AnimatedObjectProps> = ({ position, isActive, type, techIndex }) => {
  const frontendTechs = ['REACT', 'JS', 'TS'];
  const backendTechs = ['NODE', 'PYTHON', 'API'];
  
  const techs = type === 'frontend' ? frontendTechs : backendTechs;
  const color = type === 'frontend' ? '#00D9FF' : '#9D4EDD';
  const glowColor = type === 'frontend' ? '#39FF14' : '#FF2D92';

  return (
    <group position={position}>
      {techs.map((tech, index) => (
        <TechIcon
          key={tech}
          position={[0, (index - 1) * 1.2, 0]}
          text={tech}
          isActive={isActive && index === techIndex}
          color={color}
          glowColor={glowColor}
        />
      ))}
    </group>
  );
};

const Scene3D: React.FC<{ activeObject: 'frontend' | 'backend'; techIndex: number }> = ({ activeObject, techIndex }) => {
  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00D9FF" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#9D4EDD" intensity={1} />
      
      <AnimatedObject 
        position={[-3, 0, 0]} 
        isActive={activeObject === 'frontend'}
        type="frontend"
        techIndex={techIndex}
      />
      <AnimatedObject 
        position={[3, 0, 0]} 
        isActive={activeObject === 'backend'}
        type="backend"
        techIndex={techIndex}
      />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

export const Hero3D: React.FC = () => {
  const [activeObject, setActiveObject] = useState<'frontend' | 'backend'>('frontend');
  const [techIndex, setTechIndex] = useState(0);

  useEffect(() => {
    const objectInterval = setInterval(() => {
      setActiveObject(prev => prev === 'frontend' ? 'backend' : 'frontend');
    }, 4000);

    const techInterval = setInterval(() => {
      setTechIndex(prev => (prev + 1) % 3);
    }, 1500);

    return () => {
      clearInterval(objectInterval);
      clearInterval(techInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-hero overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <Scene3D activeObject={activeObject} techIndex={techIndex} />
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-orbitron font-black mb-6">
            <span className="text-cyber bg-gradient-cyber bg-clip-text text-transparent">
              Ryan Kariuki
            </span>
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-8 text-foreground-accent">
            Muthoni
          </h2>

          <motion.div
            key={activeObject}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h3 className="text-xl md:text-2xl font-space font-medium mb-4 text-foreground">
              {activeObject === 'frontend' ? 'Frontend Developer' : 'Backend Developer'}
            </h3>
            
            <p className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto leading-relaxed">
              {activeObject === 'frontend' 
                ? "Crafting immersive user experiences with cutting-edge technologies. Bringing designs to life with pixel-perfect precision and smooth animations."
                : "Building robust server architectures and scalable systems. Powering applications with efficient APIs and secure database solutions."
              }
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(var(--cyber-primary) / 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="cyber-button px-8 py-4 rounded-lg text-primary-foreground font-space font-semibold text-lg"
            >
              View Projects
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg border-2 border-cyber-primary text-cyber-primary font-space font-semibold text-lg hover:bg-cyber-primary hover:text-primary-foreground transition-all duration-300"
            >
              Contact Me
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-cyber-primary rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-cyber-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20 pointer-events-none" />
      <div className="absolute inset-0 scan-lines opacity-10 pointer-events-none" />
    </div>
  );
};