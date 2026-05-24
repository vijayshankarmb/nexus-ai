from time import time

def start_time():
    return time()

def end_time(start_time):
    return round(time() - start_time, 2)
