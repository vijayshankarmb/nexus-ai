from langgraph.graph import StateGraph, START, END
from app.agents.planner import planner_agent
from app.graph.state import AgentState

graph_builder = StateGraph(AgentState)

graph_builder.add_node("planner", planner_agent)

graph_builder.add_edge(START, "planner")
graph_builder.add_edge("planner", END)

graph = graph_builder.compile()
