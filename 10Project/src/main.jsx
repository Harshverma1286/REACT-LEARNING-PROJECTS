import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './Store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Authlayout, Signup } from './components/indexexpo.js'
import Login from './Pages/Login.jsx'
import Home from './Pages/Home.jsx'
import Signup from './components/indexexpo.js'
import Post from './Pages/Post.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/login',
        element:(
          <Authlayout authentication={false}>
            <Login/>
          </Authlayout>
        )
      },
      {
        path:'/signup',
        element:(
          <Authlayout authentication={false}>
            <Signup/>
          </Authlayout>
        )
      },
      {
        path:'/all-posts',
        element:(
          <Authlayout authentication>
            {" "}
          </Authlayout>
        )
      },
      {
        path:'/add-post',
        element:(
          <Authlayout authentication>{" "}</Authlayout>
        )
      },
      {
        path:'/edit-post/:slug',
        element:(
          <Authlayout authentication>{" "}</Authlayout>
        )
      },
      {
        path:'/post/:slug',
        element:<Post/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
