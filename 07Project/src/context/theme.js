import React, { createContext, useContext } from "react";


export const Themecontext = createContext({
    thememode:"light",
    darktheme:()=>{},
    lighttheme:()=>{},
})

export const ThemeProvider = Themecontext.Provider;

export default function useTheme(){
    return useContext(Themecontext);
}