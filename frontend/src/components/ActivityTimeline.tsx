import React, { useEffect, useRef } from 'react';
import { Activity, Loader2 } from 'lucide-react';

interface ActivityTimelineProps {
  events: string[];
  isResearching: boolean;
}

export default function ActivityTimeline({ events, isResearching }: ActivityTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [events]);

  return (
    <div className="bg-[#0a0a0c] border border-gray-800/80 rounded-2xl p-4 flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3 shrink-0 pb-3 border-b border-gray-800/50">
        <div className="p-1.5 bg-indigo-500/10 rounded-lg">
          <Activity className="w-4 h-4 text-indigo-400" />
        </div>
        <h2 className="text-md font-medium text-white">Execution Logs</h2>
        {isResearching && <Loader2 className="w-3 h-3 animate-spin text-gray-500 ml-auto" />}
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 max-h-[150px]">
        <div className="space-y-3 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px before:h-full before:w-[1px] before:bg-gradient-to-b before:from-indigo-500/50 before:via-gray-800 before:to-transparent">
          {events.length === 0 && (
            <div className="text-gray-500 text-xs italic pl-6">Initializing engines...</div>
          )}
          {events.map((event, idx) => (
            <div key={idx} className="relative flex items-start gap-3">
              <div className="flex items-center justify-center w-4 h-4 rounded-full border-[2px] border-[#0a0a0c] bg-indigo-500 shrink-0 z-10 mt-0.5"></div>
              <div className="flex-1 px-3 py-2 rounded-lg bg-gray-800/20 border border-gray-700/20 backdrop-blur-sm">
                <p className="text-xs text-gray-400">{event}</p>
              </div>
            </div>
          ))}
          {isResearching && (
            <div className="relative flex items-start gap-3 animate-pulse">
              <div className="flex items-center justify-center w-4 h-4 rounded-full border-[2px] border-[#0a0a0c] bg-gray-600 shrink-0 z-10 mt-0.5"></div>
              <div className="flex-1 px-3 py-2 rounded-lg bg-gray-800/10 border border-gray-700/10">
                <p className="text-xs text-gray-500">Working...</p>
              </div>
            </div>
          )}
          <div ref={scrollRef} className="h-1"></div>
        </div>
      </div>
    </div>
  );
}
