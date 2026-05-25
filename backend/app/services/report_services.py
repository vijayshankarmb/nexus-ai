from app.db.database import SessionLocal
from app.models.report import Report

def save_report_to_db(session_id, query, content):
    db = SessionLocal()
    try:
        db.add(Report(session_id=session_id, query=query, content=content))
        db.commit()
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

def load_report_from_db(session_id):
    db = SessionLocal()
    try:
        reports = db.query(Report).filter(Report.session_id == session_id).order_by(Report.id.desc()).limit(3).all()
        return [report.content for report in reversed(reports)]
    finally:
        db.close()
