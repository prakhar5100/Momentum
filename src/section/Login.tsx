import React, { useState } from 'react'
import { LoginForm } from "@/components/login-form"
import { useDispatch } from 'react-redux'
import { loginSuccess } from '@/store/authSlice'
import { useNavigate } from 'react-router-dom'
const Login = () => {

    const navigate = useNavigate()
    const [loginInfo, setloginInfo] = useState({
        name : '',
        email : '',
        password : ''
    })

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.id 
        const value = event.target.value 

        setloginInfo((prev) => ({
            ...prev, 
            [name] : value
        }))

    }
    const dispatch = useDispatch()
    const handleSubmit = () => {
        dispatch(loginSuccess(loginInfo))
        navigate('/dashboard')
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-3xl">
            <LoginForm method={"login"} handleChange={handleChange} handleSubmit={handleSubmit}/>
          </div>
        </div>
      )
    }

export default Login