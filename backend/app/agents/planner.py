from app.core.llm import llm
from app.graph.state import AgentState

def planner_agent(state: AgentState):
    query = state["query"]
    prompt = f"""
    You are a research planning agent.

    Create a concise research plan with:
    - main research areas
    - key topics to investigate
    - information needed

    Keep the response short and clear.

    Topic:
    {query}
    """

    response = llm.invoke(prompt)

    return {"plan": response.content}

