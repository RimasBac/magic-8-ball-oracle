import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface SmokeEffectProps {
  isActive: boolean;
}

const SmokeEffect: React.FC<SmokeEffectProps> = ({ isActive }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      // Calculate starting position in a circle around the center of the ball
      const angle = (Math.random() * Math.PI * 2);
      const distance = Math.random() * 30; // Initial distance from center of ball
      
      // Starting position (close to ball)
      const startX = Math.cos(angle) * distance;
      const startY = Math.sin(angle) * distance;
      
      // Calculate end position (spreading outward)
      const spreadAngle = angle + (Math.random() * 0.5 - 0.25); // Slight angle variation
      const endDistance = 200 + Math.random() * 800; // Longer distance for bigger spread
      const endX = Math.cos(spreadAngle) * endDistance;
      const endY = Math.sin(spreadAngle) * endDistance;

      return {
        id: i,
        startX,
        startY,
        endX,
        endY,
        scale: Math.random() * 2 + 0.5,
        rotation: Math.random() * 360,
        duration: Math.random() * 3 + 3,
        delay: Math.random() * 0.5
      };
    });
  }, []);

  if (!isActive) return null;

  return (
    <div className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
          initial={{
            x: particle.startX,
            y: particle.startY,
            scale: 0.1,
            opacity: 0,
            rotate: 0
          }}
          animate={{
            x: [particle.startX, particle.endX],
            y: [particle.startY, particle.endY],
            scale: [0.1, particle.scale],
            opacity: [0, 0.4, 0],
            rotate: particle.rotation
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: Math.random()
          }}
        >
          <div 
            className="w-16 h-16 rounded-full bg-purple-500/30"
            style={{
              filter: 'blur(16px)'
            }}
          />
        </motion.div>
      ))}

      {/* Central glow effect */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-radial from-purple-500/10 via-purple-500/5 to-transparent"
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default SmokeEffect;