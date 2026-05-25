from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.graph.workflow import graph
import json

router = APIRouter()

async def event_stream(query, session_id):

    initial_state = {
        "query": query,
        "search_tasks": [],
        "research": "",
        "final_report": "",
        "retry_count": 0,
        "session_id": session_id,
        "events": []
    }

    async for chunk in graph.astream(initial_state):

        yield f"data: {json.dumps(chunk, default=str)}\n\n"

@router.get("/research/stream")
async def research_stream(query: str, session_id: str):

    return StreamingResponse(
        event_stream(query, session_id),
        media_type="text/event-stream"
    )
