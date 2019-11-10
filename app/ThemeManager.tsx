import React from 'react';
import { ThemeProvider } from 'styled-components'

// we want to create a Theme Provider 
// for all downstream components,
// but want our global store to be able 
// to alter the themes as well, so the 
// user can create skins

const device = {

    mobileS: ['320px', "min"],
    mobileM: ['375px', "min"],
    mobileL: ['425px', 'min'],
    tablet: ['768px','min'],
    laptop: ['1024px','min'],
    laptopL: ['1440px','min'],
    desktop: ['2560px','min'],
    
    cell: ["600px", "max"],
    tab: ["601px", "min"],
    desk: ["1100px", 'min']
}

/*

@mixin for-phone-only {
    @media (max-width: 599px) { @content; }
  }
  @mixin for-tablet-portrait-up {
    @media (min-width: 600px) { @content; }
  }
  @mixin for-tablet-landscape-up {
    @media (min-width: 900px) { @content; }
  }
  @mixin for-desktop-up {
    @media (min-width: 1200px) { @content; }
  }
  @mixin for-big-desktop-up {
    @media (min-width: 1800px) { @content; }
  }
  
*/


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
    boxColor: "rgba( 255, 255, 255, 0.25 )",

    query: (size, content) => {

        const [ pixels , direction ] = device[size]

        return `
            @media only screen and (${direction}-device-width: ${pixels}){

                ${content}
            }
        `
    }     
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