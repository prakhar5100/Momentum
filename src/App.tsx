import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './section/Login'
import Register from './section/Register'
import Protected from './auth/Protected'
import Dashboard from './section/Dashboard'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loginSuccess } from './store/authSlice'
import CreateTask from './section/CreateTask'
import { setLocalTask } from './store/taskSlice'
import TaskPage from './section/TaskPage'
import LoaderWrappre from './components/LoaderWrappre'
import TodayTask from './section/TodayTask'
import AllTasks from './section/AllTasks'
import PomodoroTimer from './section/Pomodoro'
import { json } from './lib/json'

const App = () => {

  const dispath = useDispatch()

  useEffect(() => {
    localStorage.setItem("task", json)
    const storedUser = localStorage.getItem("user")
    const storedTasks = localStorage.getItem("task")
    if (storedUser) {
      dispath(loginSuccess(JSON.parse(storedUser)))
    }

    if (storedTasks) {
      dispath(setLocalTask(storedTasks))
    }
  }, [dispath])

  return (
    <Router>

      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Navigate to="/dashboard" replace />} />
        <Route path="/" element={<Protected />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/tasks/create' element={<CreateTask />} />
        <Route path='/tasks/id/:id' element={<LoaderWrappre delay={1000}><TaskPage /></LoaderWrappre>} />
        <Route path='/tasks/today' element={<TodayTask />} />
        <Route path='/tasks/all' element={<AllTasks />} />
        <Route path='/pomodoro' element={<PomodoroTimer />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
