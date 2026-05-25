import React from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  query: string;
  setQuery: (q: string) => void;
  onResearch: (e?: React.FormEvent) => void;
  isResearching: boolean;
  hasStarted: boolean;
}

export default function SearchBar({ query, setQuery, onResearch, isResearching, hasStarted }: SearchBarProps) {
  return (
    <div className={`w-full max-w-3xl transition-all duration-500 z-20 ${hasStarted ? 'mb-8' : ''}`}>
      <form onSubmit={onResearch} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
        <div className="relative flex items-center bg-[#0a0a0c] border border-gray-800/60 rounded-2xl p-2 backdrop-blur-xl shadow-2xl focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
          <Search className="w-6 h-6 text-gray-500 ml-4 hidden sm:block" />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What would you like to research today?"
            className="flex-1 bg-transparent border-none outline-none px-4 py-3.5 text-lg text-white placeholder-gray-600 focus:ring-0"
            disabled={isResearching}
          />
          <button 
            type="submit"
            disabled={!query.trim() || isResearching}
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
          >
            {isResearching ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="hidden sm:inline">Researching</span>
              </>
            ) : (
              <span>Start</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
