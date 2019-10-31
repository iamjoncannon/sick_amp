import React from 'react';
import { Store } from '../../store/Store'
import styled from 'styled-components'
import FieldFilter from './FieldFilter'
import ToolKit from './Toolkit'

const PlayListFilterContainer = styled.div`
    height: 24vh;
    background-color: ${props=>props.theme.tertiaryColor}
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    nav {
        height: 90%;
        width: 2.5vh;
        background-color: ${props=>props.theme.logoColor};
        text-align: center;

        > span {
        }
    }

    > div {
        width: 24%;
        height: 90%;
        margin: .3vh;
        border: 1px solid ${props=>props.theme.fontColor}
        position: relative;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
`

const PlayListFilters = (props: any ) => {

    return (

        <PlayListFilterContainer>
            
            <nav>
                <span></span> 
                
            </nav>
            
            <div>
                <FieldFilter field={1}/>
            </div>
            
            <nav>

            </nav>
            <div>
                <FieldFilter field={2}/>
            </div>

            <nav>

            </nav>
            <div>
                <FieldFilter field={3}/>
            </div>
            
            <nav>

            </nav>
            <div>
                <ToolKit />
            </div>

        </PlayListFilterContainer>
    )
}

export default PlayListFilters
