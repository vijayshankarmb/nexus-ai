from langgraph.graph import StateGraph, START, END
from app.agents.planner import planner_agent
from app.graph.state import AgentState
from app.agents.researcher import researcher_agent
from app.agents.summarizer import summarizer_agent

graph_builder = StateGraph(AgentState)

graph_builder.add_node("planner", planner_agent)
graph_builder.add_node("researcher", researcher_agent)
graph_builder.add_node("summarizer", summarizer_agent)

graph_builder.add_edge(START, "planner")
graph_builder.add_edge("planner", "researcher")
graph_builder.add_edge("researcher", "summarizer")
graph_builder.add_edge("summarizer", END)

graph = graph_builder.compile()
