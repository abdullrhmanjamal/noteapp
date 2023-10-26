
import './App.css';
import Layout from  './Components/Layout/Layout'
import NotFound from  './Components/NotFound/NotFound'
import Regter from  './Components/Regster/Regster'
import Login from  './Components/Login/Login'
import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Notes from './Components/Notes/Notes';



function App() {
let routers= createHashRouter([
  {path:'', element:<Layout/>, children:[
    {path:'', element: <Navigate to={'regster'}/>},
    {path:'login',element:<Login/>},
    {path:'regster',element:<Regter/>},
    {path:'notes',element:<Notes/>},
    {path:'*',element:<NotFound/>}
    
  ]}])
  return (
    <>

    <RouterProvider router={routers}/>
    

    </>
    
  )
}

export default App;
