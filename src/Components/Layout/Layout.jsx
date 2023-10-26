import { Outlet } from 'react-router'
import { Offline, Online } from "react-detect-offline";
import { Toaster } from 'react-hot-toast';



export default function Layout() {
  
  return (
    <>

    
    <Outlet/>
    <Toaster/>
    
    <Offline>Your Offline (surprise!)</Offline>

    
    </>
  )
}
