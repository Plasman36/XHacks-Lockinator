#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <Servo.h>

// ---------------------------------------------------------
// USER: Insert your pins here
// ---------------------------------------------------------

#define DHTPIN     7      // e.g., 2
#define DHTTYPE    DHT11                 // or DHT22

const int coolingServoPin = 2;   // e.g., 9
const int heatingServoPin = 4;   // e.g., 10

// ---------------------------------------------------------
// Objects
// ---------------------------------------------------------
DHT dht(DHTPIN, DHTTYPE);
Servo coolingServo;
Servo heatingServo;


// ---------------------------------------------------------
// Setup
// ---------------------------------------------------------
void setup() {
  Serial.begin(9600);
  dht.begin();

  coolingServo.attach(coolingServoPin);
  heatingServo.attach(heatingServoPin);

  // Default to OFF positions
  coolingServo.write(0);
  heatingServo.write(0);

  Serial.begin(9600);
}


// ---------------------------------------------------------
// Main Loop
// ---------------------------------------------------------
void loop() {

  float t = dht.readTemperature();

  Serial.print(t);
  Serial.println();

  if (t > 25.0) {
    coolingServo.write(90);     // adjust to your cooling ON angle
    heatingServo.write(0);      // heater OFF position
  } 
  else {
    coolingServo.write(0);      // fan OFF
    heatingServo.write(90);     // heater ON position
  }

  delay(100);
}
