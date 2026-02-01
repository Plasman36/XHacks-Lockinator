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

if __name__ == "__main__":
    
    workApp = True
    while workApp:
        app_info = get_active_window()
        print(f"App: {app_info['process']}, Title: {app_info['title']}")
        currentApp = app_info['process']
        match currentApp:
            case "steamwebhelper.exe" | "Minecraft.exe":
                print("no no app")
                workApp = False
            case _:
                pass
        time.sleep(5)  # Check every 5 seconds

    # Send signal that an blacklisted app was detected