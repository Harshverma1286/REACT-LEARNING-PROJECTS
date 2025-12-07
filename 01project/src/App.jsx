import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/card'

function App() {
  const [count, setCount] = useState(0)

  let somework = {
    name:"latina provouski",
    paragraph:"kindly work on it because u are one of the greats i know kindly do the work",
    btntext:"kindly click it "
  }

  let anotherwork = {
     name:"rubeka sonwani",
      paragraph:"so i want you tell that u have to work on it",
      btntext:"visit me "
  }

  return (
    <>
    <Card somework={somework}/>
    <Card somework={anotherwork}/>
    </>
  )
}

export default App
