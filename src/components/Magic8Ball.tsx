import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Magic8BallProps {
  className?: string;
}

const ANSWERS = [
  'It is certain',
  'It is decidedly so',
  'Without a doubt',
  'Yes definitely',
  'You may rely on it',
  'As I see it, yes',
  'Most likely',
  'Outlook good',
  'Yes',
  'Signs point to yes',
  'Reply hazy, try again',
  'Ask again later',
  'Better not tell you now',
  'Cannot predict now',
  'Concentrate and ask again',
  'Don\'t count on it',
  'My reply is no',
  'My sources say no',
  'Outlook not so good',
  'Very doubtful'
];

const Magic8Ball: React.FC<Magic8BallProps> = ({ className = '' }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsShaking(true);
    setAnswer('');

    // Simulate shake animation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsShaking(false);
    setShowSmoke(true);

    // Get random answer
    const randomAnswer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
    setAnswer(randomAnswer);

    // Hide smoke effect after answer appears
    setTimeout(() => setShowSmoke(false), 2000);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gray-900 ${className}`}>
      <form onSubmit={handleSubmit} className="mb-8 w-full max-w-md">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question..."
          className="w-full px-4 py-2 text-lg rounded-lg bg-gray-800 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Enter your question"
        />
      </form>

      <motion.div
        className="relative"
        animate={isShaking ? {
          x: [-10, 10, -10, 10, -5, 5, -5, 5, 0],
          rotate: [-5, 5, -5, 5, -2, 2, -2, 2, 0],
        } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Magic 8 Ball */}
        <div className="w-64 h-64 rounded-full bg-black shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-transparent opacity-50" />
          
          {/* Answer window */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-purple-900 flex items-center justify-center">
            <AnimatePresence>
              {answer && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="text-white text-sm text-center px-2"
                >
                  {answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Smoke Effect */}
        <AnimatePresence>
          {showSmoke && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent animate-smoke" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Magic8Ball;