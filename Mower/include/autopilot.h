#include <MeLineFollower.h>
#include <MeUltrasonicSensor.h>
#include <MotorCommands.h>

void sendToBackend(int state);

MeUltrasonicSensor us(PORT_10);
MeLineFollower lf(PORT_9);
MotorCommands driver;

MeGyro gyroscope(1, 0x69);
double xCoord = 0;
double yCoord = 0;
double sendCounter = 0;
double angle = 0;
double distance = 0;

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
    if (!sendCounter)
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

  case POLL_US:
    if (us.distanceCm() < 40)
      autopilotMode = OBSTACLE_DETECTED;
    else
      autopilotMode = POLL_LINE;
    break;

  case POLL_LINE:
    if (lf.readSensors() != 3)
      autopilotMode = LINE_DETECTED;
    else
      autopilotMode = START;
    break;

  case OBSTACLE_DETECTED:
    driver.stop();
    delay(100);
    autopilotMode = REVERSE;
    sendToBackend(1);
    break;

  case LINE_DETECTED:
    driver.stop();
    sendToBackend(1);
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
    delay(1000);
    autopilotMode = START;
    break;

  case TURN_RIGHT:
    driver.Turn(RIGHT);
    delay(1000);
    autopilotMode = START;
    break;

  case REVERSE:
    driver.Drive(-90);
    distance -= 2;
    delay(300);
    autopilotMode = TURN_LEFT;
    break;

  case AP_STOP:

  default:
    break;
  }
  xCoord += cos(angle) * distance;
  yCoord += sin(angle) * distance;
  gyroscope.fast_update();
  angle = (gyroscope.getAngleZ() * (PI / 180));
}

void sendToBackend(int state)
{
  delay(1);
  Serial.print(state);
  Serial.print(",");
  Serial.print(xCoord);
  Serial.print(",");
  Serial.println(yCoord);
}