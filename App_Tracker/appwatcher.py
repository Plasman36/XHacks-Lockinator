import win32gui
import win32process
import psutil
import time
import os
import serial

arduino = serial.Serial('COM7', 9600)
last_state = None

# Code from Claude.ai
def get_active_window():
    # Get the handle of the foreground window
    window = win32gui.GetForegroundWindow()
    
    # Get the window title
    window_title = win32gui.GetWindowText(window)
    
    # Get the process ID
    _, pid = win32process.GetWindowThreadProcessId(window)
    
    # Get the process name
    try:
        process = psutil.Process(pid)
        process_name = process.name()
    except:
        process_name = "Unknown"
    
    return {
        'title': window_title,
        'process': process_name,
        'pid': pid
    }

def load_blacklist(filename="blacklist.txt"):
    script_dir = os.path.dirname(os.path.abspath(__file__))  # directory of the script
    file_path = os.path.join(script_dir, filename)
    try:
        with open(file_path, 'r') as f:
            apps = [line.strip() for line in f if line.strip()]
        return apps
    except FileNotFoundError:
        print(f"Warning: {file_path} not found. Using empty blacklist.")
        return []

if __name__ == "__main__":
    
    while True:
        blacklist = load_blacklist()
        app_info = get_active_window()
        print(f"App: {app_info['process']}, Title: {app_info['title']}")
        currentApp = app_info['title']
        if currentApp in blacklist:
            print("Bad app detected!")
            state = "1\n"  # torture ON
        else:
            state = "0\n"  # torture OFF

        if state != last_state:
            arduino.write(state.encode())
            last_state = state
        
        time.sleep(1)

    # Send signal that an blacklisted app was detected