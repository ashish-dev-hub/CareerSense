import React from 'react';
import Card from './Card';
import Button from './Button';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function ErrorState({
  title = 'Something unexpected occurred',
  message = 'We could not process your request right now. Please check your connection or try again.',
  onRetry,
  onCancel,
  className = '',
}) {
  return (
    <Card className={`p-10 text-center max-w-lg mx-auto my-12 ${className}`}>
      <div className="w-12 h-12 rounded-full bg-[#fdf2f4] text-semantic-error border border-[#e8b8c4] flex items-center justify-center mx-auto mb-5">
        <AlertCircle className="w-6 h-6" />
      </div>

      <h3 className="font-serif text-display-sm text-ink mb-2.5">
        {title}
      </h3>

      <p className="text-[15px] text-body mb-8 max-w-md mx-auto leading-relaxed">
        {message}
      </p>

      <div className="flex items-center justify-center gap-3">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Go Back
          </Button>
        )}
        {onRetry && (
          <Button variant="primary" icon={RotateCcw} onClick={onRetry}>
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
}
