import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface SmokeEffectProps {
  isActive: boolean;
}

const SmokeEffect: React.FC<SmokeEffectProps> = ({ isActive }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      baseOffset: Math.random() * 200 - 100,
      scale: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * 360
    }));
  }, []);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute left-1/2 bottom-1/4"
          initial={{
            x: particle.baseOffset,
            y: 0,
            scale: 0,
            opacity: 0,
            rotate: particle.rotation
          }}
          animate={{
            x: [particle.baseOffset, particle.baseOffset * 2],
            y: [-20, -200],
            scale: [0, particle.scale],
            opacity: [0, 0.3, 0],
            rotate: [particle.rotation, particle.rotation + 180]
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
            times: [0, 1],
            repeatDelay: 0.2
          }}
        >
          <div 
            className="w-12 h-12 rounded-full bg-purple-500/30 blur-xl"
            style={{
              filter: 'blur(8px)'
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default SmokeEffect;