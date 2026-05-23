from app.graph.state import AgentState
from app.tools.web_search import web_search_tool

def researcher_agent(state: AgentState):

    query = state["query"]

    results = web_search_tool(query)

    formatted_results = []

    for result in results:
        formatted_results.append(
            f"""
    Title: {result['title']}
    Content: {result['content']}
    URL: {result['url']}
    """
        )

    research_data = "\n\n".join(formatted_results)

    return {
        "research": research_data
    }
    
