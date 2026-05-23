from tavily import TavilyClient
from dotenv import load_dotenv
import os

load_dotenv()

tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

def web_search_tool(query: str) -> str:
    response = tavily_client.search(
        query=query,
        max_results=3
    )
    return response['results']

