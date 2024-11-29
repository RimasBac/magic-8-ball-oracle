import React, { useState } from 'react';
import { AnimatedMagic8Ball } from './AnimatedMagic8Ball';

export const ThemedMagic8Ball: React.FC = () => {
  const [answer, setAnswer] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);

  const handleAsk = async (question: string) => {
    if (!question.trim()) return;

    setIsShaking(true);
    setAnswer(null);

    // Longer shake for first question to allow for rotation
    await new Promise(resolve => setTimeout(resolve, isFirstQuestion ? 1500 : 1000));
    
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
    setIsFirstQuestion(false);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-gray-900 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-md px-4 mb-8">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const question = (e.target as HTMLFormElement).question.value;
            handleAsk(question);
          }}
          className="w-full"
        >
          <input
            type="text"
            name="question"
            placeholder="Ask your question..."
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </form>
      </div>

      <div className="relative">
        <AnimatedMagic8Ball 
          isShaking={isShaking}
          answer={answer}
          isFirstQuestion={isFirstQuestion}
        />
      </div>
    </div>
  );
};

export default ThemedMagic8Ball;