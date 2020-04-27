#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include "MeAuriga.h"
#include <MotorCommands.h>
#include <Jukebox.h>

//includes and port mapping for the makeblock library.
MeUltrasonicSensor us(PORT_10);
MotorCommands driver;
MeLineFollower lf(PORT_9); //Sensor1 sitter till vänster
Jukebox jukebox;

enum AUTOPILOT_SM
{
  START,
  POLL_US,
  POLL_LINE,
  OBSTACLE_DETECTED,
  LINE_DETECTED,
  TURN_LEFT,
  TURN_RIGHT,
  REVERSE,
  AP_STOP
};
AUTOPILOT_SM autopilotMode = START;

enum DRIVE_MODE
{
  DM_STOP,
  AUTOPILOT,
  MANUAL
};
DRIVE_MODE CURRENT_MODE = DM_STOP;

void autopilot(void);
int lineSensorPoll(void);

// put your setup code here, to run once:
void setup()
{
  Serial.begin(115200);
}

// put your main code here, to run repeatedly:
void loop()
{
  //use serial read to determine mode, use switch case to set mower to correct mode, variable CURRENT_MODE
  if (Serial.available())
  {
    String x = "0,3,5";
    //Serial.print("Dank number: 420");
    Serial.println(x);
    delay(5000);
    //Serial.println((us.distanceCm() < 10));
    //delay(200);
    //byte x = Serial.read();
    //x = char(x);
    /*if (x == '1')
    {
      //driver.Drive(180);
      CURRENT_MODE = AUTOPILOT;
      autopilotMode = START;
    }*/
    /*else if (x == '2')
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
      CURRENT_MODE = STOP;
    }

    else if (x == '3')
    {
      //driver.Turn(RIGHT);
      for (int i = 90; i <= 180; i = i + 10)
      {
        driver.test(i);
        Serial.print("sending ");
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
    }*/
    /*else if (x == '6')
     CURRENT_MODE = DM_STOP;*/

  
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

void autopilot(void)
{
  switch (autopilotMode)
  {
  case START:
    driver.Drive(180);
    autopilotMode = POLL_US;
    break;

  case POLL_US:
    if (us.distanceCm() < 10)
      autopilotMode = OBSTACLE_DETECTED;
    else 
      autopilotMode = POLL_LINE;
    break;

  case POLL_LINE:
    if(lf.readSensors() != 3)
      autopilotMode = LINE_DETECTED;
    else
      autopilotMode = START;    
    break;

  case OBSTACLE_DETECTED:
    driver.stop();
    autopilotMode = REVERSE;
    break;

  case LINE_DETECTED:
    driver.stop();
    switch (lf.readSensors())
    {
    case 0:
      autopilotMode = REVERSE;
      break;

    case 1:
      autopilotMode = TURN_RIGHT;
      break;

    case 2:
      autopilotMode = TURN_LEFT;
      break;

    case 3:
      autopilotMode = START;
      break;
    
    default:
      break;
    }
    break;

  case TURN_LEFT:
    driver.Turn(LEFT);
    delay(400);
    //poll again maybe? use a flag to determine if the polling should continue
    autopilotMode = START;
    break;

  case TURN_RIGHT:
    driver.Turn(RIGHT);
    delay(400);
    //poll again maybe? use a flag to determine if the polling should continue
    autopilotMode = START;
    break;

  case REVERSE:
    driver.Drive(-90);
    delay(500);
    autopilotMode = TURN_LEFT;
    break;

  case AP_STOP:

  default:
    break;
  }
}
