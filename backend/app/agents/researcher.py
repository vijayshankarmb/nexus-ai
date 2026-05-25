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

    events = [
        "Researcher started"
    ]

    for task in search_tasks:
        log_info(f"Researching: {task}")
        events.append(f"Researching: {task}")

    research_tasks = [
        web_search_tool(task) for task in search_tasks
    ]

    results = await asyncio.gather(*research_tasks)

    all_research = ""
    seen_urls = set()

    for result_set in results:
        for result in result_set:
            url = result.get('url')
            if url in seen_urls:
                continue
            seen_urls.add(url)
            all_research += f"""
        Title: {result.get('title')}
        Content: {result.get('content')}
        URL: {url}
        """
    execution_time = end_timer(timer)
    log_info(f"Research completed")
    log_info(f"researcher execution time: {execution_time}s")
    log_node_end("researcher agent")
    events.append("Researcher completed")
    return {
        "research": all_research,
        "retry_count": state["retry_count"] + 1,
        "events": events
    }
    
