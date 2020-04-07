#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include "MeAuriga.h"
#include <MotorCommands.h>

#define BUZZER_PORT 45

//includes and port mapping for the makeblock library.
MeBuzzer buzzer(BUZZER_PORT);
MeUltrasonicSensor us(PORT_10);
MeBluetooth bt(PORT_3);
MotorCommands driver;


void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  bt.begin(115200);
}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available())
  {
    char x = Serial.read();
    if(x == '1')
      {
        driver.Drive(180);
        buzzer.tone(BUZZER_PORT, 440, 100);
        
      }
    else if(x == '2')
      {
        
      }
      
    else if(x == '3')
    {
      
    }

    else if(x == '4')
    {
      driver.Drive(-180);
    }

    else if(x == '5')
    {
      driver.stop();
    }   
  }
}