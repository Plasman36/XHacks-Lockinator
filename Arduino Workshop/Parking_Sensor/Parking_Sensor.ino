// Ultrasonic Sensor Pins
const int trigPin = 11;   // e.g., 9
const int echoPin = 10;   // e.g., 10

// LED Pins
const int greenLED  = 2; 
const int yellowLED = 3; 
const int redLED    = 4;

// Buzzer Pin
const int buzzerPin = 6;


// ----------------------------------------
// Setup
// ----------------------------------------
void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  pinMode(greenLED, OUTPUT);
  pinMode(yellowLED, OUTPUT);
  pinMode(redLED, OUTPUT);

  pinMode(buzzerPin, OUTPUT);
  digitalWrite(buzzerPin, LOW);

  
  // Default all outputs OFF, will activate based on conditions
  digitalWrite(greenLED, LOW);
  digitalWrite(yellowLED, LOW);
  digitalWrite(redLED, LOW);
  digitalWrite(buzzerPin, LOW);
}


// ----------------------------------------
// Distance Measurement Function
// ----------------------------------------
float getDistanceCM() {
  // Send trigger pulse
	digitalWrite(trigPin, LOW);  
	delayMicroseconds(2);  
	digitalWrite(trigPin, HIGH);  
	delayMicroseconds(10);  
	digitalWrite(trigPin, LOW); 

  // Measure echo time
  long duration = pulseIn(echoPin, HIGH);

  // Convert to distance (cm)
  float distance = (duration * 0.0343) / 2.0;
  return distance;
}


// ----------------------------------------
// Main Loop
// ----------------------------------------
void loop() {
  float dist = getDistanceCM();

  // Control logic based on distance
  if (dist > 15) {
    // All lights ON, buzzer OFF
    digitalWrite(greenLED, HIGH);
    digitalWrite(yellowLED, HIGH);
    digitalWrite(redLED, HIGH);
    digitalWrite(buzzerPin, LOW);

  } else if (dist > 10 && dist <= 15) {
    // Green only
    digitalWrite(greenLED, HIGH);
    digitalWrite(yellowLED, LOW);
    digitalWrite(redLED, LOW);
    digitalWrite(buzzerPin, LOW);    

  } else if (dist > 5 && dist <= 10) {
    // Yellow only
    digitalWrite(yellowLED, HIGH);
    digitalWrite(greenLED, LOW);
    digitalWrite(redLED, LOW);
    digitalWrite(buzzerPin, LOW);

  } else if (dist > 2 && dist <= 5) {
    // Red only
    digitalWrite(redLED, HIGH);
    digitalWrite(yellowLED, LOW);
    digitalWrite(greenLED, LOW);
    digitalWrite(buzzerPin, LOW);

  } else if (dist <= 2) {
    // Red + Buzzer
    digitalWrite(redLED, HIGH);
    digitalWrite(buzzerPin, HIGH);
    digitalWrite(yellowLED, LOW);
    digitalWrite(greenLED, LOW);
  }

  delay(50); // stability
}
