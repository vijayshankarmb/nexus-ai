from typing import List
from typing import TypedDict

class AgentState(TypedDict):
    query: str
    search_tasks: List[str]
    research: str
    final_report: str

    