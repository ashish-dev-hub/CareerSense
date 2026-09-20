import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Card({
  children,
  variant = 'default',
  interactive = false,
  className = '',
  onClick,
  ...props
}) {
  const baseStyles = 'rounded-2xl transition-all duration-200';
  
  const variants = {
    default: 'bg-surface-card border border-hairline text-ink shadow-soft-drop',
    soft: 'bg-canvas-soft border border-hairline-soft text-ink',
    elevated: 'bg-surface-card border border-hairline shadow-elevated text-ink',
    dark: 'bg-surface-dark border border-surface-dark-elevated text-white',
  };

  const interactiveStyles = interactive 
    ? 'hover:-translate-y-0.5 hover:shadow-elevated hover:border-hairline-strong cursor-pointer' 
    : '';

  return (
    <div
      onClick={onClick}
      className={twMerge(clsx(baseStyles, variants[variant], interactiveStyles, className))}
      {...props}
    >
      {children}
    </div>
  );
}
