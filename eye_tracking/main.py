# ---------- INFORMATION ----------
# Patrick Trieu
# 301636710
# pht3@sfu.ca

# ---------- TOOLS ----------
import cv2 # OpenCV: webcam input, image processing
import mediapipe as mp # MediaPipe: pre-built face and head detection
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
import time # Built in Python: for measuring "distraction" duration

# ---------- FACE DETECTION SETUP ----------
BaseOptions = mp.tasks.BaseOptions
FaceDetector = mp.tasks.vision.FaceDetector
FaceDetectorOptions = mp.tasks.vision.FaceDetectorOptions
VisionRunningMode = mp.tasks.vision.RunningMode

model_path = "models/blaze_face_short_range.tflite"

latest_detections = []
def handle_result(result, output_image, timestamp_ms):
    global latest_detections
    latest_detections = result.detections

options = FaceDetectorOptions(
    base_options = BaseOptions(model_asset_path = model_path),
    running_mode = VisionRunningMode.LIVE_STREAM,
    result_callback = handle_result,
    min_detection_confidence = 0.6 # 60% confidence threshold
)

face_detector = FaceDetector.create_from_options(options) # detector instance

# ---------- WEBCAM SETUP ----------
cap = cv2.VideoCapture(1) # open webcam, laptop webcam index is 1, not 0
if not cap.isOpened():
    print("error: cannot open webcam")
    exit()

# ---------- FRAME LOOP ----------
while True:
    success, frame = cap.read() # returns a tuple (bool, img_matrix)
    if not success: # success = True if successful
        print("error: cannot grab frame")
        break

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) # convert BGR frame to RGB frame for mp
    
    mp_image = mp.Image(image_format = mp.ImageFormat.SRGB, data = rgb_frame)

    timestamp_ms = int(time.time() * 1000)
    # results = face_detector.detect_for_video(rgb_frame, timestamp_ms) # feed rgb_frame to face detector

    # if results.detections: # .detections checks list of detected faces, True if non-empty
    #     print("face detected")
    # else:
    #     print("no face detected")

    face_detector.detect_async(mp_image, timestamp_ms)

    if latest_detections:
        print("Face detected")
    else:
        print("No face detected")

    cv2.imshow("test window", frame) # display frames

    if cv2.waitKey(25) & 0xFF == ord('q'): # wait 25ms and check if 'q' is pressed to quit
        break

# ---------- CLEANUP ----------
cap.release() # close webcam
cv2.destroyAllWindows() # close display window
face_detector.close()

# ---------- REFERENCES ---------- 
# (in order of usage)
#
# basic cv2 syntax at vid start: https://www.youtube.com/watch?v=kbdbZFT9NQI
# opencv waitKey() function: https://www.geeksforgeeks.org/python/python-opencv-waitkey-function/
# videocapture not working using 0: https://www.reddit.com/r/opencv/comments/17glzkc/questionopencvpython_videocapture_seems_not/
# multi-line python comments: https://stackoverflow.com/questions/7696924/how-do-i-create-multiline-comments-in-python
# 

# ---------- CHATGPT RESOLUTIONS ----------
# (in order of occurence)
#
# "import mediapipe as mp" (legacy API) needed to be changed for face detector setup, since current mediapipe version
# was too recent and was incompatible with calling the attribute 'solutions'. This resulted in a number of changes to
# face detection programming.
#
#


