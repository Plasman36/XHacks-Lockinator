from flask import Flask, request, jsonify
from flask_cors import CORS
import serial
import time

app = Flask(__name__)
CORS(app)  # allow Chrome extension to POST

# Replace with your Arduino COM port and baud
SERIAL_PORT = "COM7"
BAUD_RATE = 9600

# open the serial port
arduino = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
time.sleep(2)  # wait for Arduino to reset

@app.route("/set", methods=["POST"])
def set_value():
    data = request.json
    value = data.get("value", "")
    print("Received from Chrome:", value)

    if value == "torture_on":
        arduino.write(b"1\n")  # send 1 as boolean ON
    elif value == "torture_off":
        arduino.write(b"0\n")  # send 0 as boolean OFF

    arduino.flush()
    return jsonify({"status": "ok"})

@app.route("/get", methods=["GET"])
def get_value():
    return jsonify({"value": "ok"})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
