from app.core.llm import llm
from app.graph.state import AgentState
from app.utils.logger import (
    log_node_start,
    log_node_end,
    log_info
)
from app.utils.timer import (
    start_time,
    end_time
)

def summarizer_agent(state: AgentState):
    log_node_start("summarizer agent")
    timer = start_time()
    research = state["research"]

    prompt = f"""
    You are a research summarization agent.

    Summarize the following research into a clear report.

    Research:
    {research}
    """
    log_info("Summarizing the research")

    response = llm.invoke(prompt)

    execution_time = end_time(timer)

    log_info(f"summarizer execution time: {execution_time}s")

    log_node_end("summarizer agent")
    
    return {
        "final_report": response.content
    }

