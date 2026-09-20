import React from 'react';
import Card from './Card';
import Button from './Button';

export default function EmptyState({
  title = 'No records found',
  description = 'Complete your profile setup to generate personalized career insights and recommendations.',
  actionText = 'Get Started',
  onAction,
  icon: Icon,
  className = '',
}) {
  return (
    <Card className={`p-12 text-center max-w-lg mx-auto my-12 border-dashed ${className}`}>
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-surface-strong text-muted flex items-center justify-center mx-auto mb-5">
          <Icon className="w-6 h-6" />
        </div>
      )}

      <h3 className="font-serif text-display-sm text-ink mb-2">
        {title}
      </h3>

      <p className="text-[15px] text-body mb-8 max-w-sm mx-auto leading-relaxed">
        {description}
      </p>

      {onAction && actionText && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </Card>
  );
}
