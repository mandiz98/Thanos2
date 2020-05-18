/** 
 * autopilot.h
 * This file handles the autopilot mode for the mower.
 * property of project group Thanos2
 * Written by Edvin Egerhag and Filip Carlsson
*/

//includes, needed to control motors and read sensors.
#include <MeLineFollower.h>
#include <MeUltrasonicSensor.h>
#include <MotorCommands.h>

//function declaration
void sendToBackend(int state);

//variables that control sensors and motors
MeUltrasonicSensor us(PORT_10);
MeLineFollower lf(PORT_9);
MotorCommands driver;
MeGyro gyroscope(1, 0x69);

//variables to determine position in order to send coordinates to backend
double xCoord = 0;
double yCoord = 0;
double sendCounter = 0;
double angle = 0;
double distance = 0;

//used in the statemachine
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

//this function executes the autopilot driving
void autopilot()
{
  switch (autopilotMode)
  {
  case START:
    if (!sendCounter) //while driving forward we send updates to backend once every 30 iteration to avoid the serial port potentially blocking 
    {
      sendToBackend(0);
      distance += 1;
    }
    sendCounter += 1;
    if (sendCounter > 30)
      sendCounter = 0;

    driver.Drive(180);
    autopilotMode = POLL_US;
    break;

  case POLL_US: //check if there is an obstacle, if not we continue to checking for a black line
    if (us.distanceCm() < 40)
      autopilotMode = OBSTACLE_DETECTED;
    else
      autopilotMode = POLL_LINE;
    break;

  case POLL_LINE: //check if there is a line, if not we return to driving forward
    if (lf.readSensors() != 3)
      autopilotMode = LINE_DETECTED;
    else
      autopilotMode = START;
    break;

  case OBSTACLE_DETECTED: //if we detect an obstacle, we stop and send the position to backend
    driver.stop();
    delay(100);
    autopilotMode = REVERSE;
    sendToBackend(1);
    break;

  case LINE_DETECTED: //if we detect a line, we stop and send the position to backend
    driver.stop();
    sendToBackend(1);
    //handle collision depending on were we detect the line (to the left, right or in front of us)
    switch (lf.readSensors())
    {
    case 0: //if in front, we go back
      autopilotMode = REVERSE;
      break;

    case 1: //if to the left, we turn right
      autopilotMode = TURN_RIGHT;
      break;

    case 2: //if to the right, we turn left
      autopilotMode = TURN_LEFT;
      break;

    case 3: //if no line detected, we go forward
      autopilotMode = START;
      break;

    default:
      break;
    }
    break;

  case TURN_LEFT: //turn left one second, then go forward
    driver.Turn(LEFT);
    delay(1000);
    autopilotMode = START;
    break;

  case TURN_RIGHT: //turn right one second, then go forward
    driver.Turn(RIGHT);
    delay(1000);
    autopilotMode = START;
    break;

  case REVERSE: //go backwards 300ms then turn left
    driver.Drive(-90);
    distance -= 2;
    delay(300);
    autopilotMode = TURN_LEFT;
    break;

  case AP_STOP:

  default:
    break;
  }
  //read coordinates and update the gyroscope
  xCoord += cos(angle) * distance;
  yCoord += sin(angle) * distance;
  gyroscope.fast_update();
  angle = (gyroscope.getAngleZ() * (PI / 180));
}

//send coordinates to backend, "state" is either a location or a collision
void sendToBackend(int state)
{
  delay(1);
  Serial.print(state);
  Serial.print(",");
  Serial.print(xCoord);
  Serial.print(",");
  Serial.println(yCoord);
}