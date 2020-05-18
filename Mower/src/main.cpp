/** 
 * main.cpp
 * main file for the mower.
 * property of project group Thanos2
 * Written by Edvin Egerhag and Filip Carlsson
*/

//includes
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include "MeAuriga.h"
#include <Jukebox.h>
#include <MeGyro.h>
#include "manual.h"

//variables needed during execution
Jukebox jukebox;              //glorified horn
byte x;                       //commands from the app is stored here
bool manualStartFlag = false; //used when checking if it is the first time we enter the manual mode state machine

//used in the state machine to determine what mode to enter
enum DRIVE_MODE
{
  DM_STOP,
  AUTOPILOT,
  MANUAL
};
DRIVE_MODE CURRENT_MODE = DM_STOP;

//function declarations
void autopilot(void);
void manualMode(char x);

// put your setup code here, to run once:
void setup()
{
  Serial.begin(115200); //open a serial port for communication
  gyroscope.begin();    //starting gyroscope
  delay(100);
}

// put your main code here, to run repeatedly:
void loop()
{
  if (Serial.available())
  {
    x = Serial.read(); //reading command from app
    x = char(x);

    //set the mower to correct mode depending on command from app
    if (x == 'a')
    {
      CURRENT_MODE = AUTOPILOT;
      autopilotMode = START;
    }

    else if(x == 'm')
    {
      CURRENT_MODE = MANUAL;
      manualStartFlag = true;
    }
    
    else if (x == '6')
    {
      driver.stop();
      jukebox.play(DESPACITO);
    }
    else if (x == 's')
      CURRENT_MODE = DM_STOP;
    delay(1);
  }

  //State machine that executes the code depending on what mode it is in
  switch (CURRENT_MODE)
  {
  case DM_STOP:
    driver.stop();
    break;

  case AUTOPILOT:
    autopilot();
    break;

  case MANUAL:
    if(manualStartFlag) //if we come from autopilot mode to manual mode we want to stop the mower before we drive manually
    {
      driver.stop();
      manualStartFlag = false;
    }
    manualMode(x); //sends command from app to manual drive function 
    break;

  default:
    break;
  }
}
