import json
import os

BASE_DIR = os.path.dirname(__file__)

def get_memory_file(session_id):

    os.makedirs(f"{BASE_DIR}/reports", exist_ok=True)

    return f"{BASE_DIR}/reports/{session_id}.json"

def save_report(session_id, report):

    try:
        file = get_memory_file(session_id)
        if not os.path.exists(file):
            with open(file, "w", encoding="utf-8") as f:
                json.dump([], f)

        with open(file, "r", encoding="utf-8") as f:
            reports = json.load(f)

        reports.append(report)

        with open(file, "w", encoding="utf-8") as f:
            json.dump(reports, f, indent=4, ensure_ascii=False)

    except Exception as e:
        print("ERROR:", e)

def load_reports(session_id):
    file = get_memory_file(session_id)
    if not os.path.exists(file):
        return []
    
    with open(file, "r", encoding="utf-8") as f:
        reports = json.load(f)
    return reports[-3:]

