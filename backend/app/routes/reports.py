from fastapi import APIRouter
from app.db.database import SessionLocal
from app.models.report import Report

router = APIRouter()

@router.get("/reports")
def get_reports():

    db = SessionLocal()

    try:
        reports = (
            db.query(Report)
            .order_by(Report.created_at.desc())
            .all()
        )

        result = []

        for report in reports:
            result.append({
                "id": report.id,
                "session_id": report.session_id,
                "query": report.query,
                "created_at": report.created_at
            })

        return result

    finally:
        db.close()


@router.get("/reports/{session_id}")
def get_reports_by_session(session_id: str):

    db = SessionLocal()

    try:
        reports = (
            db.query(Report)
            .filter(Report.session_id == session_id)
            .order_by(Report.created_at.asc())
            .all()
        )

        result = []

        for report in reports:
            result.append({
                "id": report.id,
                "session_id": report.session_id,
                "query": report.query,
                "content": report.content,
                "created_at": report.created_at
            })

        return result

    finally:
        db.close()
