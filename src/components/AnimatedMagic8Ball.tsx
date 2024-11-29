import React from 'react';
import { motion } from 'framer-motion';
import SmokeEffect from './SmokeEffect';

interface AnimatedMagic8BallProps {
  isShaking: boolean;
  answer: string | null;
}

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: [0.4, 0, 0.2, 1],
  }
};

const shakeAnimation = {
  x: [-10, 10, -8, 8, -5, 5, -2, 2, 0],
  rotate: [-5, 5, -4, 4, -2, 2, -1, 1, 0],
  transition: {
    duration: 0.8,
    ease: "easeInOut",
    times: [0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
  }
};

export const AnimatedMagic8Ball: React.FC<AnimatedMagic8BallProps> = ({ isShaking, answer }) => {
  return (
    <div className="relative h-64 w-64">
      <motion.div
        initial={{ y: 0 }}
        animate={isShaking ? shakeAnimation : floatAnimation}
        className="relative z-10"
      >
        <div className="w-64 h-64 rounded-full bg-black relative overflow-hidden shadow-2xl">
          {/* Glossy effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-transparent opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent opacity-30" />
          
          {/* Answer window */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        w-24 h-24 rounded-full bg-purple-900 flex items-center justify-center overflow-hidden 
                        shadow-inner border border-purple-800/30">
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
          </div>
        </div>
      </motion.div>

      {/* Smoke Effect positioned relative to ball */}
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