from fastapi import FastAPI
from app.agents.planner import planner_agent
from app.graph.workflow import graph
from app.tools.web_search import web_search_tool
from app.utils.fallbacks import fallback_response
from app.routes import research
from app.routes import reports
from fastapi.middleware.cors import CORSMiddleware
from app.core.init_db import init_db

init_db()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://nexus-ai.vijayx.in"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(research.router)
app.include_router(reports.router)

@app.get("/")
async def root():
    results = web_search_tool(
        "latest AI agent frameworks"
    )
    return results
    
@app.get("/test")
async def test():
    try:
        result = await graph.ainvoke({
            "query": "Latest AI agent frameworks",
            "plan": "",
            "research": "",
            "final_report": "",
            "retry_count": 0,
            "session_id": "session_001"
        }, config={
            "configurable": {
                "thread_id": "test-thread"
            }
        })
    except Exception as e:
        return fallback_response()

    return result


