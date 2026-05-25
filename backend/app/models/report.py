from sqlalchemy import Column, Integer, String, Text
from app.db.database import Base

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True)
    query = Column(String)
    content = Column(Text)

