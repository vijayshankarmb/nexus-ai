from app.graph.state import AgentState

def should_retry(state: AgentState):

    research = state.get("research", "")
    retry_count = state.get("retry_count", 0)

    if len(research) < 500:

        if retry_count >= 2:
            return "summarizer"

        return "retry"

    return "summarizer"