import { ReactNode } from 'react';
import { Card } from '@/components/ui';
import { cn } from '@/utils/helpers';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray';
  loading?: boolean;
}

const colorClasses = {
  blue: 'bg-blue-500 text-white',
  green: 'bg-green-500 text-white',
  red: 'bg-red-500 text-white',
  yellow: 'bg-yellow-500 text-white',
  purple: 'bg-purple-500 text-white',
  gray: 'bg-gray-500 text-white',
};

export const MetricCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'blue',
  loading = false,
}: MetricCardProps) => {
  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-8 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </Card>
    );
  }

  return (
    <Card className={cn('relative overflow-hidden', colorClasses[color])}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium opacity-90">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm opacity-75 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  'text-xs px-2 py-1 rounded-full',
                  trend.value >= 0
                    ? 'bg-white/20 text-white'
                    : 'bg-white/20 text-white'
                )}
              >
                {trend.value >= 0 ? '↗' : '↘'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs opacity-75 ml-2">{trend.label}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 opacity-80">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};
