import React from 'react'
import { useSelector } from 'react-redux'

const UserProfile = () => {

    const {user} = useSelector((state) => state.auth)
  return (
    <div className='flex gap-4 '>
      
      <div>
      <img src="https://avatar.iran.liara.run/public" width={45} height={45}/>
      </div>

      <div className='flex flex-col justify-end'>
        <h1 className='text-base'>{user.name}</h1>
        <h2 className='text-slate-500 text-xs'>{user.email}</h2>
      </div>
    </div>
  )
}

export default UserProfile
