import React, { createContext, useContext } from "react";


export const Themecontext = createContext()

export const ThemeProvider = ({children})=>{
    const [thememode,setthememode] = React.useState("light");

    const darktheme = ()=>{
        setthememode("dark");
    }

    const lighttheme = ()=>{
        setthememode("light");
    }

    return (
    <Themecontext.Provider value={{thememode,darktheme,lighttheme}}>
        {children}
    </Themecontext.Provider>
    )
}

export default function useTheme(){
    return useContext(Themecontext);
}