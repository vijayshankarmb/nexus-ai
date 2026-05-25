from sqlalchemy import Column, Integer, String, Text, DateTime
from app.db.database import Base
from datetime import datetime

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True)
    query = Column(String)
    content = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

