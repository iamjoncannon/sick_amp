import React from 'react';
const Suspense = (React as any).Suspense;
const useState = (React as any).useState;
const useEffect = (React as any).useEffect;
import styled from 'styled-components'
import * as Types from '../../store/Types'
import { Store } from '../../store/Store'

import Audio from '../MenuBar/AudioPlayer/Audio'
import VolumeBar from './VolumeBar'
const Icon = React.lazy(() => import('./Icon'))
const Transport = React.lazy(() => import('./Transport'))
const SearchBar = React.lazy(() => import('../../Components/SearchBar'))


const PrimaryMenuContainer = styled.div`
    background-color: ${props=>props.theme.primaryColor};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 6vh;
    position: relative;
`

const PlayerStateContainer = styled.div`

    width: 40vw;
    height: 100%;
    background-color: ${props=>props.theme.secondaryColor};
`

const SecondaryMenuContainer = styled.div`
    background-color: ${props=>props.theme.secondaryColor};
    border: 1px solid ${props=>props.theme.primaryColor};
    height: 4vh;
    color:${props=>props.theme.fontColor}
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75vh;
    
    div {
        width: 40vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    span {

        cursor: pointer;
    }
    
    span:first-child {
        margin-right: 2.5vh;
        text-decoration: underline;
        background-color: ${props=>props.theme.secondaryColor};
    }

    span:last-child {
        margin-left: 2.5vh;
    }
`

const SearchBarContainer = styled.div`
    position: absolute;
    right: 10vh;
`

const LeftSection = styled.div`
    position: absolute;
    left: 0;
    height: 100%;
    width: 25%;

`

const MenuBar = (props: any) => {

    const { state, dispatch } = React.useContext(Store);

    return (
        <>
        <PrimaryMenuContainer>
            
            <Suspense fallback="Loading...">
                
                <Icon />
                <Transport /> 
            </Suspense>

            <VolumeBar />

            <PlayerStateContainer>
                
                <Audio /> 
                
            </PlayerStateContainer>
        
            <SearchBarContainer>

                <SearchBar target={"all_fields"}/>
            </SearchBarContainer>

        </PrimaryMenuContainer>
        
        <SecondaryMenuContainer>
            <div>
                <span>My Library</span>
                <span>Profile</span>
                <span>Sick.DB</span>
            </div>
        </SecondaryMenuContainer>
        </>
    )
}

export default MenuBar 