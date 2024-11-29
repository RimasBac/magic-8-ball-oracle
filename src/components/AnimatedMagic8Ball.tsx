import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedMagic8BallProps {
  isShaking: boolean;
  answer: string | null;
}

export const AnimatedMagic8Ball: React.FC<AnimatedMagic8BallProps> = ({ isShaking, answer }) => {
  return (
    <motion.div
      animate={isShaking ? {
        x: [-10, 10, -10, 10, -5, 5, -5, 5, 0],
        rotate: [-5, 5, -5, 5, -2, 2, -2, 2, 0],
      } : {
        y: [0, -10, 0],
        rotate: [0, 1, -1, 0],
      }}
      transition={isShaking ? {
        duration: 0.5,
      } : {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="relative"
    >
      <div className="w-64 h-64 rounded-full bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-transparent opacity-50" />
        
        {/* Answer window */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-purple-900 flex items-center justify-center">
          <motion.p
            key={answer}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white text-sm text-center px-2"
          >
            {answer}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedMagic8Ball;