import React, { useEffect, useState } from 'react'
import { Audio } from 'react-loader-spinner'

const LoaderWrappre = ({children, delay} : {children : React.ReactNode, delay : number}) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer  = setTimeout(() => setLoading(false), delay)
        return () => clearTimeout(timer)
    }, [delay])
  return (
    loading ? <div className='w-full h-full grid place-content-center'>
       <Audio
  height="80"
  width="80"
  radius="9"
  color="#7C3AED"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
    </div> : children
  )
}

export default LoaderWrappre
