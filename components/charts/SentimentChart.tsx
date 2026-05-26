'use client';

import { useMemo } from 'react';

interface SentimentDataPoint {
  date: string;
  sentiment: number;
  mentions: number;
}

interface SentimentChartProps {
  data: SentimentDataPoint[];
  height?: number;
}

export default function SentimentChart({ data, height = 200 }: SentimentChartProps) {
  const maxMentions = useMemo(() => Math.max(...data.map(d => d.mentions)), [data]);
  
  return (
    <div className="w-full" style={{ height }}>
      <div className="flex items-end justify-between h-full space-x-1">
        {data.map((day, index) => {
          const sentimentColor = 
            day.sentiment > 0.6 ? 'bg-green-500' :
            day.sentiment > 0.4 ? 'bg-yellow-500' :
            'bg-red-500';
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center group">
              {/* Sentiment Bar */}
              <div className="relative flex flex-col items-center w-full">
                <div 
                  className={`w-full rounded-t transition-all duration-300 group-hover:opacity-80 ${sentimentColor}`}
                  style={{ height: `${day.sentiment * (height - 40)}px` }}
                />
                
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 p-2 bg-black text-white text-xs rounded shadow-lg transition-opacity duration-200 whitespace-nowrap z-10">
                  <div>Date: {new Date(day.date).toLocaleDateString()}</div>
                  <div>Sentiment: {Math.round(day.sentiment * 100)}%</div>
                  <div>Mentions: {day.mentions}</div>
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