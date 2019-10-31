import React from 'react';
import { ThemeProvider } from 'styled-components'

// we want to create a Theme Provider 
// for all downstream components,
// but want our global store to be able 
// to alter the themes as well, so the 
// user can create skins

const InitialTheme = {
    primaryColor: "#3F3F3F",
    secondaryColor: "#262626",
    tertiaryColor: "#1E1E1E",
    highlightColor: "#A9A9A9",
    logoColor: "rgba(255, 0, 0, .25)",
    fontColor: "#E0E0E0",
    boxColor: "rgba( 255, 255, 255, 0.25 )" 

}

const ThemeManager = (props: any) => {

    // todo - wire into the store 

    return (
        <ThemeProvider theme={InitialTheme}>
            {props.children}
        </ThemeProvider>
    )
}

export default ThemeManager