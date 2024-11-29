import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface SmokeEffectProps {
  isActive: boolean;
}

const SmokeEffect: React.FC<SmokeEffectProps> = ({ isActive }) => {
  // Create multiple particle groups with different characteristics
  const particleGroups = useMemo(() => {
    const groups = [];
    
    // Central dense smoke
    groups.push(Array.from({ length: 30 }, (_, i) => ({
      id: `central-${i}`,
      baseX: Math.random() * 300 - 150, // Wider spread
      baseY: Math.random() * 100,
      scale: Math.random() * 0.8 + 0.5,
      rotation: Math.random() * 360,
      duration: Math.random() * 1 + 2,
      delay: Math.random() * 0.5,
      type: 'central'
    })));

    // Wide spread ambient smoke
    groups.push(Array.from({ length: 40 }, (_, i) => ({
      id: `ambient-${i}`,
      baseX: Math.random() * 600 - 300, // Very wide spread
      baseY: Math.random() * 200 - 100,
      scale: Math.random() * 1.2 + 0.3,
      rotation: Math.random() * 720 - 360,
      duration: Math.random() * 2 + 2.5,
      delay: Math.random() * 1,
      type: 'ambient'
    })));

    // Rising whisps
    groups.push(Array.from({ length: 20 }, (_, i) => ({
      id: `wisp-${i}`,
      baseX: Math.random() * 400 - 200,
      baseY: Math.random() * 100,
      scale: Math.random() * 0.4 + 0.2,
      rotation: Math.random() * 180 - 90,
      duration: Math.random() * 1.5 + 3,
      delay: Math.random() * 1.5,
      type: 'wisp'
    })));

    return groups.flat();
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particleGroups.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute left-1/2 bottom-1/4"
          initial={{
            x: particle.baseX,
            y: particle.baseY,
            scale: 0,
            opacity: 0,
            rotate: particle.rotation
          }}
          animate={{
            x: [particle.baseX, particle.baseX + (Math.random() * 200 - 100)],
            y: [particle.baseY, particle.baseY - (300 + Math.random() * 200)],
            scale: [0, particle.scale],
            opacity: [0, particle.type === 'central' ? 0.4 : 0.2, 0],
            rotate: [particle.rotation, particle.rotation + (Math.random() * 180 - 90)]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeOut",
            times: [0, 1],
            repeat: Infinity,
            repeatDelay: Math.random() * 0.5
          }}
        >
          <div 
            className={`rounded-full blur-xl ${particle.type === 'central' ? 'bg-purple-500/40' : 
              particle.type === 'ambient' ? 'bg-purple-400/30' : 'bg-purple-300/20'}`}
            style={{
              width: particle.type === 'central' ? '64px' : 
                     particle.type === 'ambient' ? '48px' : '32px',
              height: particle.type === 'central' ? '64px' : 
                      particle.type === 'ambient' ? '48px' : '32px',
              filter: 'blur(8px)'
            }}
          />
        </motion.div>
      ))}

      {/* Additional ambient fog effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default SmokeEffect;