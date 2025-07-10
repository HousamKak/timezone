import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: string;
  className?: string;
  showValue?: boolean;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'var(--primary-color)',
  height = '4px',
  className = '',
  showValue = false,
  label
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`progress-bar-container ${className}`}>
      {label && (
        <div className="flex justify-content-between align-items-center mb-1">
          <span className="text-sm text-900">{label}</span>
          {showValue && (
            <span className="text-sm font-bold text-600">{value}%</span>
          )}
        </div>
      )}
      <div 
        className="progress-bar-track"
        style={{ 
          height,
          backgroundColor: 'var(--surface-200)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}
      >
        <div 
          className="progress-bar-fill"
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: color,
            transition: 'width 0.3s ease-in-out',
            borderRadius: '2px'
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
