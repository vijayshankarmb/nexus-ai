from app.db.database import engine, Base
from app.models.report import Report

def init_db():
    Base.metadata.create_all(bind=engine)
    print("Database created successfully")


