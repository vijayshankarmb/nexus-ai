from typing import TypedDict

class AgentState(TypedDict):
    query: str
    plan: str
    research: str
    final_result: str