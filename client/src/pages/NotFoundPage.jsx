import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import AtmosphericOrb from '../components/common/AtmosphericOrb';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="relative py-16 text-center max-w-lg mx-auto">
      <AtmosphericOrb variant="lavender" size="md" className="-top-12 -left-12 opacity-30" />
      <Card className="p-10 text-center">
        <span className="font-serif text-[72px] text-ink font-light leading-none block mb-4">
          404
        </span>
        <h1 className="font-serif text-display-sm text-ink mb-3">
          Page Not Found
        </h1>
        <p className="text-[15px] text-body mb-8">
          The career view or module you requested does not exist or has been relocated.
        </p>
        <Link to="/">
          <Button variant="primary" icon={Home}>
            Return to CareerSense
          </Button>
        </Link>
      </Card>
    </div>
  );
}
