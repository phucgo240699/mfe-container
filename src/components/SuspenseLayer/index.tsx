import React from 'react';
import { Spinner } from '@/components/Spinner';

interface SuspenseLayerProps {
  spinnerSize?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const SuspenseLayer: React.FC<SuspenseLayerProps> = ({
  spinnerSize,
  children,
}) => {
  return (
    <React.Suspense fallback={<Spinner size={spinnerSize} />}>
      {children}
    </React.Suspense>
  );
};
