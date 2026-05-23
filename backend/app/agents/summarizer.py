from app.core.llm import llm
from app.graph.state import AgentState

def summarizer_agent(state: AgentState):

    print("\n--- SUMMARIZER NODE STARTED ---\n")

    research = state["research"]

    prompt = f"""
    You are a research summarization agent.

    Summarize the following research into a clear report.

    Research:
    {research}
    """

    response = llm.invoke(prompt)

    print("\n--- SUMMARIZER NODE ENDED ---\n")

    return {
        "final_report": response.content
    }

