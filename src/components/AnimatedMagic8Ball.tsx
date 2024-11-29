import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SmokeEffect from './SmokeEffect';

interface AnimatedMagic8BallProps {
  isShaking: boolean;
  answer: string | null;
  isFirstQuestion: boolean;
}

const AnimatedMagic8Ball: React.FC<AnimatedMagic8BallProps> = ({ isShaking, answer, isFirstQuestion }) => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isShaking && !hasInteracted) {
      setHasInteracted(true);
    }
  }, [isShaking]);

  // Different size animations for different screen sizes
  const ballSize = Math.min(window.innerWidth * 0.4, 300);
  const floatRange = ballSize * 0.1;
  const shakeRange = ballSize * 0.15;

  // Define shaking sequence
  const shakeSequence = {
    transform: [
      `translate3d(0, 0, 0) rotateX(0deg) rotateY(180deg)`,
      `translate3d(${shakeRange}px, ${-shakeRange * 0.5}px, ${shakeRange}px) rotateX(-15deg) rotateY(200deg)`,
      `translate3d(${-shakeRange}px, ${-shakeRange * 0.3}px, ${-shakeRange}px) rotateX(15deg) rotateY(160deg)`,
      `translate3d(${shakeRange * 0.5}px, ${-shakeRange * 0.2}px, ${shakeRange * 0.5}px) rotateX(-10deg) rotateY(190deg)`,
      `translate3d(${-shakeRange * 0.5}px, 0, ${-shakeRange * 0.5}px) rotateX(5deg) rotateY(170deg)`,
      `translate3d(0, 0, 0) rotateX(0deg) rotateY(180deg)`
    ],
    transition: { duration: 0.8, ease: "easeInOut" }
  };

  // Define float animation
  const floatAnimation = {
    transform: [
      `translate3d(0, 0, 0) rotateX(0deg) rotateY(${hasInteracted ? 180 : 0}deg)`,
      `translate3d(0, ${-floatRange}px, ${floatRange * 0.3}px) rotateX(-5deg) rotateY(${hasInteracted ? 180 : 0}deg)`,
      `translate3d(0, 0, 0) rotateX(0deg) rotateY(${hasInteracted ? 180 : 0}deg)`
    ],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="relative" style={{ perspective: '1200px', width: ballSize, height: ballSize }}>
      <motion.div
        ref={ballRef}
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center'
        }}
        animate={isShaking ? shakeSequence : floatAnimation}
      >
        {/* Main ball */}
        <div 
          className="w-full h-full rounded-full relative"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(30, 30, 30, 1) 0%, rgba(0, 0, 0, 1) 90%)',
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.3)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Shine overlay */}
          <div 
            className="absolute inset-0 rounded-full" 
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%)',
              transform: 'translateZ(1px)'
            }}
          />

          {/* Number 8 side */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'translateZ(1px)'
            }}
          >
            <div className="w-1/3 h-1/3 rounded-full bg-purple-900 flex items-center justify-center"
                 style={{ boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }}>
              <span className="text-white text-4xl font-bold">8</span>
            </div>
          </div>

          {/* Answer side */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(1px)'
            }}
          >
            <div className="w-1/3 h-1/3 rounded-full bg-purple-900 flex items-center justify-center"
                 style={{ boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }}>
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
        </div>

        {/* Shadow */}
        <div 
          className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2"
          style={{
            width: '90%',
            height: '20%',
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 70%)',
            transform: 'rotateX(90deg) translateZ(-100px)'
          }}
        />
      </motion.div>

      {/* Smoke effect container */}
      {!isShaking && answer && (
        <SmokeEffect isActive={true} />
      )}
    </div>
  );
};

export default AnimatedMagic8Ball;