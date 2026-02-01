#include <Servo.h>

Servo servo1;  // create Servo object to control a servo
Servo servo2;

bool torture = false;

void setup() {
  servo1.attach(6);
  servo2.attach(7);

  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0) {
    String input = Serial.readStringUntil('\n');
    input.trim();

    if (input == "1" || input == "true" || input == "TRUE") {
      torture = true;
    } 
    else if (input == "0" || input == "false" || input == "FALSE") {
      torture = false;
    }
  }

  if(torture){
    torture = false;
    for(int i = 0; i < 18; i++){
    servo1.write(90);
    delay(100);
    servo1.write(120);
    delay(200);
    }
    servo1.write(90);
    delay(1000);
    for(int i = 0; i < 18; i++){
      servo2.write(90);
      delay(100);
      servo2.write(60);
      delay(200);
    }
    servo2.write(90);
  }
}