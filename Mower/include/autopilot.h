#include <MeLineFollower.h>
#include <MeUltrasonicSensor.h>
#include <MotorCommands.h>

MeUltrasonicSensor us(PORT_10);
MeLineFollower lf(PORT_9);
MotorCommands driver;

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

void autopilot()
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