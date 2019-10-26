import React from 'react';
import { Store } from './Store'
import styled from 'styled-components'
import * as Types from './Types'
import SongTable from './SongTable'

const SongSectionContainer = styled.div`
    height: 100vh;
    width: 75vw;
    background-color: grey;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
`

const Songs = (props : any) => {

    const { state, dispatch } = React.useContext(Store);

    let sortedData
    
    if(!!state.Songs){

        sortedData = sortColumns(state.Songs, dispatch) 
    }

    return (

        <SongSectionContainer>
            
            <SongTable />

        </SongSectionContainer>
    )
}

export default Songs


/* 
we have to sort through the songs and find 
all the possible categories- later we will build
out a feature to allow the user to delete 
columns, like in iTunes

this is going to give us a table with N columns

then we iterate through each song return and place
the data in the appropriate column 

{ !!state.Songs 
                && Object.entries(state.Songs)
                    .map( (song : [string, Types.SongObject] ) =>{
                console.log(song)
                return ( 
                    <>
                    </>
                )
            })}

*/

function sortColumns( data : Types.songStateType, dispatch : any){


}