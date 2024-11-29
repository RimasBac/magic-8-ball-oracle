import React from 'react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [answer, setAnswer] = React.useState<string | null>(null);
  const [isShaking, setIsShaking] = React.useState(false);

  const handleAsk = async (question: string) => {
    if (!question.trim()) return;

    setIsShaking(true);
    setAnswer(null);

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const answers = [
      "It is certain",
      "Without a doubt",
      "You may rely on it",
      "Yes definitely",
      "As I see it, yes",
      "Most likely",
      "Reply hazy try again",
      "Ask again later",
      "Better not tell you now",
      "Cannot predict now",
      "Don't count on it",
      "My reply is no",
      "My sources say no",
      "Outlook not so good",
      "Very doubtful"
    ];

    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    
    setIsShaking(false);
    setAnswer(randomAnswer);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Input */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          const question = (e.target as HTMLFormElement).question.value;
          handleAsk(question);
        }}
        className="mb-8 w-full max-w-md"
      >
        <input
          type="text"
          name="question"
          placeholder="Ask your question..."
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </form>

      {/* Magic 8 Ball */}
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
    </div>
  );
};

export default App;