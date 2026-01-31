#include <Servo.h>

Servo servo1;  // create Servo object to control a servo
Servo servo2;

void setup() {
  servo1.attach(9);  // attaches the servo on pin 9 to the Servo object
  servo2.attach(8);
}

void loop() {
  // servo1.write(0);
  // servo2.write(0);
}