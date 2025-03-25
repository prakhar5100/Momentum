import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Calendar from './Calendar'

const Dashboard = () => {

    const {user} = useSelector((state) => state.auth)
    const task = useSelector((state) => state.task.tasks)

    const [taskStats, setTaskStats] = useState({
      totalProject: 0,
      highPriority: 0,
      inProgress: 0,
      completed: 0,
    });
  
    console.log(task)
    useEffect(() => {
      const totalProject = task.length;
      const highPriority = task.filter(task => task.urgency === 'high').length;
      const inProgress = task.filter(task => task.status === 'In Progress').length;
      const completed = task.filter(task => task.status === 'Completed').length;
  
      setTaskStats({
        totalProject,
        highPriority,
        inProgress,
        completed,
      });
    }, [task]);  return (
    <div>
      
      <h1 className='text-3xl font-bold text-center mt-8'> Hi {user.name}!</h1>

       <div className='gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 text-white mt-4 mx-4'>

          <div className='bg-amber-400 p-3 rounded-lg min-h-64 flex flex-col items-center justify-center gap-6' >
              <h1 className='font-bold text-5xl'>{taskStats.totalProject}</h1>
              <h1 className='font-semibold text-xl'> Total Tasks </h1>
          </div>

          <div className='bg-red-400 p-3 rounded-lg min-h-64 flex flex-col items-center justify-center gap-6'>
              <h1 className='font-bold text-5xl'>{taskStats.highPriority}</h1>
              <h1 className='font-semibold text-xl'> High Priority </h1>
          </div>
          <div className='bg-sky-500 p-3 rounded-lg min-h-64 flex flex-col items-center justify-center gap-6'>
              <h1 className='font-bold text-5xl'>{taskStats.inProgress}</h1>
              <h1 className='font-semibold text-xl'> In Progress </h1>
          </div>
          <div className='bg-green-600 p-3 rounded-lg min-h-64 flex flex-col items-center justify-center gap-6'>
              <h1 className='font-bold text-5xl'>{taskStats.completed}</h1>
              <h1 className='font-semibold text-xl'> Completed </h1>
          </div>


       </div>

       <Calendar />

    </div>
  )
}

export default Dashboard
