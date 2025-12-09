import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  let [length,setlength] = useState(8);

  let [password,setpassword] = useState("");

  let [numallowed,setnumallowed] = useState(false);

  let[charallowed,setcharallowed] = useState(false);

  const passwordref = useRef(null);

  const passwordgenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numallowed){
      str+="123456789";
    }
    if(charallowed){
      str+="!@$#%^&*(){}?";
    }

    for(let i=1;i<=length;i++){
      let randomidx = Math.floor(Math.random()*str.length+1);

      pass+=str[randomidx];
    }

    setpassword(pass);
  },[length,numallowed,charallowed,setpassword]);

  useEffect(()=>{
    passwordgenerator();
  },[passwordgenerator]);

  const copytoclipboard = useCallback(()=>{
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,99);
    window.navigator.clipboard.writeText(password);
  },[password])

  return (
    <>
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text"
        value={password}
        className="outline-none w-full py-1 px-3"
        placeholder='password'
        readOnly
        ref={passwordref} />
        <button
        onClick={copytoclipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <input type="range" 
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setlength(e.target.value)}}
         />
         <label>length:{length}</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox"
        defaultChecked={numallowed}
        id='numberInput'
        onChange={()=> {setnumallowed((prev)=>!prev)}} />
        <label htmlFor='numberInput'>Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox"
        defaultChecked={charallowed}
        id="charinput"
        onChange={()=>{setcharallowed((prev)=>!prev)}} />
        <label htmlFor="charinput">characters</label>
      </div>
     </div>
    </>
  )
}

export default App
