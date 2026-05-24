from app.core.llm import llm
from app.graph.state import AgentState
import json
from app.utils.logger import (
    log_node_start,
    log_node_end,
    log_info
)
from app.utils.timer import (
    start_timer,
    end_timer
)

def planner_agent(state: AgentState):
    log_node_start("planner agent")
    timer = start_timer()

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
        log_info(f"Generated {len(search_tasks)} search tasks")
    except:
        search_tasks = [response.content]   
    execution_time = end_timer(timer)
    log_info(f"planner execution time: {execution_time}s")
    log_node_end("planner agent")
    return {"search_tasks": search_tasks}

