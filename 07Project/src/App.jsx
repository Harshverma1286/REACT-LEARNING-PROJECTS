import { useEffect, useState } from 'react'
import './App.css'
import ThemeBtn from './components/Themebtn'
import Card from './components/Card'
import useTheme from './context/theme.jsx'

function App() {

  const {thememode,darktheme,lighttheme} = useTheme();

  useEffect(()=>{
    document.querySelector('html').classList.remove("light","dark");

    document.querySelector('html').classList.add(thememode);
  },[thememode]);

  return (
    <>
            <div className="flex flex-wrap min-h-screen items-center">
                      <div className="w-full">
                            <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                                {<ThemeBtn/>}
                            </div>
                            <div className="w-full max-w-sm mx-auto">
                              {<Card/>}
                            </div>
                        </div>
          </div>
    </>
  )
}

export default App
