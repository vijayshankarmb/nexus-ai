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
from app.services.report_services import load_report_from_db
from app.utils.llm_parser import extract_text

def planner_agent(state: AgentState):
    log_node_start("planner agent")
    timer = start_timer()

    query = state["query"]

    session_id = state["session_id"]

    past_reports = load_report_from_db(session_id)
    memory_context = "\n\n".join(past_reports)

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
Previous research memory:
{memory_context}
"""

    response = llm.invoke(prompt)
    
    cleaned_response = extract_text(response.content).strip()
    search_tasks = json.loads(cleaned_response)
    
    execution_time = end_timer(timer)
    log_info(f"planner execution time: {execution_time}s")
    log_node_end("planner agent")
    return {
        "search_tasks": search_tasks,
        "events": [
            "Planner started",
            f"Generated {len(search_tasks)} search tasks",
            "Planner completed"
        ]
    }

