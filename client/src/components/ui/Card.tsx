import { ReactNode } from 'react';
import { cn } from '@/utils/helpers';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = ({ children, className, padding = 'md' }: CardProps) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div className={cn('border-b border-gray-200 dark:border-gray-700 pb-4 mb-4', className)}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className }: CardContentProps) => {
  return <div className={cn('', className)}>{children}</div>;
};

export const CardFooter = ({ children, className }: CardFooterProps) => {
  return (
    <div className={cn('border-t border-gray-200 dark:border-gray-700 pt-4 mt-4', className)}>
      {children}
    </div>
  );
};
