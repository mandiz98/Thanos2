#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include "MeAuriga.h"
#include <MotorCommands.h>
#include <Jukebox.h>

//includes and port mapping for the makeblock library.
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
    byte x = Serial.read();
    x = char(x);
    if (x == '1')
    {
      driver.Drive(180);
    }
    else if (x == '2')
    {
      //driver.Turn(LEFT);
      for(int i = 90; i >= 0; i = i - 10)
      {
        driver.test(i);
        Serial.print("sending " );
        Serial.println(i);
        delay(2000);
      }

      driver.stop();
    }

    else if (x == '3')
    {
      //driver.Turn(RIGHT);
      for(int i = 90; i <= 180; i = i + 10)
      {
        driver.test(i);
        Serial.print("sending " );
        Serial.println(i);
        delay(1000);
      }

      driver.stop();
    }

    else if (x == '4')
    {
      driver.Drive(-180);
    }

    else if (x == '5')
    {
      driver.stop();
      jukebox.play(BASICBITCH);
    }
    else if (x == '6')
      jukebox.play(DESPACITO);
  }
}
