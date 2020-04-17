/** 
 * \class Jukebox
 * \brief Class used to control the and play music on the buzzer
 * @file Jukebox.cpp
 * @author Edvin Egerhag, Thanos2
 * @version 0.1
 * @date 16/04/2020
 * @brief Source file for Jukebox.h
 * 
 * \par Method list:
 * 
 *      1. void Jukebox::play(int song);
*/

#include "Jukebox.h"

Jukebox::Jukebox()
{
    _buzzer.setpin(45);
}

Jukebox::~Jukebox()
{
}

void Jukebox::play(int song)
{
    if (song == LACUCARACHA)
    {
        int melody[] =
            {D3, D3, D3, G3, B3, D3, D3, D3, G3, B3, 0,
             G3, G3, FS3, FS3, E3, E3, D3};
        int duration[] =
            {EIGHTH, EIGHTH, EIGHTH, QUARTER + EIGHTH, QUARTER, EIGHTH,
             EIGHTH, EIGHTH, QUARTER + EIGHTH, HALF + EIGHTH, EIGHTH,
             QUARTER, EIGHTH, EIGHTH, EIGHTH, EIGHTH, EIGHTH, EIGHTH};

        _size = 18; //cannot use sizeof on arrays defined at runtime
        sing(melody, duration);
    }

    else if(song == DESPACITO)
    {
        _size = 43;
        int melody[] = 
        {D5, CS5, B4, FS4, 0, FS4, FS4, FS4, FS4, FS4, B4, B4, B4, B4, A4, B4,
        G4, 0, G4, G4, G4, G4, G4, B4, B4, B4, B4, CS5, D5, A4, 0, A4, A4, A4, A4, A4, D5, D5, D5, D5, E5, E5, CS5};
        int duration[] =
        {QUARTER, QUARTER, EIGHTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, EIGHTH,
        SIXTEENTH, EIGHTH, EIGHTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH,
        EIGHTH, SIXTEENTH, EIGHTH, EIGHTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, SIXTEENTH, EIGHTH,
        SIXTEENTH, EIGHTH, QUARTER + EIGHTH};

        sing(melody, duration);
    }

    else if(song == VITAELUX)
    {
        int melody[] =
        {C5, C5, C5, 0, C5, D5, C5, C5, 0, A4, G4, F4, 0, F4, G4};

        int duration[] =
        {QUARTER, QUARTER, QUARTER+SIXTEENTH, SIXTEENTH, EIGHTH, QUARTER, QUARTER, QUARTER, //C C C, br, C D C C 
        QUARTER, QUARTER, QUARTER, QUARTER+SIXTEENTH, SIXTEENTH, EIGHTH, HALF};             //br, A G F, br, F G

        _size = 15;

        sing(melody, duration);
    }
}


/*_buzzer.tone(147, 100);
        _buzzer.noTone();
        delay(30);
        _buzzer.tone(147, 100);
        _buzzer.noTone();
        delay(30);
        _buzzer.tone(147, 100);
        _buzzer.noTone();
        delay(30);
        _buzzer.tone(196, 300);
        _buzzer.noTone();
        delay(30);
        _buzzer.tone(247, 200);
        delay(30);
        _buzzer.tone(147, 100);
        _buzzer.noTone();
        delay(30);
        _buzzer.tone(147, 100);
        _buzzer.noTone();
        delay(30);
        _buzzer.tone(147, 100);
        _buzzer.noTone();
        delay(30);
        _buzzer.tone(196, 300);
        _buzzer.noTone();
        delay(30);
        _buzzer.tone(247, 500);
        delay(100);
        _buzzer.tone(196, 200);
        _buzzer.noTone();
        delay(30);
        _buzzer.tone(196, 100);
        _buzzer.noTone();
        delay(30);
        _buzzer.tone(185, 100);
        _buzzer.noTone();
        delay(30);
        _buzzer.tone(185, 100);
        _buzzer.noTone();
        delay(30);
        _buzzer.tone(165, 100);
        _buzzer.noTone();
        delay(30);
        _buzzer.tone(165, 100);
        _buzzer.noTone();
        delay(30);
        _buzzer.tone(147, 100);
        _buzzer.noTone();
        delay(30);*/