'use client'
import React, { useState, useEffect } from 'react';
import { Bot, Database, Zap, Loader2 } from 'lucide-react';
import { Session, AgentState } from '../types';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import ActivityTimeline from '../components/ActivityTimeline';
import AgentCard from '../components/AgentCard';
import ReportViewer from '../components/ReportViewer';
import Stepper from '../components/Stepper';

const parseResearchString = (researchStr: string) => {
  const sources = [];
  const blocks = researchStr.split('Title:').filter(b => b.trim());
  for (const block of blocks) {
    const titleMatch = block.split('Content:');
    if (titleMatch.length < 2) continue;
    const title = titleMatch[0].trim();
    
    const contentMatch = titleMatch[1].split('URL:');
    const content = contentMatch[0].trim();
    const url = contentMatch.length > 1 ? contentMatch[1].trim() : '';
    
    sources.push({ title, content, url });
  }
  return sources;
};

const INITIAL_STATE: AgentState = {
  search_tasks: [],
  research: "",
  final_report: "",
  events: [],
  status: 'idle'
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [isResearching, setIsResearching] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [agentState, setAgentState] = useState<AgentState>(INITIAL_STATE);
  
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isFetchingSessions, setIsFetchingSessions] = useState(true);

  // Load sessions from API or LocalStorage
  useEffect(() => {
    const loadSessions = async () => {
      setIsFetchingSessions(true);
      try {
        const res = await fetch('http://localhost:8000/reports');
        if (res.ok) {
          const data = await res.json();
          setSessions(data);
          setIsFetchingSessions(false);
          return;
        }
      } catch (err) {
        console.warn("Failed to fetch /reports, falling back to localStorage");
      }
      
      const local = localStorage.getItem('nexus_sessions');
      if (local) {
        try {
          setSessions(JSON.parse(local));
        } catch (e) {}
      }
      setIsFetchingSessions(false);
    };
    loadSessions();
  }, []);

  // Save sessions to LocalStorage when updated
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('nexus_sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  const loadSession = async (sessionId: string) => {
    if (isResearching) return;
    setActiveSessionId(sessionId);
    setHasStarted(true);
    setIsResearching(true); // temporary while loading
    setAgentState(INITIAL_STATE);

    const sessionObj = sessions.find(s => s.session_id === sessionId);
    if (sessionObj) setQuery(sessionObj.query);

    try {
      const res = await fetch(`http://localhost:8000/reports/${sessionId}`);
      if (res.ok) {
        const reports = await res.json();
        if (reports && reports.length > 0) {
          const lastReport = reports[reports.length - 1];
          setAgentState({
            search_tasks: [],
            research: "",
            final_report: lastReport.content || "",
            events: ["Report loaded from history."],
            status: 'completed'
          });
        } else {
          setAgentState({
            ...INITIAL_STATE,
            events: ["No report content found for this session."]
          });
        }
      } else {
        // Fallback for missing backend impl
        setAgentState({
          ...INITIAL_STATE,
          events: ["Failed to load report from server.", "The backend endpoint might not be fully implemented yet."]
        });
      }
    } catch (err) {
      console.error(err);
      setAgentState({
        ...INITIAL_STATE,
        events: ["Network error when loading report."]
      });
    } finally {
      setIsResearching(false);
    }
  };

  const handleNewResearch = () => {
    if (isResearching) return;
    setActiveSessionId(null);
    setQuery("");
    setHasStarted(false);
    setAgentState(INITIAL_STATE);
  };

  const handleResearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim() || isResearching) return;

    setHasStarted(true);
    setIsResearching(true);
    
    const sessionId = "session_" + Math.random().toString(36).substring(7);
    setActiveSessionId(sessionId);
    
    // Add to sessions list
    setSessions(prev => [
      { session_id: sessionId, query, created_at: new Date().toISOString() },
      ...prev
    ]);

    setAgentState({
      ...INITIAL_STATE,
      status: 'planning'
    });

    try {
      const eventSource = new EventSource(
        `http://localhost:8000/research/stream?query=${encodeURIComponent(query)}&session_id=${sessionId}`
      );

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          setAgentState((prev) => {
            const newState = { ...prev };
            const node = Object.keys(data)[0];
            const nodeData = data[node] || data;
            
            if (nodeData.search_tasks) {
              newState.search_tasks = nodeData.search_tasks;
              newState.status = 'researching';
            }
            if (nodeData.research) {
              newState.research = nodeData.research;
              newState.status = 'summarizing';
            }
            if (nodeData.final_report) {
              newState.final_report = nodeData.final_report;
              newState.status = 'completed';
            }
            if (nodeData.events) {
              // Deduplicate events by filtering out any that already exist in prev.events
              const newUniqueEvents = nodeData.events.filter((ev: string) => !prev.events.includes(ev));
              if (newUniqueEvents.length > 0) {
                newState.events = [...prev.events, ...newUniqueEvents];
              }
            }
            
            return newState;
          });
        } catch (error) {
          console.error("Error parsing event data", error);
        }
      };

      eventSource.onerror = (error) => {
        eventSource.close();
        setIsResearching(false);
        setAgentState(prev => ({ ...prev, status: prev.final_report ? 'completed' : prev.status }));
      };
    } catch (err) {
      console.error("Error starting research", err);
      setIsResearching(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-gray-200 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* LEFT SIDEBAR */}
      <Sidebar 
        sessions={sessions} 
        activeSessionId={activeSessionId} 
        onSessionSelect={loadSession} 
        onNewResearch={handleNewResearch} 
        isLoading={isFetchingSessions}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto relative custom-scrollbar">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center min-h-full">
          
          {/* Header Section */}
          <div className={`transition-all duration-700 ease-in-out flex flex-col items-center w-full ${hasStarted ? 'mt-4 mb-8' : 'mt-[20vh] mb-12'}`}>
            {!hasStarted && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6 backdrop-blur-sm shadow-inner">
                <Zap className="w-4 h-4" />
                <span>Nexus AI Engine</span>
              </div>
            )}
            <h1 className={`font-extrabold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-500 drop-shadow-sm transition-all duration-700 ${hasStarted ? 'text-3xl mb-4' : 'text-5xl lg:text-6xl mb-6'}`}>
              Research Assistant
            </h1>
            <p className={`text-gray-400 text-center max-w-2xl text-lg transition-all duration-500 ${hasStarted ? 'opacity-0 h-0 overflow-hidden m-0' : 'opacity-100'}`}>
              Enter a topic to generate comprehensive research, complete with a structured plan, data collection, and a final synthesized report.
            </p>
          </div>

          {/* Search Input */}
          <SearchBar 
            query={query} 
            setQuery={setQuery} 
            onResearch={handleResearch} 
            isResearching={isResearching} 
            hasStarted={hasStarted} 
          />

          {/* Results Panel */}
          {hasStarted && (
            <div className="w-full animate-in fade-in slide-in-from-bottom-10 duration-700 pb-20">
              
              <Stepper status={agentState.status} />

              <div className="flex flex-col gap-6 max-w-4xl mx-auto">
                
                {/* Timeline / Events (Compact) */}
                <ActivityTimeline events={agentState.events} isResearching={isResearching} />
                
                {/* Planner Card */}
                <AgentCard 
                  title="Research Plan"
                  icon={Bot}
                  iconColorClass="text-blue-400"
                  gradientClass="from-blue-500/50"
                  isActive={agentState.status === 'planning'}
                  isDone={agentState.search_tasks.length > 0}
                  loadingMessage="Generating strategic plan..."
                  emptyMessage="Awaiting execution"
                  reportStatus={agentState.status}
                  content={
                    <div className="grid gap-3 sm:grid-cols-2">
                      {agentState.search_tasks.map((task, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-gray-800/20 border border-gray-700/30">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mt-0.5">{idx + 1}</span>
                          <span className="text-gray-300 text-sm leading-relaxed">{task}</span>
                        </div>
                      ))}
                    </div>
                  }
                />

                {/* Researcher Card */}
                <AgentCard 
                  title="Data Collection"
                  icon={Database}
                  iconColorClass="text-purple-400"
                  gradientClass="from-purple-500/50"
                  isActive={agentState.status === 'researching'}
                  isDone={!!agentState.research}
                  loadingMessage="Collecting and analyzing data..."
                  emptyMessage="Awaiting plan completion"
                  reportStatus={agentState.status}
                  delay={100}
                  content={
                    <div className="flex flex-row gap-4 overflow-x-auto custom-scrollbar pb-2 pt-1 px-1">
                      {parseResearchString(agentState.research).map((source, idx) => {
                        let hostname = 'Source Link';
                        try {
                          hostname = new URL(source.url).hostname;
                        } catch(e) {}
                        return (
                          <div key={idx} className="min-w-[280px] w-[280px] flex-shrink-0 bg-gray-900/40 border border-gray-800/80 rounded-xl p-4 flex flex-col gap-3 shadow-sm hover:border-purple-500/50 transition-colors">
                            <h3 className="text-sm font-semibold text-gray-200 line-clamp-2 leading-snug" title={source.title}>{source.title}</h3>
                            <p className="text-xs text-gray-400 line-clamp-4 flex-1">{source.content}</p>
                            {source.url && (
                              <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-400 hover:text-purple-300 truncate mt-1 underline underline-offset-2">
                                {hostname}
                              </a>
                            )}
                          </div>
                        );
                      })}
                      {agentState.status === 'researching' && (
                         <div className="min-w-[280px] w-[280px] flex-shrink-0 bg-gray-900/10 border border-gray-800 border-dashed rounded-xl p-4 flex items-center justify-center">
                           <span className="flex items-center gap-2 text-gray-500 text-sm"><Loader2 className="w-4 h-4 animate-spin"/> Mining data...</span>
                         </div>
                      )}
                    </div>
                  }
                />

                {/* Summarizer Card - Made more prominent */}
                <div className="mt-4">
                  <ReportViewer 
                    report={agentState.final_report} 
                    isResearching={isResearching} 
                    isActive={agentState.status === 'summarizing'} 
                  />
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Global styles for custom scrollbar passed to a global component or layout, but keeping here for simplicity */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #27272a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #3f3f46;
        }
      `}} />
    </div>
  );
}