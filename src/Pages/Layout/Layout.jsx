import React, { useEffect , useContext } from 'react'
import './Layout.module.css'
import Navbar from '../../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import {UserContext} from '../../Context/UserContext'

export default function Layout() {
  const {setUserToken} = useContext(UserContext);


  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      // set in cotext 
      setUserToken(localStorage.getItem('userToken'));
    }

  }, [setUserToken])
  

  return (
   <>
   <Navbar/>
   <Outlet></Outlet>
   <Footer/>
   </>
  )
}
