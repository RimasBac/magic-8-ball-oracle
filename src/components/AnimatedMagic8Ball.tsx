import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SmokeEffect from './SmokeEffect';

interface AnimatedMagic8BallProps {
  isShaking: boolean;
  answer: string | null;
  isFirstQuestion: boolean;
}

const AnimatedMagic8Ball: React.FC<AnimatedMagic8BallProps> = ({ isShaking, answer, isFirstQuestion }) => {
  const [hasRotated, setHasRotated] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  // Calculate animation ranges based on screen size
  const floatRange = Math.max(10, Math.min(viewportHeight * 0.02, 30));
  const shakeRange = Math.max(15, Math.min(viewportHeight * 0.03, 40));

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initial state shows the "8" face
  const floatAnimation = {
    y: [0, -floatRange, 0],
    rotateX: hasRotated ? 180 : 0,
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: [0.4, 0, 0.2, 1],
      },
      rotateX: {
        duration: 1.2,
        ease: "easeInOut",
        delay: isFirstQuestion ? 0.5 : 0
      }
    }
  };

  const shakeAnimation = {
    x: [-shakeRange, shakeRange, -shakeRange * 0.8, shakeRange * 0.8, -shakeRange * 0.5, shakeRange * 0.5, 0],
    y: [0, -shakeRange * 0.5, -shakeRange * 0.3, -shakeRange * 0.5, -shakeRange * 0.2, 0],
    rotate: [-5, 5, -4, 4, -2, 2, 0],
    rotateX: 180,
    transition: {
      x: { duration: 0.8, ease: "easeInOut" },
      y: { duration: 0.8, ease: "easeInOut" },
      rotate: { duration: 0.8, ease: "easeInOut" },
      rotateX: { duration: 0.5, ease: "easeInOut" }
    }
  };

  useEffect(() => {
    if (isFirstQuestion) {
      setHasRotated(true);
    }
  }, [isFirstQuestion]);

  return (
    <div className="relative h-64 w-64 perspective-1000">
      <motion.div
        initial={{ rotateX: 0 }}
        animate={isShaking ? shakeAnimation : floatAnimation}
        className="relative z-10 preserve-3d"
      >
        <div className="w-64 h-64 rounded-full bg-black relative overflow-hidden shadow-2xl preserve-3d">
          {/* Glossy effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-transparent opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent opacity-30" />
          
          {/* Initial "8" display */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-24 h-24 rounded-full bg-purple-900 flex items-center justify-center backface-hidden"
            style={{ rotateX: 180 }}
          >
            <span className="text-white text-4xl font-bold">8</span>
          </motion.div>

          {/* Answer window (on the other side) */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-24 h-24 rounded-full bg-purple-900 flex items-center justify-center backface-hidden"
          >
            <motion.p
              key={answer}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-white text-sm text-center px-2 font-medium"
            >
              {answer}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Smoke Effect */}
      <div className="absolute inset-0 z-0">
        <SmokeEffect isActive={!isShaking && answer !== null} />
      </div>

      {/* Ambient glow */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-purple-500/10 blur-xl z-0"
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AnimatedMagic8Ball;