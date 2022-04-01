import React from 'react'
import AppNavBar from './AppNavBar'
import { Outlet } from 'react-router-dom'
import Banner from './Banner'

export default function WithAppNavBar() {
  return (
    <>
        <AppNavBar />
        <Banner />
        <Outlet />
    </>
  )
}
