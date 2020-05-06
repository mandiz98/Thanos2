#include "autopilot.h"

#define M_STOP      'b'
#define M_FORWARD   '1'
#define M_LEFT      '2'
#define M_RIGHT     '3'
#define M_REVERSE   '4'

void ultrasonicSensor();

void manualMode(char sentDriveCommand)
{
    switch (sentDriveCommand)
    {
    case M_STOP:
        //m_driver.stop();
        driver.stop();
        break;
    case M_FORWARD:
        //m_driver.Drive(180);
        driver.Drive(180);
        break;
    case M_LEFT:
        //m_driver.Turn(LEFT);
        driver.Turn(LEFT);
        break;
    case M_RIGHT:
        //m_driver.Turn(RIGHT);
        driver.Turn(RIGHT);
        break;
    case M_REVERSE:
        //m_driver.Drive(-180);
        driver.Drive(-180);
        break;
    default:
        break;
    }
    //ultrasonicSensor();
}

/*void ultrasonicSensor()
{
    if(m_us.distanceCm() < 10)
    {
        Serial.print("1,5,7");
        m_driver.Drive(-90);
        delay(300);
        m_driver.stop();
    }
}*/