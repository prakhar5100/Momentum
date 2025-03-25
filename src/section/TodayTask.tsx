import { Clock } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const TodayTask = () => {

  const task = useSelector((state) => state.task.tasks)

  
  const [todayTasks, setTodayTasks] = useState([])

  const isSameDate = (deadline: string, compareDate: Date, status : string) => {
    const deadlineDate = new Date(deadline).toISOString().split("T")[0];
    const compareDateString = compareDate.toISOString().split("T")[0];
  
    return deadlineDate === compareDateString && status !== "Completed";
  };
  
  const urgencyColors = {
    high: "#FF4C4C",      
    moderate: "#FFA500",  
    low: "#4CAF50"        
  }

  useEffect(() => {
      const today = new Date()
      const todayTask = task.filter((task) => isSameDate(task.deadline, today, task.status))
      setTodayTasks(todayTask)
  }, [task])

  console.log(task)
  return (
    <div>
      <h1 className='text-3xl font-bold text-center my-8'>Today's Tasks</h1>

      <h1 className='text-xl text-center font-semibold'> {todayTasks.length} tasks are due today!</h1>

      <div className='gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 text-white mt-4 mx-4'>
      {
        todayTasks && 
        todayTasks.map((task, index) => {
          
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
              Today
              </div>
            </div>
          </div>
          </Link>
        )})
      }
      </div>
    </div>
  )
}

export default TodayTask
