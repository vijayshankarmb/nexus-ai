import React, { useState, useEffect, useRef } from 'react';
import { LucideIcon, CheckCircle2, Loader2, ChevronDown } from 'lucide-react';

interface AgentCardProps {
  title: string;
  icon: LucideIcon;
  iconColorClass: string;
  gradientClass: string;
  content: React.ReactNode;
  isActive: boolean;
  isDone: boolean;
  loadingMessage: string;
  emptyMessage: string;
  delay?: number;
  reportStatus?: string;
}

export default function AgentCard({
  title, icon: Icon, iconColorClass, gradientClass, content, isActive, isDone, loadingMessage, emptyMessage, delay = 0, reportStatus
}: AgentCardProps) {
  
  const [isExpanded, setIsExpanded] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-collapse when report is completed or when no longer active but done
  useEffect(() => {
    if (reportStatus === 'completed' || (isDone && !isActive)) {
      setIsExpanded(false);
    } else if (isActive) {
      setIsExpanded(true);
    }
  }, [reportStatus, isActive, isDone]);

  const showContent = isDone || (isActive && content);

  return (
    <div 
      className={`transition-all duration-500 bg-[#0a0a0c] border border-gray-800/80 rounded-2xl relative overflow-hidden shadow-sm hover:shadow-md ${
        showContent || isActive ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-2'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradientClass} opacity-50`}></div>
      
      <button 
        onClick={() => showContent && setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-3 p-5 text-left focus:outline-none focus-visible:bg-gray-800/50 transition-colors cursor-pointer"
        disabled={!showContent && !isActive}
      >
        <div className={`p-2 rounded-lg bg-gray-800/50`}>
          <Icon className={`w-5 h-5 ${iconColorClass}`} />
        </div>
        <h2 className="text-lg font-medium text-white flex-1">{title}</h2>
        
        <div className="flex items-center gap-3">
          {isActive && <Loader2 className="w-5 h-5 animate-spin text-gray-500" />}
          {isDone && !isActive && <CheckCircle2 className="w-5 h-5 text-green-500" />}
          
          {showContent && (
            <ChevronDown 
              className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            />
          )}
        </div>
      </button>
      
      <div 
        ref={contentRef}
        className="transition-all duration-500 ease-in-out overflow-hidden"
        style={{ maxHeight: isExpanded ? '1000px' : '0px', opacity: isExpanded ? 1 : 0 }}
      >
        <div className="p-5 pt-0">
          {showContent ? (
            <div className="animate-in fade-in duration-500">
              {content}
            </div>
          ) : (
            <div className="h-24 flex flex-col items-center justify-center text-gray-500 border border-dashed border-gray-800 rounded-xl bg-gray-900/20">
              {isActive ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin"/> {loadingMessage}
                </span>
              ) : (
                emptyMessage
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
