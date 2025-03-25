import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/authSlice'

const Logout = () => {

    const dispatch = useDispatch()
    const logoutAction = () => {
        dispatch(logout())
    }
    
  return (
    <Button onClick={logoutAction} className='m-3 mb-5'>Logout</Button>
  )
}

export default Logout
