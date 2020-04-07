/** 
 * \class MotorCommands
 * \brief Class used to control the onboard motors on the mower
 * @file MotorCommands.h
 * @author Edvin Egerhag, Thanos2
 * @version 0.1
 * @date 07/04/2020
 * @brief Header for MotorCommands.cpp
 * 
 * \par Method list:
 * 
 *      1. void MotorCommands::Drive(int speed);
 *      2. void MotorCommands::stop();
*/
#ifndef MotorCommands_H
#define MotorCommands_H

#include <MeEncoderOnBoard.h>
#include <MeEncoderMotor.h>
#include <MePort.h>
#include <MeConfig.h>

class MotorCommands
{
private:
    /* data */
    MeEncoderOnBoard _motor1;
    MeEncoderOnBoard _motor2;
    MeEncoderMotor _encoders[2];
public:
    MotorCommands();
    ~MotorCommands();
    void Drive(int speed);
    void stop();
};
void driving();

#endif
