import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import styled from 'styled-components'

const BarContainer = styled.div`

  user-select: none;
  width: 100%;
  display: flex;
  align-items: center;
  width: 90%;

  .bar__time {
    color: white;
    font-size: 1.5vh;
  }

  #bar__progress {
    flex: 1;
    border-radius: 5px;
    margin: 0 20px;
    height: 2.5px;
    display: flex;
    align-items: center;
    cursor: pointer;

    .bar__progress__knob {
      position: relative;
      height: 1.5vh;
      width: .5vw;
      background-color: white;
    }
  }
`

const BarProgress = styled.div`
    flex: 1;
    border-radius: 5px;
    margin: 0 20px;
    height: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
`


export default function Bar(props) {

  const { duration, curTime, onTimeUpdate } = props;

  const curPercentage = (curTime / duration) * 100;

  function formatDuration(duration) {

    let newTime = moment.duration(duration, "seconds") // .format("mm:ss", { trim: false });
    
    return `${parseInt(newTime.minutes())}:${parseInt(newTime.seconds())}`
  }

  function calcClickedTime(e) {

    const clickPositionInPage = e.pageX;

    const bar = document.getElementById("bar__progress")
    
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    
    const barWidth = bar.offsetWidth;
    
    const clickPositionInBar = clickPositionInPage - barStart;
    
    const timePerPixel = duration / barWidth;
    
    return timePerPixel * clickPositionInBar;  
  }

  function handleTimeDrag(e) {

    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = eMove => {

      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {

      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }

  return (

    <BarContainer>

      <span className="bar__time">{formatDuration(curTime)}</span>
      
      <BarProgress
        id="bar__progress"
        style={{
          background: `linear-gradient(to right, white ${curPercentage}%, grey 0)`
        }}
        onMouseDown={e => handleTimeDrag(e)}
      >

        <span
          className="bar__progress__knob"
          style={{ left: `${curPercentage}%` }}
        />
         
      </BarProgress>
 
      <span className="bar__time">{formatDuration(duration)}</span>
 
    </BarContainer>
  );
}
