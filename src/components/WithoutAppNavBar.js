import React from 'react'
import { Outlet } from 'react-router-dom'
import AppBarLogo from './AppBarLogo'

export default function WithoutAppNavBar() {
  return (
    <>
      <AppBarLogo />
      <Outlet />
    </>
  )
}
