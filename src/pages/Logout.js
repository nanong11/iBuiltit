import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { Navigate } from 'react-router-dom'

export default function Logout() {
    const dispatch = useDispatch()
    useEffect(() => {
        localStorage.clear()
        dispatch(setUserData({}))
    }, [dispatch])
  return (
    <Navigate to={"/"} />
  )
}
