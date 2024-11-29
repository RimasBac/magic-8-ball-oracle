import React, { useState } from 'react';
import { AnimatedMagic8Ball } from './AnimatedMagic8Ball';

export const ThemedMagic8Ball: React.FC = () => {
  const [answer, setAnswer] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

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

      <AnimatedMagic8Ball 
        isShaking={isShaking}
        answer={answer}
      />
    </div>
  );
};

export default ThemedMagic8Ball;