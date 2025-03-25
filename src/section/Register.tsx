import React, { useState } from 'react'
import { LoginForm } from "@/components/login-form"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '@/store/authSlice'


const Register = () => {

    const navigate = useNavigate()

        const [registerInfo, setregisterInfo] = useState({
            email : '',
            password : ''
        })
    
        const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
            const name = event.target.id 
            const value = event.target.value 
    
            setregisterInfo((prev) => ({
                ...prev, 
                [name] : value
            }))
    
        }
    
        const dispatch = useDispatch()
        const handleSubmit = () => {
            dispatch(loginSuccess(registerInfo))
            navigate('/dashboard')
        }
        
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-3xl">
            <LoginForm method={"register"} handleChange={handleChange} handleSubmit={handleSubmit}/>
          </div>
        </div>
      )
    }

export default Register