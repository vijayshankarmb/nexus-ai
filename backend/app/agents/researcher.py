from app.graph.state import AgentState
from app.tools.web_search import web_search_tool

def researcher_agent(state: AgentState):

    search_tasks = state["search_tasks"]

    all_research = []
    
    for task in search_tasks:
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

    return {
        "research": research_data
    }
    

