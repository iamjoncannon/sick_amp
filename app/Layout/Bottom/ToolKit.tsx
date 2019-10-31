import React from 'react';
import { Store } from '../../store/Store'
import styled from 'styled-components'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SliderContainer = styled.div`

    width: 80%;
    margin: 1vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .range {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        font-size: 1.75vh;
    }
    
    div .rc-slider-rail {

        background-color: ${props => props.theme.fontColor};
    }

    div .rc-slider-track {

        background-color: ${props => props.theme.logoColor};
    }

    div .rc-slider-handle {

        background-color: ${props => props.theme.logoColor};
        border: ${props => props.theme.logoColor};

    }

    .rc-slider-handle:active{
        box-shadow: 0 0 1px ${props => props.theme.logoColor};
    }

`

const ToolKit = () => {
    
    let [ value, onChange ] = React.useState([50,200])

    return (
        <SliderContainer>

            <span>BPM</span>

            <Slider.Range 
                value={value} 
                allowCross={false} 
                min={50}
                max={200}
                defaultValue={[50, 200]} 
                onChange={onChange} 
            />

            <div className="range">
                <span>{value[0]}</span>
                <span>{value[1]}</span>
            </div>
        
        </SliderContainer>
    )
}

export default ToolKit