#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include "MeAuriga.h"
#include <MotorCommands.h>
#include <Jukebox.h>

#define BUZZER_PORT 45

//includes and port mapping for the makeblock library.
MeBuzzer buzzer(BUZZER_PORT);
MeUltrasonicSensor us(PORT_10);
MotorCommands driver;
Jukebox jukebox;

// put your setup code here, to run once:
void setup()
{
  Serial.begin(115200);
}

 // put your main code here, to run repeatedly:
void loop()
{
  if (Serial.available())
  {
    //Serial.write("Hej erik");
    //delay(100);
    byte x = Serial.read();
    x = char(x);
    if (x == '1')
    {
      //laCucaracha();
      driver.Drive(280);
    }
    else if (x == '2')
    {
      driver.Turn(LEFT);
    }

    else if (x == '3')
    {
      driver.Turn(RIGHT);
    }

    else if (x == '4')
    {
      driver.Drive(-180);
    }

    else if (x == '5')
    {
      driver.stop();
    }
    else if(x == '6')
      jukebox.play(VITAELUX);
  }
}
