#include <Servo.h>

Servo servo1;  // create Servo object to control a servo
Servo servo2;

void setup() {
  servo1.attach(6);
  servo2.attach(7);
}

void loop() {
  for(int i = 0; i < 8; i++){
      servo1.write(90);
      delay(1600);
      servo1.write(115);
      delay(200);
  }
  delay(2000);
  for(int i = 0; i < 8; i++){
    servo2.write(90);
    delay(1600);
    servo2.write(75);
    delay(200);
  }
}