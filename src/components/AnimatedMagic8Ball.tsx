import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SmokeEffect from './SmokeEffect';

interface AnimatedMagic8BallProps {
  isShaking: boolean;
  answer: string | null;
  isFirstQuestion: boolean;
}

const ROTATION_DURATION = 1.5;

const AnimatedMagic8Ball: React.FC<AnimatedMagic8BallProps> = ({ isShaking, answer, isFirstQuestion }) => {
  const [hasStartedFirstRotation, setHasStartedFirstRotation] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  // Calculate animation ranges based on screen size
  const floatRange = Math.max(10, Math.min(viewportHeight * 0.02, 30));
  const shakeRange = Math.max(15, Math.min(viewportHeight * 0.03, 40));

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRotationComplete = () => {
    if (!hasStartedFirstRotation) {
      setHasStartedFirstRotation(true);
    }
  };

  // Only float animation, no rotation until first question
  const initialAnimation = {
    y: [0, -floatRange, 0],
    rotateY: 0,
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  // Float with rotation for first question
  const rotationAnimation = {
    y: [0, -floatRange, 0],
    rotateY: 180,
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      },
      rotateY: {
        duration: ROTATION_DURATION,
        ease: "easeInOut",
        delay: 0.2
      }
    }
  };

  // Shaking animation
  const shakeAnimation = {
    x: [-shakeRange, shakeRange, -shakeRange * 0.8, shakeRange * 0.8, -shakeRange * 0.5, shakeRange * 0.5, 0],
    y: [0, -shakeRange * 0.5, -shakeRange * 0.3, -shakeRange * 0.5, -shakeRange * 0.2, 0],
    rotate: [-5, 5, -4, 4, -2, 2, 0],
    rotateY: 180,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    }
  };

  // Determine which animation to use
  const currentAnimation = isShaking ? shakeAnimation :
                          isFirstQuestion && !hasStartedFirstRotation ? rotationAnimation :
                          !hasStartedFirstRotation ? initialAnimation :
                          {
                            y: [0, -floatRange, 0],
                            rotateY: 180,
                            transition: {
                              y: {
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse" as const,
                                ease: "easeInOut"
                              }
                            }
                          };

  return (
    <div className="relative h-64 w-64">
      <motion.div
        initial={{ y: 0, rotateY: 0 }}
        animate={currentAnimation}
        onAnimationComplete={handleRotationComplete}
        className="relative z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-64 h-64 rounded-full bg-black relative shadow-2xl" 
             style={{ transformStyle: 'preserve-3d' }}>
          {/* Glossy effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-transparent opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent opacity-30" />
          
          {/* Front face with "8" */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: 'rotateY(0deg) translateZ(2px)', backfaceVisibility: 'hidden' }}
          >
            <span className="text-white text-6xl font-bold">8</span>
          </div>

          {/* Back face with answer */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: 'rotateY(180deg) translateZ(2px)', backfaceVisibility: 'hidden' }}
          >
            <div className="w-24 h-24 rounded-full bg-purple-900 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {answer && (
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
                )}
              </AnimatePresence>
            </div>
          </div>
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