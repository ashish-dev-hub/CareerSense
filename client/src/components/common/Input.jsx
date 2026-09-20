import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Input({
  label,
  helperText,
  error,
  className = '',
  id,
  type = 'text',
  icon: Icon,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-[14px] font-medium text-ink mb-1.5"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
            <Icon className="w-4 h-4" />
          </div>
        )}
        
        <input
          id={inputId}
          type={type}
          className={twMerge(
            clsx(
              'w-full h-[44px] bg-surface-card text-ink rounded-lg border px-4 text-[15px] placeholder:text-muted-soft transition-colors duration-150',
              'focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink',
              error ? 'border-semantic-error focus:border-semantic-error focus:ring-semantic-error' : 'border-hairline-strong',
              Icon ? 'pl-10' : '',
              className
            )
          )}
          {...props}
        />
      </div>

      {error ? (
        <p className="mt-1.5 text-[13px] text-semantic-error">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-[13px] text-muted">{helperText}</p>
      ) : null}
    </div>
  );
}
