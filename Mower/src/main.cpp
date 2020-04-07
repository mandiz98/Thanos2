#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include "MeAuriga.h"

MeBuzzer sing(45);
MeUltrasonicSensor us(PORT_10);
MeBluetooth bt(PORT_3);
MeEncoderOnBoard motor1(SLOT1);
MeEncoderOnBoard motor2(SLOT2);
MeEncoderMotor encoders[2];

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  bt.begin(115200);
}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available())
  {
    char x = Serial.read();
    if(x == '1')
      {
        motor1.setMotorPwm(-180);
        motor2.setMotorPwm(180);
        sing.tone(45, 440, 100);
      }
    else if(x == '2')
      {
        motor1.setMotorPwm(-180);
        motor2.setMotorPwm(-180);
      }
      
    else if(x == '3')
    {
      motor1.setMotorPwm(180);
      motor2.setMotorPwm(180);
    }

    else if(x == '4')
    {
      motor1.setMotorPwm(180);
      motor2.setMotorPwm(-180);
    }

    else if(x == '5')
    {
      motor1.setMotorPwm(0);
      motor2.setMotorPwm(0);
    }   
  }
}