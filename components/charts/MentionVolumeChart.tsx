'use client';

import { useMemo } from 'react';

interface MentionDataPoint {
  date: string;
  mentions: number;
  sentiment: number;
}

interface MentionVolumeChartProps {
  data: MentionDataPoint[];
  height?: number;
}

export default function MentionVolumeChart({ data, height = 200 }: MentionVolumeChartProps) {
  const maxMentions = useMemo(() => Math.max(...data.map(d => d.mentions)), [data]);
  
  return (
    <div className="w-full" style={{ height }}>
      <div className="flex items-end justify-between h-full space-x-1">
        {data.map((day, index) => {
          const barHeight = (day.mentions / maxMentions) * (height - 40);
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center group">
              {/* Volume Bar */}
              <div className="relative flex flex-col items-center w-full">
                <div 
                  className="w-full bg-[var(--primary)] rounded-t transition-all duration-300 hover:bg-[var(--primary-dark)]"
                  style={{ height: `${barHeight}px` }}
                />
                
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 p-2 bg-black text-white text-xs rounded shadow-lg transition-opacity duration-200 whitespace-nowrap z-10">
                  <div>Date: {new Date(day.date).toLocaleDateString()}</div>
                  <div>Mentions: {day.mentions}</div>
                  <div>Avg Sentiment: {Math.round(day.sentiment * 100)}%</div>
                </div>
              </div>
              
              {/* Date Label */}
              <span className="text-xs text-[var(--text-secondary)] mt-2">
                {new Date(day.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}