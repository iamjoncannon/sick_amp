import React,{ useState, useEffect } from "react";
import { Store } from '../../../store/Store'

function useAudioPlayer() {

  const { state, dispatch } = React.useContext(Store);

  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [currentTrack, setCurrentTrack] = useState(false);
  const [clickedTime, setClickedTime] = useState();

  useEffect(() => {
    
    let audio = document.getElementById("audio")

    audio.loop = false 

    // state setters wrappers
    const setAudioData = () => {

      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    }

    const setAudioTime = (e) => {
     
      setCurTime(audio.currentTime)
    };

    const handleEnd = () => {

      dispatch({type:"PLAY_NEXT_TRACK", payload: null })
    }

    // DOM listeners: update React state on DOM events 
    // other ones: loadedmetadata
    // onended

    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);

    audio.addEventListener("ended", handleEnd);

    // reset source for file if changed

    let filePath
  
    if(state.Songs){

      filePath = state.Songs[state.Transport.current].FILENAME

      if(!currentTrack || (currentTrack !== filePath) ){

        audio.src = `/tunes/${filePath}`
        setCurrentTrack(filePath)
      }
    }

    // the next two conditionals are basically "componentDidUpdate" 
    // ..would be memory leak if the HTML5 audio element replayed
    // but the element seems to ignore subsequent "play" calls, if
    // there are perforamnce issues in the future might need to 
    // refactor this

    if( state.isPlaying  ){

      audio.play()
    }

    if( !state.isPlaying  ){

      audio.pause()
    }

    // this manages skipping around with the bar 

    if (!!clickedTime && clickedTime !== curTime) {
      
      audio.currentTime = clickedTime
   
      setClickedTime(null);    
    } 

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleEnd);
    }

  });

  return {
    curTime,
    duration,
    setClickedTime
  }
}

export default useAudioPlayer;