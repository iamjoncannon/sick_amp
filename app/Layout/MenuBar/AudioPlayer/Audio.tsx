import React from "react";
import Song from "./Song";
import Play from "./Play";
import Pause from "./Pause";
import Bar from "./Bar";
import useAudioPlayer from './useAudioPlayer';
import styled from 'styled-components'

const PlayerContainer = styled.div`
  width: 30vw;
  height: 10vh;
  font-family: sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
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

  const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();

  return (

    <PlayerContainer>

      <audio id="audio" preload="auto">
        {/* <source src='http://localhost:3001/track/01%20Plot%20Twist.mp3#t=50' /> */}
        {/* <source src='/track/01%20Plot%20Twist.mp3#t=50' /> */}
        <source src='/tunes/01 Plot Twist.mp3' />
        Your browser does not support the <code>audio</code> element.
      </audio>

      <Song 
        songName="" 
        songArtist=""
      />

      <ControlsContainer>

        {playing ?
          <Pause handleClick={() => setPlaying(false)} /> :
          <Play handleClick={() => setPlaying(true)} />
        }

        <Bar
          curTime={curTime}
          duration={duration}
          onTimeUpdate={(time) => setClickedTime(time)}/>

      </ControlsContainer>

    </PlayerContainer>
  );
}

export default Audio;
