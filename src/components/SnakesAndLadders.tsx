import React from 'react';
import { Snake, Ladder } from '../types/game';

interface SnakeProps {
  snake: Snake;
  getTileCenter: (tileNumber: number) => { x: number; y: number };
  theme: 'classic' | 'cartoon';
}

interface LadderProps {
  ladder: Ladder;
  getTileCenter: (tileNumber: number) => { x: number; y: number };
  theme: 'classic' | 'cartoon';
}

export const SnakeComponent: React.FC<SnakeProps> = ({ snake, getTileCenter, theme }) => {
  const headPos = getTileCenter(snake.head);
  const tailPos = getTileCenter(snake.tail);
  
  const length = Math.sqrt(Math.pow(tailPos.x - headPos.x, 2) + Math.pow(tailPos.y - headPos.y, 2));
  const angle = Math.atan2(tailPos.y - headPos.y, tailPos.x - headPos.x);

  // Create curved snake body with multiple segments
  const createSnakePath = () => {
    const segments = 8;
    const amplitude = 15; // How much the snake curves
    const frequency = 2; // How many curves along the snake
    
    let path = `M ${headPos.x} ${headPos.y}`;
    
    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const x = headPos.x + (tailPos.x - headPos.x) * t;
      const y = headPos.y + (tailPos.y - headPos.y) * t;
      
      // Add sinusoidal curve perpendicular to the snake direction
      const perpX = -Math.sin(angle);
      const perpY = Math.cos(angle);
      const curve = Math.sin(t * Math.PI * frequency) * amplitude * (1 - t * 0.5); // Taper the curve
      
      const curvedX = x + perpX * curve;
      const curvedY = y + perpY * curve;
      
      if (i === 1) {
        path += ` Q ${curvedX} ${curvedY}`;
      } else {
        path += ` ${curvedX} ${curvedY}`;
      }
      
      if (i < segments) {
        path += ` T`;
      }
    }
    
    return path;
  };

  const snakePath = createSnakePath();

  return (
    <g>
      {/* Snake body with curved path */}
      <path
        d={snakePath}
        stroke="hsl(var(--snake-body))"
        strokeWidth={theme === 'cartoon' ? '14' : '10'}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="drop-shadow-lg"
      />
      
      {/* Snake body pattern (stripes) */}
      <path
        d={snakePath}
        stroke="hsl(var(--snake-head))"
        strokeWidth={theme === 'cartoon' ? '8' : '6'}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray="8 12"
        className="drop-shadow-sm"
      />
      
      {/* Snake head */}
      <ellipse
        cx={headPos.x}
        cy={headPos.y}
        rx={theme === 'cartoon' ? '12' : '10'}
        ry={theme === 'cartoon' ? '8' : '6'}
        fill="hsl(var(--snake-head))"
        className="drop-shadow-md"
        transform={`rotate(${angle * 180 / Math.PI} ${headPos.x} ${headPos.y})`}
      />
      
      {/* Snake eyes */}
      <circle cx={headPos.x - 4} cy={headPos.y - 2} r="2" fill="white" />
      <circle cx={headPos.x + 4} cy={headPos.y - 2} r="2" fill="white" />
      <circle cx={headPos.x - 4} cy={headPos.y - 2} r="1" fill="black" />
      <circle cx={headPos.x + 4} cy={headPos.y - 2} r="1" fill="black" />
      
      {/* Snake tongue (cartoon theme) */}
      {theme === 'cartoon' && (
        <g>
          <line
            x1={headPos.x + 8}
            y1={headPos.y}
            x2={headPos.x + 15}
            y2={headPos.y - 2}
            stroke="red"
            strokeWidth="1"
          />
          <line
            x1={headPos.x + 8}
            y1={headPos.y}
            x2={headPos.x + 15}
            y2={headPos.y + 2}
            stroke="red"
            strokeWidth="1"
          />
        </g>
      )}
      
      {/* Snake tail */}
      <circle
        cx={tailPos.x}
        cy={tailPos.y}
        r={theme === 'cartoon' ? '4' : '3'}
        fill="hsl(var(--snake-body))"
        className="drop-shadow-sm"
      />
    </g>
  );
};

export const LadderComponent: React.FC<LadderProps> = ({ ladder, getTileCenter, theme }) => {
  const bottomPos = getTileCenter(ladder.bottom);
  const topPos = getTileCenter(ladder.top);
  
  const length = Math.sqrt(Math.pow(topPos.x - bottomPos.x, 2) + Math.pow(topPos.y - bottomPos.y, 2));
  const angle = Math.atan2(topPos.y - bottomPos.y, topPos.x - bottomPos.x) * (180 / Math.PI);
  
  // Calculate rung positions
  const rungCount = Math.floor(length / 20);
  const rungs = [];
  
  for (let i = 1; i < rungCount; i++) {
    const ratio = i / rungCount;
    const rungX = bottomPos.x + (topPos.x - bottomPos.x) * ratio;
    const rungY = bottomPos.y + (topPos.y - bottomPos.y) * ratio;
    rungs.push({ x: rungX, y: rungY });
  }

  return (
    <g>
      {/* Ladder sides */}
      <line
        x1={bottomPos.x - 8}
        y1={bottomPos.y}
        x2={topPos.x - 8}
        y2={topPos.y}
        stroke="hsl(var(--ladder-color))"
        strokeWidth={theme === 'cartoon' ? '6' : '4'}
        strokeLinecap="round"
        className="drop-shadow-sm"
      />
      <line
        x1={bottomPos.x + 8}
        y1={bottomPos.y}
        x2={topPos.x + 8}
        y2={topPos.y}
        stroke="hsl(var(--ladder-color))"
        strokeWidth={theme === 'cartoon' ? '6' : '4'}
        strokeLinecap="round"
        className="drop-shadow-sm"
      />
      
      {/* Ladder rungs */}
      {rungs.map((rung, index) => (
        <line
          key={index}
          x1={rung.x - 8}
          y1={rung.y}
          x2={rung.x + 8}
          y2={rung.y}
          stroke="hsl(var(--ladder-color))"
          strokeWidth={theme === 'cartoon' ? '4' : '3'}
          strokeLinecap="round"
          className="drop-shadow-sm"
        />
      ))}
    </g>
  );
};