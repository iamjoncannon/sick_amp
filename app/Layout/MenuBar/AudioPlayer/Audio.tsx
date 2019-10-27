import React from "react";
import Song from "./Song";
import Play from "./Play";
import Pause from "./Pause";
import Bar from "./Bar";
import useAudioPlayer from './useAudioPlayer';
import styled from 'styled-components'
import { Store } from '../../../store/Store'

/*

s/o to this guy:

https://codesandbox.io/s/custom-audio-player-with-react-hooks-7s7sd

This player is adapted from this codebase, with styling converted
from SASS to styled components 

Note- there are type errors related to the audio component which 
I have not been able to resolve yet 

*/

const PlayerContainer = styled.div`
  font-family: sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #212527;
`

const ControlsContainer = styled.div`

    width: 100%;
    margin-top: 20px;
    flex-grow: 1;
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

function Audio() {

  const { curTime, duration, setClickedTime } = useAudioPlayer();

  return (

    <PlayerContainer>

      <audio 
        id="audio" 
      />

      <Song 
        songName="" 
        songArtist=""
      />

      <ControlsContainer>

        {/* {playing ?
          <Pause handleClick={() => setPlaying(false)} /> :
          <Play handleClick={() => setPlaying(true)} />
        } */}

        <Bar
          curTime={curTime}
          duration={duration}
          onTimeUpdate={(time) => setClickedTime(time)}/>

      </ControlsContainer>

    </PlayerContainer>
  );
}

export default Audio;
