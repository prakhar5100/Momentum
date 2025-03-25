import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const AllTasks = () => {

  const task = useSelector((state) => state.task.tasks)

  const [tasks, setTasks] = useState([])
  const [priority, setPriority] = useState([])
  const [progress, setProgress] = useState([])
  const [completed, setCompleted] = useState([])
  const [expired, setExpiredTasks] = useState([])

  const urgencyColors = {
    high: "#FF4C4C",      
    moderate: "#FFA500",  
    low: "#4CAF50"        
  }


  useEffect(() => {
    const today = new Date()
    const todayMidnight = new Date(today.setHours(0, 0, 0, 0)); 
    const sortedTasks = task
  .filter(task => (new Date(task.deadline) >= todayMidnight && task.status !== 'Completed')) 
  .sort((a, b) => new Date(a.deadline) - new Date(b.deadline)) 
  .map(task => {
    const deadlineDate = new Date(task.deadline);
    const diffDays = Math.floor((deadlineDate - todayMidnight) / (1000 * 60 * 60 * 24)); 
    return { ...task, deadline: `In ${diffDays} days` };
  });

  setTasks(sortedTasks)

  const priorityTasks = task.filter((tsk) => tsk.urgency === "high").map(task => {
    const deadlineDate = new Date(task.deadline);
    const diffDays = Math.floor((deadlineDate - todayMidnight) / (1000 * 60 * 60 * 24)); 
    const text = diffDays >= 0 ? `In ${diffDays} days` : `Past ${-diffDays} days`
    return { ...task, deadline: text };
  });
  setPriority(priorityTasks) 

  const progressTasks = task.filter((tsk) => tsk.status === "In Progress").map(task => {
    const deadlineDate = new Date(task.deadline);
    const diffDays = Math.floor((deadlineDate - todayMidnight) / (1000 * 60 * 60 * 24)); 
    const text = diffDays >= 0 ? `In ${diffDays} days` : `Past ${-diffDays} days`
    return { ...task, deadline: text };
  });
  setProgress(progressTasks)

  const completedTasks = task.filter((tsk) => tsk.status === "Completed").map(task => {
    const deadlineDate = new Date(task.deadline);
    const diffDays = Math.floor((deadlineDate - todayMidnight) / (1000 * 60 * 60 * 24)); 
    const text = diffDays >= 0 ? `In ${diffDays} days` : `Past ${-diffDays} days`
    return { ...task, deadline: text };
  });
  setCompleted(completedTasks)

  const expiredTasks = task.filter((tsk) => (new Date(tsk.deadline) < today && tsk.status !== 'Completed'))
  setExpiredTasks(expiredTasks)

  }, [task])

  console.log(progress)

  return (
    <div className='lg:px-8'>
      <h1 className='text-3xl font-bold text-center mt-8'>All Tasks</h1>


      <div className='p-4 mt-4'>
         <h1 className='text-xl font-semibold'> Expiring Deadlines </h1>

         <div className='gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-white mt-4'>
              {tasks && tasks.map((task, index) =>{
          
          const color = task.urgency
          return (

            <Link to={`/tasks/id/${task.id}`}>
          <div key={index} className='bg-primary p-6 rounded-lg min-h-64 flex flex-col justify-between gap-6 relative'>

            <div className='flex flex-col gap-6'>
            <h1 className='text-xl font-bold text-center'>{task.title} </h1>
            <h2 className=''>{task.description} </h2>
            </div>

            <div className='flex justify-between'>
              <h1 style={{backgroundColor : urgencyColors[color]}} className=' capitalize w-max p-2 rounded-lg hover:cursor-pointer'> {task.urgency}
              </h1>

              <div className='flex gap-2 p-2'>
              <Clock /> 
              {task.deadline === 'In 0 days' ? `Today` : task.deadline}
              </div>
            </div>
          </div>
          </Link>
        )})}
         </div>
         
      </div>


      <div className='p-4 mt-4'>
         <h1 className='text-xl font-semibold'> High Priority Tasks </h1>

         <div className='gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-white mt-4'>
              {priority ?  priority.map((task, index) =>{
          
          return (
            <Link to={`/tasks/id/${task.id}`}>

          <div key={index} className='bg-red-500 p-6 rounded-lg min-h-64 flex flex-col justify-between gap-6 relative'>

            <div className='flex flex-col gap-6'>
            <h1 className='text-xl font-bold text-center'>{task.title} </h1>
            <h2 className=''>{task.description} </h2>
            </div>

            <div className='flex justify-between'>
              <h1 style={{backgroundColor : 'white'}} className=' capitalize w-max p-2 rounded-lg hover:cursor-pointer text-black'> {task.urgency}
              </h1>

              <div className='flex gap-2 p-2'>
              <Clock /> 
              {task.deadline === 'In 0 days' ? `Today` : task.deadline}
              </div>
            </div>
          </div>

          </Link>
        )} ) :  <h1 className='text-base text-center font-semibold text-black'> No tasks found!</h1>}
         </div>
         
      </div>

      <div className='p-4 mt-4'>
         <h1 className='text-xl font-semibold'> In Progress Tasks </h1>

         <div className='gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-white mt-4'>
              {progress ?  progress.map((task, index) =>{
          
          const color = task.urgency
          return (

            <Link to={`/tasks/id/${task.id}`}>

          <div key={index} className='bg-amber-400 p-6 rounded-lg min-h-64 flex flex-col justify-between gap-6 relative'>

            <div className='flex flex-col gap-6'>
            <h1 className='text-xl font-bold text-center'>{task.title} </h1>
            <h2 className=''>{task.description} </h2>
            </div>

            <div className='flex justify-between'>
              <h1 style={{backgroundColor : urgencyColors[color]}} className=' capitalize w-max p-2 rounded-lg hover:cursor-pointer'> {task.urgency}
              </h1>

              <div className='flex gap-2 p-2'>
              <Clock /> 
              {task.deadline === 'In 0 days' ? `Today` : task.deadline}
              </div>
            </div>
          </div>

          </Link>
        )} ) :  <h1 className='text-base text-center font-semibold'> No tasks found!</h1>}
         </div>
         
      </div>

      <div className='p-4 mt-4'>
         <h1 className='text-xl font-semibold'> Completed Tasks </h1>

         <div className='gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-white mt-4'>
              {completed ?  completed.map((task, index) =>{
          
          const color = task.urgency
          return (
            <Link to={`/tasks/id/${task.id}`}>

          <div key={index} className='bg-green-600 p-6 rounded-lg min-h-64 flex flex-col justify-between gap-6 relative'>

            <div className='flex flex-col gap-6'>
            <h1 className='text-xl font-bold text-center'>{task.title} </h1>
            <h2 className=''>{task.description} </h2>
            </div>

            <div className='flex justify-between'>
              <h1 style={{backgroundColor : urgencyColors[color]}} className=' capitalize w-max p-2 rounded-lg hover:cursor-pointer'> {task.urgency}
              </h1>

              <div className='flex gap-2 p-2'>
              <Clock /> 
              {task.deadline === 'In 0 days' ? `Today` : task.deadline}
              </div>
            </div>
          </div>

          </Link>
        )} ) :  <h1 className='text-base text-center font-semibold'> No tasks found!</h1>}
         </div>
         
      </div>

      <div className='p-4 mt-4'>
         <h1 className='text-xl font-semibold'> Expired Tasks </h1>

         <div className='gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-white mt-4'>
              {expired.length > 0 ?  expired.map((task, index) =>{
          
          const color = task.urgency
          return (
            <Link to={`/tasks/id/${task.id}`}>

          <div key={index} className='bg-gray-500 p-6 rounded-lg min-h-64 flex flex-col justify-between gap-6 relative'>

            <div className='flex flex-col gap-6'>
            <h1 className='text-xl font-bold text-center'>{task.title} </h1>
            <h2 className=''>{task.description} </h2>
            </div>

            <div className='flex justify-between'>
              <h1 style={{backgroundColor : urgencyColors[color]}} className=' capitalize w-max p-2 rounded-lg hover:cursor-pointer'> {task.urgency}
              </h1>
            </div>
          </div>

          </Link>
        )} ) :  <h1 className='text-base font-semibold text-black'> No tasks found!</h1>}
         </div>
         
      </div>

    </div>


  )
}

export default AllTasks
