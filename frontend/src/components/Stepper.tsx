import React from 'react';
import { Bot, Database, FileText, CheckCircle2, Loader2, Circle } from 'lucide-react';

interface StepperProps {
  status: 'idle' | 'planning' | 'researching' | 'summarizing' | 'completed';
}

export default function Stepper({ status }: StepperProps) {
  const steps = [
    { id: 'planning', label: 'Planner', icon: Bot },
    { id: 'researching', label: 'Researcher', icon: Database },
    { id: 'summarizing', label: 'Summarizer', icon: FileText },
  ];

  const getStatusIndex = (s: string) => {
    switch (s) {
      case 'idle': return -1;
      case 'planning': return 0;
      case 'researching': return 1;
      case 'summarizing': return 2;
      case 'completed': return 3;
      default: return -1;
    }
  };

  const currentIndex = getStatusIndex(status);

  if (currentIndex === -1) return null;

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-800 -z-10 rounded-full"></div>
        {steps.map((step, idx) => {
          const isCompleted = currentIndex > idx;
          const isActive = currentIndex === idx;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 relative z-10 bg-[#050505] px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                isCompleted ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' :
                isActive ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]' :
                'bg-gray-900 border-gray-700 text-gray-500'
              }`}>
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : 
                 isActive ? <Loader2 className="w-5 h-5 animate-spin" /> : 
                 <Icon className="w-5 h-5" />}
              </div>
              <span className={`text-xs font-medium uppercase tracking-wider ${
                isActive ? 'text-indigo-400' :
                isCompleted ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
