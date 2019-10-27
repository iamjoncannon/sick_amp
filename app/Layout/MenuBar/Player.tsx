import React from 'react'
import styled from 'styled-components'
import { Store } from './Store'
const useState = (React as any).useState;

const AudioPlayer = () => {

    return(

        <audio 
            src={'http://localhost:3001/track/01%20Plot%20Twist.mp3'} 
            type="audio/mpeg"
            autoplay
            controls
        />
    )
}

export default AudioPlayer 