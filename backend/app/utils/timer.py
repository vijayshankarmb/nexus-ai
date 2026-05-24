from time import time

def start_timer():
    return time()

def end_timer(start_time):
    return round(time() - start_time, 2)
