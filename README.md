# Nexus AI

Production-grade multi-agent AI research system built with FastAPI, LangGraph, Gemini, PostgreSQL, and Docker.

Nexus AI orchestrates autonomous research workflows using specialized AI agents, tool calling, web search integration, and streaming responses to generate structured research outputs in real time.

Designed with production backend architecture principles including modular services, persistent storage, async streaming, cloud-native deployment, and containerized infrastructure.

---

# Overview

Nexus AI is a backend-focused multi-agent AI platform that simulates an autonomous research workflow.

Instead of relying on a single prompt-response interaction, the system coordinates multiple AI agents through a LangGraph execution pipeline where each agent performs a specialized task such as:

- Query analysis
- Research planning
- Web information gathering
- Context aggregation
- Report generation
- Final summarization

The platform supports real-time streaming responses, tool calling, persistent report storage, and production-ready deployment using Docker.

---

# Core Capabilities

## Multi-Agent Orchestration

Built using LangGraph to coordinate multiple AI agents through a stateful execution graph.

Agents operate independently while sharing structured state across the workflow.

### Current Agent Pipeline

- Research Planner Agent
- Web Search Agent
- Context Collection Agent
- Summarizer Agent

---

## Tool Calling + Web Search

Integrated tool-calling architecture allows agents to dynamically invoke external tools during execution.

Current tools include:

- Real-time web search
- External context retrieval

---

## Streaming AI Responses

Implements asynchronous token streaming for real-time response generation.

Supports ChatGPT-style incremental output delivery using FastAPI streaming responses.

---

## Persistent Research Storage

Research reports and session outputs are stored in PostgreSQL using SQLAlchemy ORM.

Supports:
- Session persistence
- Historical report retrieval
- Structured report storage

---

## Cloud-Native Infrastructure

The system is designed around cloud-first infrastructure principles.

External services:
- Gemini API for LLM inference
- Neon PostgreSQL for managed database hosting

---

## Containerized Deployment

Backend infrastructure is fully containerized using Docker for reproducible deployments across environments.

Supports deployment to:
- Render
- Railway
- AWS
- VPS infrastructure

---

# System Architecture

```text
                ┌─────────────────────┐
                │     Frontend UI     │
                └─────────┬───────────┘
                          │
                          ▼
                ┌─────────────────────┐
                │    FastAPI Server   │
                └─────────┬───────────┘
                          │
                          ▼
                ┌─────────────────────┐
                │   LangGraph Engine  │
                └─────────┬───────────┘
                          │
      ┌───────────────────┼───────────────────┐
      ▼                   ▼                   ▼
┌──────────────┐  ┌──────────────┐  ┌────────────────┐
│ Planner Agent│  │ Search Agent │  │ Summary Agent  │
└──────┬───────┘  └──────┬───────┘  └────────┬───────┘
       │                 │                   │
       ▼                 ▼                   ▼
 ┌───────────┐    ┌────────────┐      ┌─────────────┐
 │ Gemini API│    │ Web Search │      │ PostgreSQL  │
 └───────────┘    └────────────┘      └─────────────┘
```

---

# Tech Stack

## Backend

- Python
- FastAPI
- LangGraph
- LangChain
- SQLAlchemy
- Pydantic

---

## AI Infrastructure

- Gemini 3.1 Flash Lite
- Tool Calling
- Streaming Responses
- Agentic Workflows

---

## Database

- PostgreSQL
- Neon Database Platform

---

## Deployment & Infrastructure

- Docker
- Render

---

# Project Structure

```bash
backend/
│
├── app/
│   ├── agents/          # AI agents
│   ├── graph/           # LangGraph workflow
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── models/          # SQLAlchemy models
│   ├── database/        # Database configuration
│   ├── schemas/         # Pydantic schemas
│   └── main.py          # FastAPI entrypoint
│
├── requirements.txt
├── Dockerfile
├── .env
└── README.md
```

---

# Environment Variables

Create a `.env` file in the backend root.

```env
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_postgresql_connection_url
```

---

# Local Development Setup

## Clone Repository

```bash
git clone https://github.com/vijayshankarmb/nexus-ai.git
cd nexus-ai/backend
```

---

## Create Virtual Environment

### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv .venv
source .venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Run Development Server

```bash
uvicorn app.main:app --reload
```

Server:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

---

# Docker Deployment

## Build Docker Image

```bash
docker build -t nexus-ai .
```

---

## Run Docker Container

```bash
docker run --env-file .env -p 8000:8000 nexus-ai
```

---

# API Endpoints

## Health Check

```http
GET /health
```

---

## Research Pipeline

```http
POST /research
```

Executes the multi-agent research workflow and streams generated output.

---

# Production Features

- Multi-agent orchestration
- Stateful workflow execution
- Async streaming responses
- Tool calling support
- Persistent storage
- Cloud database integration
- Dockerized infrastructure
- Modular backend architecture
- Production deployment ready

---

# Roadmap

## Planned Improvements

- Retrieval-Augmented Generation (RAG)
- PDF ingestion pipeline
- Authentication & RBAC
- Redis caching layer
- Background task workers
- Vector database integration
- Agent memory systems
- Observability & tracing
- Multi-user workspace support
- Report export system

---

# Deployment

The backend is production-ready and can be deployed using Docker on platforms such as:

- Render
- Railway
- AWS ECS
- DigitalOcean
- VPS Infrastructure

---

# Author

Vijay Shankar M B

GitHub:
https://github.com/vijayshankarmb

Portfolio:
https://vijayx.in

---

# License

MIT License