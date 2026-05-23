from fastapi import FastAPI
from app.agents.planner import planner_agent
from app.graph.workflow import graph

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Nexus AI Backend is running!"}

@app.get("/test")
async def test():

    result = graph.invoke({
        "query": "Latest AI agent frameworks",
        "plan": "",
        "research": "",
        "final_report": ""
    })

    return result


