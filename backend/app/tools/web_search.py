import os
from tavily import TavilyClient
from dotenv import load_dotenv
from app.mock.search_results import MOCK_RESULTS

load_dotenv()

USE_MOCK = True

tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

def web_search_tool(query: str) -> str:
    if USE_MOCK:
        return MOCK_RESULTS
    response = tavily_client.search(
        query=query,
        max_results=3
    )
    return response['results']

