from app.core.llm import llm
from app.graph.state import AgentState
from app.utils.logger import (
    log_node_start,
    log_node_end,
    log_info
)
from app.utils.timer import (
    start_timer,
    end_timer
)
from app.services.report_services import save_report_to_db
from app.utils.llm_parser import extract_text

def summarizer_agent(state: AgentState):
    log_node_start("summarizer agent")
    timer = start_timer()
    research = state["research"]

    prompt = f"""
    You are a research summarization agent.

    Summarize the following research into a clear report.

    Research:
    {research}
    """
    log_info("Summarizing the research")

    response = llm.invoke(prompt)

    summary = extract_text(response.content)

    session_id = state["session_id"]

    save_report_to_db(session_id, state["query"], summary)

    execution_time = end_timer(timer)

    log_info(f"summarizer execution time: {execution_time}s")

    log_node_end("summarizer agent")

    events = [
        "Summarizer started",
        "Generating final report",
        "Final report completed"
    ]
    
    return {
        "final_report": summary,
        "events": events
    }

