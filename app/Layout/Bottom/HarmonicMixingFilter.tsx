import React from 'react';
import { Store } from '../../store/Store'
import styled from 'styled-components'

const HarmonicsToKey = {
    "1A": "Abm",
    "2A": "Ebm",
    "3A": "Bbm",
    "4A": "Fm",
    "5A": "Cm",
    "6A": "Gm",
    "7A": "Dm",
    "8A": "Am",
    "9A": "Em",
    "10A": "Bm",
    "11A": "F#m",
    "12A": "Dbm",
    "1B": "B",
    "2B": "F#",
    "3B": "Db",
    "4B": "Ab",
    "5B": "Eb",
    "6B": "Bb",
    "7B": "F",
    "8B": "C",
    "9B": "G",
    "10B": "D",
    "11B": "A",
    "12B": "E",
}

const KeyToHarmonics = {
    Abm: '1A',
    Ebm: '2A',
    Bbm: '3A',
    Fm: '4A',
    Cm: '5A',
    Gm: '6A',
    Dm: '7A',
    Am: '8A',
    Em: '9A',
    Bm: '10A',
    'F#m': '11A',
    Dbm: '12A',
    B: '1B',
    'F#': '2B',
    Db: '3B',
    Ab: '4B',
    Eb: '5B',
    Bb: '6B',
    F: '7B',
    C: '8B',
    G: '9B',
    D: '10B',
    A: '11B',
    E: '12B'
}

// http://www.harmonic-mixing.com/howto.aspx

// major -> minor == XA => XB

// circle of fifths = X => X-1 or X+1

const getHarmonics = ( root, key ) => {

    return 
}

const Container = styled.div`
    width: 80%;
    height: 50%;
    border: 1px solid ${props=>props.theme.tertiaryColor};
    display: flex;
    flex-wrap: wrap;
    margin-left: 5%;

    span {
        font-size: 1.75vh;
        width: 15%;
        border: 1px solid ${props=>props.theme.tertiaryColor};
        text-align: center;
    }

    span:hover {

        background-color: ${props=>props.theme.logoColor};
        font-weight: bold;
    }

    .selected {

        background-color: ${props=>props.theme.logoColor};
    }

    .harmonic {

        background-color: ${props=>props.theme.boxColor};
    }

`

const HarmonicMixingFilter = ( ) => {

    const { state, dispatch } = React.useContext(Store);

    const { FilterState } = state 

    const handleClick = (key) => {

        dispatch({type: "MUTATE_FILTERSTATE", payload: { field: "key", value: key }})
    }

    return (

        <Container>
           
            {Object.keys(KeyToHarmonics).map((thisKey)=>{
                
                let computedClass 
                
                if(FilterState.key){

                    computedClass = FilterState.key[thisKey] ? "selected" : undefined ;                    
                }
                
                return (
                    
                    <span
                        key={thisKey}
                        className={computedClass} 
                        onClick={()=>handleClick(thisKey)} 
                    >
                    {thisKey}
                    </span>

                )
            })}

        </Container>
    )
}

export default HarmonicMixingFilter