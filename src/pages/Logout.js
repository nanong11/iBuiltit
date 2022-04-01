import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { Navigate } from 'react-router-dom'

export default function Logout() {
    const dispatch = useDispatch()
    dispatch(setUserData({}))
    localStorage.clear()
  return (
    <Navigate to={"/"} />
  )
}
