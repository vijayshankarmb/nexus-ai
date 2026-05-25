import React from 'react';
import { Plus, MessageSquare, Clock, Zap } from 'lucide-react';
import { Session } from '../types';

interface SidebarProps {
  sessions: Session[];
  activeSessionId: string | null;
  onSessionSelect: (id: string) => void;
  onNewResearch: () => void;
  isLoading?: boolean;
}

export default function Sidebar({ sessions, activeSessionId, onSessionSelect, onNewResearch, isLoading }: SidebarProps) {
  return (
    <div className="w-64 h-screen flex-shrink-0 bg-[#0a0a0c] border-r border-gray-800/60 hidden md:flex flex-col">
      <div className="p-4">
        <div className="flex items-center gap-2 px-2 py-3 mb-4">
          <div className="p-1.5 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
            <Zap className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Nexus AI</span>
        </div>

        <button
          onClick={onNewResearch}
          className="w-full flex items-center justify-center gap-2 bg-white text-black px-4 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Research
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 custom-scrollbar">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">History</div>
        {isLoading ? (
          <div className="space-y-2 px-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-full h-14 bg-gray-800/40 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="px-2 text-sm text-gray-500 italic">No previous research</div>
        ) : (
          <div className="space-y-1">
            {sessions.map((session) => (
              <button
                key={session.session_id}
                onClick={() => onSessionSelect(session.session_id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-start gap-3 transition-colors ${
                  activeSessionId === session.session_id
                    ? 'bg-gray-800/80 text-white'
                    : 'text-gray-400 hover:bg-gray-800/40 hover:text-gray-200'
                }`}
              >
                <MessageSquare className="w-4 h-4 mt-0.5 shrink-0 opacity-70" />
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-medium truncate">{session.query}</div>
                  {session.created_at && (
                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(session.created_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
