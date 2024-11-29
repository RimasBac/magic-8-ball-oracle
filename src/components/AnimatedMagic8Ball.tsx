import React, { useRef, useCallback, useEffect } from 'react';
import { motion, useAnimation, useReducedMotion, AnimatePresence } from 'framer-motion';

interface AnimationConfig {
  duration: number;
  ease: string[];
  scale: number[];
  rotation: number[];
}

interface AnimatedMagic8BallProps {
  state: 'idle' | 'asking' | 'thinking' | 'responding' | 'error';
  answer?: string;
  className?: string;
  onAnimationComplete?: () => void;
  config?: Partial<AnimationConfig>;
}

const defaultConfig: AnimationConfig = {
  duration: 0.5,
  ease: ['easeOut', 'easeIn', 'easeInOut'],
  scale: [1, 1.05, 0.95],
  rotation: [-5, 5, 0],
};

export const AnimatedMagic8Ball: React.FC<AnimatedMagic8BallProps> = ({
  state,
  answer,
  className = '',
  onAnimationComplete,
  config = defaultConfig,
}) => {
  const ballRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();

  // Animation variants
  const variants = {
    idle: {
      y: [0, -10, 0],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    asking: {
      scale: config.scale,
      rotate: config.rotation,
      transition: {
        duration: config.duration,
        ease: config.ease[0]
      }
    },
    thinking: prefersReducedMotion ? {} : {
      x: [-10, 10, -5, 5, 0],
      y: [0, -5, 0, -3, 0],
      rotate: [-5, 5, -3, 3, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    responding: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    error: {
      x: [-2, 2, -2, 0],
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  // Handle mouse/touch interaction
  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (state === 'idle' && ballRef.current) {
        const bounds = ballRef.current.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const deltaX = (event.clientX - centerX) / 10;
        const deltaY = (event.clientY - centerY) / 10;
        
        controls.start({
          x: deltaX,
          y: deltaY,
          rotate: deltaX * 0.1,
          transition: { duration: 0.2 }
        });
      }
    },
    [state, controls]
  );

  const handlePointerLeave = useCallback(() => {
    controls.start({
      x: 0,
      y: 0,
      rotate: 0,
      transition: { duration: 0.3 }
    });
  }, [controls]);

  // State change handler
  useEffect(() => {
    const animate = async () => {
      if (prefersReducedMotion && state !== 'idle') {
        return;
      }

      await controls.start(variants[state]);
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    };

    animate();
  }, [state, controls, variants, prefersReducedMotion, onAnimationComplete]);

  return (
    <motion.div
      ref={ballRef}
      className={`relative ${className}`}
      animate={controls}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      role="img"
      aria-label={`Magic 8 Ball - ${state === 'responding' ? answer : state}`}
    >
      {/* 3D Magic 8 Ball */}
      <div className="w-64 h-64 rounded-full bg-black relative overflow-hidden">
        {/* Lighting effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-700 to-transparent"
          animate={{
            opacity: [0.3, 0.4, 0.3],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />

        {/* Glossy highlight */}
        <div className="absolute inset-0 bg-gradient-to-tl from-white to-transparent opacity-20" />

        {/* Answer window */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-purple-900 flex items-center justify-center overflow-hidden shadow-inner"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Animated text content */}
          <AnimatePresence mode="wait">
            {state === 'responding' && answer && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
                transition={{ duration: 0.3 }}
                className="text-white text-center p-2 text-sm"
              >
                {answer}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: [
            '0 0 20px rgba(147, 51, 234, 0.2)',
            '0 0 25px rgba(147, 51, 234, 0.3)',
            '0 0 20px rgba(147, 51, 234, 0.2)'
          ],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
    </motion.div>
  );
};

export default React.memo(AnimatedMagic8Ball);