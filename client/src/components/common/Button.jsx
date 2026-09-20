import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 whitespace-nowrap flex-shrink-0';
  
  const variants = {
    primary: 'bg-ink-primary text-white hover:bg-ink-active active:bg-ink-active rounded-pill shadow-sm',
    outline: 'bg-transparent text-ink border border-hairline-strong hover:bg-surface-strong rounded-pill',
    ghost: 'bg-transparent text-muted hover:text-ink hover:bg-hairline-soft rounded-pill',
    dark: 'bg-surface-card text-ink hover:bg-surface-strong rounded-pill',
  };

  const sizes = {
    sm: 'h-8 px-3.5 text-[13px] gap-1.5',
    md: 'h-10 px-5 text-[15px] gap-2', // Standard 40px height from Design.md
    lg: 'h-12 px-7 text-[16px] gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
