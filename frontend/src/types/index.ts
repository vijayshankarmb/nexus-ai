export interface Session {
  session_id: string;
  query: string;
  created_at?: string;
}

export interface AgentState {
  search_tasks: string[];
  research: string;
  final_report: string;
  events: string[];
  status: 'idle' | 'planning' | 'researching' | 'summarizing' | 'completed';
}
