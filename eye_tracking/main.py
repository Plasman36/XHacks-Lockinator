# ---------- INFORMATION ----------
# 
# Patrick Trieu
# 301636710
# pht3@sfu.ca
#
# ---------- TOOLS ----------

import cv2 # OpenCV: webcam input, image processing
# import mediapipe as mp # MediaPipe: pre-built face and head detection

import time # Built in Python: for measuring "distraction" duration

# ---------- PROGRAMMING ----------

# set up face detector
# face_detection = mp.solutions.face_detection.FaceDetection(
#     min_detection_confidence=0.6
# )

# open webcam
cap = cv2.VideoCapture(1) # laptop webcam index is 1, not 0

# capture frames in a loop
while True:
    ret, frame = cap.read() # returns a tuple (bool, img_matrix)
    if not ret: # ret = True if successful
        break

    # rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) # convert BGR frame to RGB frame for mp
    # face_test = face_detection.process(rgb_frame) # feed rgb_frame to face detector

    # if face_test.detections: # .detections checks list of detected faces, True if non-empty
    #     print("face detected")
    # else:
    #     print("no face detected")

    # display frame
    cv2.imshow("test", frame)

    # wait 25ms and check if 'q' is pressed to quit
    if cv2.waitKey(25) & 0xFF == ord('q'): 
        break

cap.release() # close webcam
cv2.destroyAllWindows() # close display window

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


