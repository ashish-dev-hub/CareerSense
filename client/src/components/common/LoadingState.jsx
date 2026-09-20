import React, { useState, useEffect } from 'react';
import Card from './Card';
import AtmosphericOrb from './AtmosphericOrb';

export default function LoadingState({
  messages = [
    'Analyzing your current skills...',
    'Benchmarking against target role requirements...',
    'Identifying skill gaps and growth opportunities...',
    'Synthesizing your personalized roadmap...'
  ],
  title = 'AI Intelligence at Work',
  className = '',
}) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (!messages || messages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <Card className={`relative overflow-hidden p-12 text-center max-w-xl mx-auto my-12 ${className}`}>
      <AtmosphericOrb variant="lavender" size="md" className="-top-12 -left-12 opacity-40" />
      <AtmosphericOrb variant="mint" size="md" className="-bottom-12 -right-12 opacity-40" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Minimalist pulsed ring spinner */}
        <div className="relative w-14 h-14 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-hairline-strong opacity-30"></div>
          <div className="absolute inset-0 rounded-full border-2 border-ink border-t-transparent animate-spin"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-ink animate-pulse"></div>
        </div>

        <h3 className="font-serif text-display-sm text-ink mb-2">
          {title}
        </h3>

        <p className="text-[15px] text-body h-6 transition-all duration-300">
          {messages[currentMessageIndex]}
        </p>

        <div className="flex gap-1.5 mt-6">
          {messages.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentMessageIndex ? 'w-6 bg-ink' : 'w-2 bg-hairline-strong'
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
