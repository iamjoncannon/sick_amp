import React from 'react';
import { ThemeProvider } from 'styled-components'

// we want to create a Theme Provider 
// for all downstream components,
// but want our global store to be able 
// to alter the themes as well, so the 
// user can create skins

const InitialTheme = {
    
    primaryColor: "linear-gradient(rgba(63,63,63, 1), rgba(63,63,63,.95))",

    secondaryColor: "#262626", 
    secondaryColor_Background: "linear-gradient(rgba(38, 38, 38, 1), rgba(38, 38, 38,.95))",
    
    tertiaryColor: "#1E1E1E", 
    tertiaryColor_Background: "linear-gradient(rgba(30, 30, 30, 1), rgba(30, 30, 30, .95))",
    
    highlightColor: "#A9A9A9",
    
    logoColor: "rgba(255, 0, 0, .25)",
    logoColor_Background: "linear-gradient(rgba(255, 0, 0, .20), rgba(255, 0, 0, .25))",
    
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