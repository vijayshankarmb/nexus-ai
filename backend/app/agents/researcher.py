from app.graph.state import AgentState
from app.tools.web_search import web_search_tool
from app.utils.logger import (
    log_node_start,
    log_node_end,
    log_info
)

def researcher_agent(state: AgentState):
    log_node_start("researcher agent")
    search_tasks = state["search_tasks"]

    all_research = []
    
    for task in search_tasks:
        log_info(f"Researching: {task}")
        results = web_search_tool(task)

        for result in results:
            all_research.append(
                f"""
    Title: {result['title']}
    Content: {result['content']}
    URL: {result['url']}
    """
        )

    research_data = "\n\n".join(all_research)
    log_node_end("researcher agent")
    return {
        "research": research_data,
        "retry_count": state["retry_count"] + 1
    }
    
