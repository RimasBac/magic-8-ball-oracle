import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface SmokeEffectProps {
  isActive: boolean;
}

const SmokeEffect: React.FC<SmokeEffectProps> = ({ isActive }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      // Calculate starting position around the ball
      const angle = (Math.random() * Math.PI * 2);
      const distance = Math.random() * 20; // Small initial distance from ball center
      const startX = Math.cos(angle) * distance;
      const startY = Math.sin(angle) * distance;
      
      // Calculate end position spreading across screen
      const endDistance = 100 + Math.random() * 800; // Much larger end distance
      const endX = Math.cos(angle) * endDistance;
      const endY = Math.sin(angle) * endDistance;

      return {
        id: i,
        startX,
        startY,
        endX,
        endY,
        scale: Math.random() * 3 + 1, // Larger scale for more coverage
        rotation: Math.random() * 720 - 360,
        duration: Math.random() * 3 + 4, // Longer duration for smoother spread
        delay: Math.random() * 2
      };
    });
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Center point for smoke origin */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute left-0 top-0"
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
              opacity: [0, 0.3, 0],
              rotate: particle.rotation
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 0.5
            }}
          >
            <div 
              className="w-20 h-20 rounded-full bg-purple-500/30 dark:bg-purple-400/20"
              style={{
                filter: 'blur(16px)'
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Ambient fog overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-purple-500/2 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.3, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default SmokeEffect;