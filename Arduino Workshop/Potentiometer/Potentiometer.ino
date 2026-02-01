const int potPin     = A3;
const int buttonPin  = 6;

const int led1Pin    = 2;
const int led2Pin    = 3;
const int led3Pin    = 4;

int blinkState = 0;            // 0 = slow, 1 = fast
bool lastButtonState = HIGH;   // assumes pull-up
unsigned long lastToggle = 0;  // for blink timing
unsigned long blinkInterval = 500;   // default slow blink
bool ledOn = false;                 // current LED state


void setup() {
  pinMode(buttonPin, INPUT_PULLUP);

  pinMode(led1Pin, OUTPUT);
  pinMode(led2Pin, OUTPUT);
  pinMode(led3Pin, OUTPUT);

  digitalWrite(led1Pin, LOW);
  digitalWrite(led2Pin, LOW);
  digitalWrite(led3Pin, LOW);
}


void loop() {

  // ---------------------------------------------------------
  // 1. READ POTENTIOMETER → Select which LED is active
  // ---------------------------------------------------------
  int potValue = analogRead(potPin);

  int activeLED;

  if (potValue < 341) {
    activeLED = led1Pin;
  } 
  else if (potValue < 682) {
    activeLED = led2Pin;
  } 
  else {
    activeLED = led3Pin;
  }


  // Turn off all LEDs before blinking the active one
  digitalWrite(led1Pin, LOW);
  digitalWrite(led2Pin, LOW);
  digitalWrite(led3Pin, LOW);


  // ---------------------------------------------------------
  // 2. BUTTON PRESS → Toggle blink rate state
  // ---------------------------------------------------------
  bool buttonState = digitalRead(buttonPin);

  if (buttonState == LOW && lastButtonState == HIGH) {
    blinkState = !blinkState;   // Toggle state
    delay(20);                  // debounce
  }

  lastButtonState = buttonState;


  // Set blink interval based on state
  if (blinkState == 0) {
    blinkInterval = 600;        // Slow blink
  } else {
    blinkInterval = 200;        // Fast blink
  }


  // ---------------------------------------------------------
  // 3. BLINK ACTIVE LED using non-blocking millis()
  // ---------------------------------------------------------
  unsigned long currentTime = millis();

  if (currentTime - lastToggle >= blinkInterval) {
    ledOn = !ledOn;       // Toggle LED state
    lastToggle = currentTime;
  }

  digitalWrite(activeLED, ledOn ? HIGH : LOW);
}
