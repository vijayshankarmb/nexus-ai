import asyncio
from app.graph.state import AgentState
from app.tools.web_search import web_search_tool
from app.utils.logger import (
    log_node_start,
    log_node_end,
    log_info
)
from app.utils.timer import (
    start_timer,
    end_timer
)

async def researcher_agent(state: AgentState):
    log_node_start("researcher agent")
    timer = start_timer()
    search_tasks = state["search_tasks"]

    for task in search_tasks:
        log_info(f"Researching: {task}")

    research_tasks = [
        web_search_tool(task) for task in search_tasks
    ]

    results = await asyncio.gather(*research_tasks)

    all_research = ""

    for result_set in results:
        for result in result_set:
            all_research += f"""
        Title: {result['title']}
        Content: {result['content']}
        URL: {result['url']}
        """
    execution_time = end_timer(timer)
    log_info(f"Research completed")
    log_info(f"researcher execution time: {execution_time}s")
    log_node_end("researcher agent")
    return {
        "research": all_research,
        "retry_count": state["retry_count"] + 1
    }
    
