import React from 'react';
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { Store } from '../store/Store'

const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;

    svg {
        color: ${props=>props.theme.fontColor};
        position: relative;
        bottom: 2vh;
        margin-bottom: -1.4vh;
        height: 1.5vh;
    }

    input {
        background-color: ${props=>props.theme.secondaryColor};
        color: ${props=>props.theme.fontColor};
        width: 20vh;
        height: 2vh;
        border: none;
    }

    span {
        font-size: 1.6vh;
        opacity: .75;
        color: ${props=>props.theme.fontColor}
    }
`

interface SearchBarProps {

    target: string
}

const SearchBar = (props : SearchBarProps) => {

    const { state, dispatch } = React.useContext(Store);

    const { SearchBarText } = state

    const  all_fields  = SearchBarText.all_fields.text

    const { target } = props 

    function handleChange(e){

        dispatch({type: "HANDLE_SEARCHBAR_TEXT", payload: { target: target, text: e.target.value} })
    }

    const handleFocusOut = () => {
        
        toggleSearchBar(false)
    }

    const toggleSearchBar = (state_change) => {

        dispatch({type: "TOGGLE_SEARCHBAR_FOCUS", payload: state_change})
    }


    return (

        <SectionContainer>
            
            <input 
                onChange={handleChange}
                value={ all_fields ? all_fields : SearchBarText[target].text }   
                onFocus={()=>toggleSearchBar(true)} 
                onBlur={handleFocusOut}    
            />
                { SearchBarText[target].text === "" && 
                  all_fields === "" && 

                    <FontAwesomeIcon 
                        icon={faSearch} 
                    />
                }
        
        </SectionContainer>
    )
}

export default SearchBar