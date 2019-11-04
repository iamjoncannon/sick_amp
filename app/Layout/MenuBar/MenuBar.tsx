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
import { getDevice } from '../../Helpers'

const PrimaryMenuContainer = styled.div`

    background-image: ${props=>props.theme.primaryColor};
    border-bottom: 1px solid rgba(63,63,63,1);
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
    background-image: ${props=>props.theme.secondaryColor_Background};
    position: absolute;
`

const SecondaryMenuContainer = styled.div`
    background-image: ${props=>props.theme.secondaryColor_Background};
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
        background-image: ${props=>props.theme.secondaryColor_Background};
    }

    span:last-child {
        margin-left: 2.5vh;
    }
`

const SearchBarContainer = styled.div`
`

const LeftSection = styled.div`
    height: 100%;
    width: 75%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const MenuBar = (props: any) => {

    const { state, dispatch } = React.useContext(Store);

    const device = getDevice()

    return (

        <>
        
        <PrimaryMenuContainer>
            
            <LeftSection>

                <Suspense fallback="Loading...">
                    
                    <Icon />

                    <Transport />

                </Suspense>

                { device !== 'cell' &&  <VolumeBar /> }

            </LeftSection>

            <PlayerStateContainer>
                
                <Audio /> 
                
            </PlayerStateContainer>
        
            <SearchBarContainer>

                { device !== 'cell' && <SearchBar target={"all_fields"}/> }

            </SearchBarContainer>

        </PrimaryMenuContainer>
        

        { device !== 'cell' && 
            <SecondaryMenuContainer>
                <div>
                    <span>My Library</span>
                    <span>Profile</span>
                    <span>Sick.DB</span>
                </div>
            </SecondaryMenuContainer>
        }
        </>
    )
}

export default MenuBar 