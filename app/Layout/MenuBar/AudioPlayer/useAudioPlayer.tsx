import { useState, useEffect } from "react";

function useAudioPlayer() {

  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState();

  useEffect(() => {
    
    let audio = document.getElementById("audio")

    // state setters wrappers
    const setAudioData = () => {

      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    }

    const setAudioTime = (e) => {
     
      setCurTime(audio.currentTime)
    };

    const metaDataCallback = () =>{
      console.log("loadedmetadata")
    }
    // DOM listeners: update React state on DOM events loadedmetadata
    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("loadedmetadata", metaDataCallback;

    audio.addEventListener("timeupdate", setAudioTime);

    // React state listeners: update DOM on React state changes
    playing ? audio.play() : audio.pause();

    if (!!clickedTime && clickedTime !== curTime) {
      
      console.log(playing)

      audio.currentTime = clickedTime
   
      console.log(playing)

      setClickedTime(null);    
    } 

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("loadedmetadata", metaDataCallback);
      audio.removeEventListener("timeupdate", setAudioTime);
    }

  });

  return {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime
  }
}

export default useAudioPlayer;