import React from 'react'
import AppNavBar from './AppNavBar'
import { Outlet } from 'react-router-dom'
import Banner from './Banner'
import Footer from './Footer'

export default function WithAppNavBar() {
  return (
    <>
        <AppNavBar />
        <Banner />
        <Outlet />
        <Footer />
    </>
  )
}
