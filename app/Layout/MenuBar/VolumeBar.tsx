import React from 'react';
import styled from 'styled-components'
import { Store } from '../../store/Store'
import { AudioObject } from './AudioPlayer/useAudioPlayer'

const Container = styled.div`

    position: absolute;
    left: 38vh;
    top: 1.5vh;
    cursor: pointer;
    width: 5vw;

    .slider {
        -webkit-appearance: none;
        background: ${props=>props.theme.highlightColor};
        outline: none;
        -webkit-transition: .2s;
        transition: opacity .2s;
        height: .75vh;
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 1vw;
        height: 2vh;
        border-radius: 30px;
        background: ${props=>props.theme.secondaryColor};
        cursor: pointer;
        border: 1px solid white;
    }

    .slider::-moz-range-thumb {
        width: 1vw;
        height: 2vh;
        border-radius: 30px;
        background: ${props=>props.theme.secondaryColor};
        cursor: pointer;
        border: 1px solid white;
    }

`


const VolumeBar = () => {

    const [volume, setVolume] = React.useState(950)

    React.useEffect(()=>{

        let audio : AudioObject = document.getElementById("audio")

        if(audio){

            audio.volume = volume / 1000
        }
    })

    return (
        <Container>

            <input 
                className="slider"
                type="range"
                min={0}
                max={1000}
                value={volume}
                onChange={e=>setVolume(e.target.value)}
            />

        </Container>
    )
}

export default VolumeBar