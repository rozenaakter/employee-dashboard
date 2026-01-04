import React from 'react';

interface PerformanceBarProps {
  score: number;
}

const PerformanceBar: React.FC<PerformanceBarProps> = ({ score }) => {
  // Determine color based on score
  const getColor = (score: number): string => {
    if (score > 70) return '#52c41a'; // Green
    if (score > 40) return '#faad14'; // Orange
    return '#ff4d4f'; // Red
  };

  const color = getColor(score);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {/* Progress bar */}
      <div
        style={{
          width: 100,
          height: 8,
          background: '#f0f0f0',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${score}%`,
            height: '100%',
            background: color,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      
      {/* Score text */}
      <span style={{ minWidth: 40, fontWeight: 500 }}>{score}%</span>
    </div>
  );
};

// Named export (এটা important!)
export { PerformanceBar };