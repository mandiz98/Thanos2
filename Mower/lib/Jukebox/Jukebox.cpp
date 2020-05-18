/** 
 * \class Jukebox
 * \brief Class used to control the and play music on the buzzer
 * @file Jukebox.cpp
 * @author Edvin Egerhag, Thanos2
 * @version 0.1
 * @date 16/04/2020
 * @brief Source file for Jukebox.h. This class controls the buzzer, it can play a few songs, or a regular buzz
 * 
 * \par Method list:
 * 
 *      1. void Jukebox::play(int song);
*/

//contains notes 
#include "Jukebox.h"

Jukebox::Jukebox()
{
    _buzzer.setpin(45); //connect to the buzzer
}

Jukebox::~Jukebox()
{
}

void Jukebox::play(int song) //this function stores the song info in two arrays.
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
        sing(melody, duration); //play the song
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

    else if(song == BASICBITCH) //regular buzzer
        {
            _buzzer.tone(440, 100);
            _buzzer.noTone();
        }
}