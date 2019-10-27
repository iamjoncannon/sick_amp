import React,{ useState, useEffect } from "react";
import { Store } from '../../../store/Store'

function useAudioPlayer() {

  const { state, dispatch } = React.useContext(Store);

  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [currentTrack, setCurrentTrack] = useState(false);
  const [clickedTime, setClickedTime] = useState();

  useEffect(() => {
    
    let playing = true 

    let audio = document.getElementById("audio")

    // state setters wrappers
    const setAudioData = () => {

      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    }

    const setAudioTime = (e) => {
     
      setCurTime(audio.currentTime)
    };

    // DOM listeners: update React state on DOM events loadedmetadata
    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);

    // React state listeners: update DOM on React state changes
    // playing ? audio.play() : audio.pause();

    // reset source for file if changed

    let filePath
  
    if(state.Songs){

      filePath = state.Songs[state.Transport.current].FILENAME

      if(!currentTrack || (currentTrack !== filePath) ){

        audio.src = `/tunes/${filePath}`
        setCurrentTrack(filePath)
      }
    }

    // playing is local state from the original library 
    if( (!playing && state.isPlaying) || playing  ){

      audio.play()
      // setPlaying(true)
    }

    if(!state.isPlaying  ){

      audio.pause()
      // setPlaying(false)
    }

    if (!!clickedTime && clickedTime !== curTime) {
      
      audio.currentTime = clickedTime
   
      setClickedTime(null);    
    } 

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    }

  });

  return {
    curTime,
    duration,
    // playing,
    // setPlaying,
    setClickedTime
  }
}

export default useAudioPlayer;