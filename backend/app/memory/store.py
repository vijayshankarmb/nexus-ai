import json
import os

BASE_DIR = os.path.dirname(__file__)

MEMORY_FILE = os.path.join(BASE_DIR, "reports.json")

def save_report(report):

    try:
        if not os.path.exists(MEMORY_FILE):
            with open(MEMORY_FILE, "w", encoding="utf-8") as file:
                json.dump([], file)

        with open(MEMORY_FILE, "r", encoding="utf-8") as file:
            reports = json.load(file)

        reports.append(report)

        with open(MEMORY_FILE, "w", encoding="utf-8") as file:
            json.dump(reports, file, indent=4, ensure_ascii=False)

    except Exception as e:
        print("ERROR:", e)

