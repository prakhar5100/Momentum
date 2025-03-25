import React from 'react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { Task } from '@/store/taskSlice'
import { postData } from '@/store/apiSlice'
import { Audio } from 'react-loader-spinner'


const AIHelper = ({task} : {task : Task}) => {

    const dispatch = useDispatch()
    
    const {title, description} = task
    
    const {data, loading, error} = useSelector((state) => state.api)

    const query = `I have a task titled ${title}, it's about ${description}. 
    What are some tips and tricks to do this task efficiently without any bold or italic markdown. Also keep it under 100 words`

    const handleAI = () => {
        dispatch(postData(query))
    }
  return (
    <div>
      
      <h1>Confused about how to tackle this task ?</h1>

      <Button className='mt-4 cursor-pointer' onClick={handleAI}>
        Ask AI
      </Button>
        {loading && 

          <div className='m-2 w-full grid place-content-center'>
              <Audio
              height="80"
              width="80"
              radius="9"
              color="#7C3AED"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
              
            />

          </div>
        }
        { error && <h1>{error.message}</h1>}
        {
            data && (
                <div className='bg-muted p-4 rounded-lg my-4'>
                    <p className='text-base max-w-full'>{data}</p>
                </div>
            )
        }

    </div>
  )
}

export default AIHelper
