/** 
 * manual.h
 * manual driving mode.
 * property of project group Thanos2
 * Written by Edvin Egerhag and Filip Carlsson
*/

// include to access motorCommands
#include "autopilot.h"

//defines
#define M_STOP      'b'
#define M_FORWARD   '1'
#define M_LEFT      '2'
#define M_RIGHT     '3'
#define M_REVERSE   '4'

void manualMode(char sentDriveCommand) //receives command from app and executes 
{
    switch (sentDriveCommand)
    {
    case M_STOP:
        driver.stop();
        break;
    case M_FORWARD:
        driver.Drive(180);
        break;
    case M_LEFT:
        driver.Turn(LEFT);
        break;
    case M_RIGHT:
        driver.Turn(RIGHT);
        break;
    case M_REVERSE:
        driver.Drive(-180);
        break;
    default:
        break;
    }
    
}

