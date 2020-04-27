/** 
 * \class MotorCommands
 * \brief Class used to control the onboard motors on the mower
 * @file MotorCommands.cpp
 * @author Edvin Egerhag, Thanos2
 * @version 0.1
 * @date 07/04/2020
 * @brief source file for MotorCommands.h
 * 
 * \par Method list:
 * 
 *      1. void MotorCommands::Drive(int speed);
 *      2. void MotorCommands::stop();
 *      3. void MotorCommands::Turn(int direction);
*/
#include "MotorCommands.h"

MotorCommands::MotorCommands()
{
    _motor1.setPin(SLOT1);
    _motor2.setPin(SLOT2);
}

MotorCommands::~MotorCommands()
{
}

void MotorCommands::Drive(int speed)
{
    _motor1.setMotorPwm(-speed);
    _motor2.setMotorPwm(speed);
}

void MotorCommands::stop()
{
    _motor1.setMotorPwm(0);
    _motor2.setMotorPwm(0);
}

void MotorCommands::Turn(int direction)
{
    if (direction == LEFT)
    {
        _motor1.setMotorPwm(-150);
        _motor2.setMotorPwm(-150);
    }
    else if (direction == RIGHT)
    {
        _motor1.setMotorPwm(150);
        _motor2.setMotorPwm(150);
    }
    else
    {
        _motor1.setMotorPwm(0);
        _motor2.setMotorPwm(0);
    }
}

void MotorCommands::test(int turnAngle)
{
    if(turnAngle >= 0 && turnAngle < 180)
    {
        _motor1.setMotorPwm(-180);
        _motor2.setMotorPwm(180);
    }
    else
    {
        _motor1.setMotorPwm(180);
        _motor2.setMotorPwm(-180);
    }
    
    if(turnAngle < 90 && turnAngle >= 0)
    {
        if(turnAngle <= 30)
            _motor1.setMotorPwm(0);
        else
        {
            int turn = (90 - turnAngle) * 2;
            _motor1.setMotorPwm(-180 + turn);
        }
    }
    else if(turnAngle > 90 && turnAngle <=180)
    {
        if(turnAngle >= 150)
            _motor2.setMotorPwm(0);
        else
        {
            int turn = (turnAngle - 90) * 2;
            _motor2.setMotorPwm(180 - turn);
        }
    }
    else if(turnAngle > 180 && turnAngle <= 270)
    {
        if(turnAngle <= 210)
            _motor2.setMotorPwm(0);
        else
        {
            int turn = (270 - turnAngle) * 2;
            _motor2.setMotorPwm(-180 + turn);
        }
    }
    else if(turnAngle > 270 && turnAngle <= 360)
    {
        if(turnAngle >= 330)
            _motor1.setMotorPwm(0);
        else
        {
            int turn = (360 - turnAngle) * 2;
            _motor1.setMotorPwm(180 - turn);
        }
    }
}