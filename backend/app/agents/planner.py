from app.core.llm import llm
from app.graph.state import AgentState
import json

def planner_agent(state: AgentState):
    query = state["query"]

    prompt = f"""
You are a research planning agent.

Generate exactly 3 short web search queries.

Rules:
- Return ONLY valid JSON
- No markdown
- No explanation
- No code blocks

Example:
[
    "latest AI agent frameworks",
    "LangGraph vs CrewAI",
    "multi-agent systems"
]

Topic:
{query}
"""

    response = llm.invoke(prompt)
    try:
        cleaned_response = response.content.strip()
        search_tasks = json.loads(cleaned_response)
    except:
        search_tasks = [response.content]   
    return {"search_tasks": search_tasks}

