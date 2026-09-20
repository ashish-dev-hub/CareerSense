import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Badge({
  children,
  variant = 'neutral',
  className = '',
  icon: Icon,
  ...props
}) {
  const baseStyles = 'inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-caption-upper shrink-0 select-none';

  const variants = {
    neutral: 'bg-surface-strong text-ink border border-hairline',
    mint: 'bg-[#eaf8f4] text-[#14532d] border border-[#a7e5d3]/70',
    peach: 'bg-[#fff5ee] text-[#854d0e] border border-[#f4c5a8]/70',
    lavender: 'bg-[#f4f0fa] text-[#4c1d95] border border-[#c8b8e0]/70',
    sky: 'bg-[#f0f6fc] text-[#0c4a6e] border border-[#a8c8e8]/70',
    rose: 'bg-[#fdf2f4] text-[#881337] border border-[#e8b8c4]/70',
    ink: 'bg-ink text-white',
    outline: 'bg-transparent text-body border border-hairline-strong',
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      {...props}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}
