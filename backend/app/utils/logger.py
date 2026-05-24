from datetime import datetime

def log_node_start(node_name: str):
    print(f"\n[{datetime.now()}] START: {node_name}")

def log_node_end(node_name: str):
    print(f"[{datetime.now()}] END: {node_name}\n")

def log_info(message: str):
    print(f"[INFO] {message}")

