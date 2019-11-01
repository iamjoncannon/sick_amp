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

const getHarmonics = ( key ) => {
    
    const root = KeyToHarmonics[key].split("")
    const degree = Number(root.slice(0, root.length-1).join(""))
    const mode = root[root.length-1]
    
    // major -> minor == XA => XB
    const newMode = mode === "A" ? "B" : "A";
    const relativeMinor = HarmonicsToKey[degree + newMode]

    // circle of fifths = X => X-1 or X+1

    function constrict(next){

        let newDegree = next 

        if(newDegree === 13){

            return 1
        } 
        else if(newDegree === 0){

            return 12
        }
        else{

            return newDegree
        }
    }

    const fifths = [ 
               HarmonicsToKey[constrict((degree - 1)) + mode], 
               HarmonicsToKey[constrict((degree + 1)) + mode] 
             ]
    
    return {
        relativeMinor,
        fifths 
    } 
}

const Container = styled.div`
    width: 80%;
    height: 50%;
    display: flex;
    flex-wrap: wrap;
    margin-left: 5%;

    span {
        font-size: 1.75vh;
        width: 15%;
        border: 1px solid ${props=>props.theme.tertiaryColor};
        text-align: center;
        box-sizing: border-box;
    }

    span:hover {

        background-image: ${props=>props.theme.logoColor_Background};
        font-weight: bold;
    }

    .selected {

        background-image: ${props=>props.theme.logoColor_Background};
    }

    .relative_Minor {

        background-color: #bc9c22;
        color: black;
    }
    
    .fifth {        
        
        border: 2px solid #bc9c22;
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
           
            { Object.keys(KeyToHarmonics).map((thisKey)=>{
                
                let computedClass = undefined
                
                if(FilterState.key && Object.keys(FilterState.key).length){

                    const harmonics = getHarmonics(Object.keys(FilterState.key)[0])

                    console.log(harmonics)

                    if(FilterState.key[thisKey]) computedClass = "selected" 

                    if( harmonics.relativeMinor === thisKey ) computedClass = "relative_Minor"

                    if(harmonics.fifths.includes(thisKey)) computedClass = "fifth"                    
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
            }) }

        </Container>
    )
}

export default HarmonicMixingFilter