import LoaderWrappre from '@/components/LoaderWrappre'
import Sidebar from '@/components/Sidebar'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Protected = () => {


    const {isAuthenticated} = useSelector((state) => state.auth) 

    console.log(isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />    
    }

    return (
       
        <Sidebar>
            <LoaderWrappre delay={2000}>
            <Outlet />
            </LoaderWrappre>
        </Sidebar>
    )
 
}

export default Protected
