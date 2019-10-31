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
        bottom: ${props=> props.all_fields ? "3vh" : "2vh"}; 
        margin-bottom: -1.4vh;
        height: ${props=> props.all_fields ? "2vh" : "1.5vh"};
    }

    input {
        background-color: ${props=>props.theme.secondaryColor};
        color: ${props=>props.theme.fontColor};
        border: none;
        font-size: ${props=> props.all_fields ? "3vh" : "1.6vh"}; 
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

    const inlines = props.target === "all_fields" ? { width: "20vw", height: "4vh"} : { width: "10vw", height: "2vh"} 

    return (

        <SectionContainer all_fields={props.target === "all_fields"}>
            
            <input 
                style={inlines }
                global={props.global}
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