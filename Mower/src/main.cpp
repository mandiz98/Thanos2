#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include "MeAuriga.h"
//#include <MotorCommands.h>
#include <Jukebox.h>
#include <MeGyro.h>
#include "autopilot.h"


Jukebox jukebox;
MeGyro gyroscope(1, 0x69);

enum DRIVE_MODE
{
  DM_STOP,
  AUTOPILOT,
  MANUAL
};
DRIVE_MODE CURRENT_MODE = DM_STOP;

void autopilot(void);

// put your setup code here, to run once:
void setup()
{
  Serial.begin(115200);
  gyroscope.begin();
  delay(100);
}

// put your main code here, to run repeatedly:
void loop()
{
  /*gyroscope.fast_update();
  double angle = gyroscope.getAngleZ();
  if(angle < 90 && angle > 0)
    driver.Turn(LEFT);
  else
    driver.stop();*/
  //use serial read to determine mode, use switch case to set mower to correct mode, variable CURRENT_MODE
  if (Serial.available())
  {
    //Serial.println(angle);   
    //Serial.println((us.distanceCm() < 10));
    //delay(200);
    byte x = Serial.read();
    x = char(x);
    if (x == '1')
    {
      //driver.Drive(180);
      CURRENT_MODE = AUTOPILOT;
      autopilotMode = START;
    }
    
    else if (x == '5')
    {
      driver.stop();
      jukebox.play(DESPACITO);
    }
    else if (x == '6')
     CURRENT_MODE = DM_STOP;

  
  }

  switch (CURRENT_MODE)
  {
  case DM_STOP:
    driver.stop();
    break;

  case AUTOPILOT:
    autopilot();
    break;

  default:
    break;
  }
}
