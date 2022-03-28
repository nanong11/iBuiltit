import React from 'react'
import AppNavBar from './AppNavBar'
import { Outlet } from 'react-router-dom'

export default function WithAppNavBar() {
  return (
    <>
        <AppNavBar />
        <Outlet />
    </>
  )
}
