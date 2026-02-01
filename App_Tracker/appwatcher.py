import win32gui
import win32process
import psutil
import time

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
    #Load blacklisted apps from file and add .exe extension
    try:
        with open(filename, 'r') as f:
            # Read lines, strip whitespace, add .exe, ignore empty lines
            apps = [line.strip() + ".exe" for line in f if line.strip()]
        return apps
    except FileNotFoundError:
        print(f"Warning: {filename} not found. Using empty blacklist.")
        return []

if __name__ == "__main__":
    
    workApp = True
    while workApp:
        blacklist = load_blacklist()
        app_info = get_active_window()
        print(f"App: {app_info['process']}, Title: {app_info['title']}")
        currentApp = app_info['process']
        if currentApp in blacklist:
            print("Blacklisted app detected!")
            workApp = False

        time.sleep(5)  # Check every 5 seconds

    # Send signal that an blacklisted app was detected