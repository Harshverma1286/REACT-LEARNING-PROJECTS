import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authservice from './Appwrite/auth';
import { login, logout } from './Store/AuthSlice';
import { Footer, Header } from './components/indexexpo';
import { Outlet } from 'react-router-dom';

function App() {

  console.log(import.meta.env.VITE_APPWRITE_URL);

  const [loading,setloading] = useState(false);

  const dispatch = useDispatch();

  useEffect(()=>{
    authservice.currentuser().
    then((user)=>{
      if(user){
        dispatch(login({user}))
      }
      else{
        dispatch(logout());
      }
    }).finally(()=> setloading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block '>
        <Header/>
        <main>
          Todo:{/* <Outlet/> */}
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
