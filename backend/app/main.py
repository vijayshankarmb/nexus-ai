from fastapi import FastAPI
from app.agents.planner import planner_agent
from app.graph.workflow import graph
from app.tools.web_search import web_search_tool

app = FastAPI()

@app.get("/")
async def root():
    results = web_search_tool(
        "latest AI agent frameworks"
    )
    return results
    
@app.get("/test")
async def test():

    result = graph.invoke({
        "query": "Latest AI agent frameworks",
        "plan": "",
        "research": "",
        "final_report": "",
        "retry_count": 0
    })

    return result


