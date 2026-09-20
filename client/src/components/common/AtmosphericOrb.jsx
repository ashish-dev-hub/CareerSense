import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function AtmosphericOrb({
  variant = 'mint',
  size = 'md',
  className = '',
  style = {},
}) {
  const variants = {
    mint: 'bg-orb-mint',
    peach: 'bg-orb-peach',
    lavender: 'bg-orb-lavender',
    sky: 'bg-orb-sky',
    rose: 'bg-orb-rose',
  };

  const sizes = {
    sm: 'w-48 h-48 blur-2xl',
    md: 'w-80 h-80 blur-3xl',
    lg: 'w-[450px] h-[450px] blur-[80px]',
    xl: 'w-[600px] h-[600px] blur-[100px]',
  };

  return (
    <div
      aria-hidden="true"
      className={twMerge(
        clsx(
          'pointer-events-none absolute rounded-full select-none animate-float-subtle opacity-75',
          variants[variant],
          sizes[size],
          className
        )
      )}
      style={style}
    />
  );
}
