import { completeTask, deleteTask, getTaskbyId } from "@/store/taskSlice"
import { Calendar, Edit2, Trash } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Checkbox } from "./ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import EditTask from "./EditTask"
import AIHelper from "./AIHelper"
const TaskDetail = ({id} : {id : string}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    dispatch(getTaskbyId(id))   
    const task = useSelector((state) => state.task.selectedTask)

    if (!task) {
        return <h1> No tasks found</h1>
    }

    const date : Date = task.deadline
    const urgencyColors = {
        high: "#FF4C4C",      
        moderate: "#FFA500",  
        low: "#4CAF50"        
      }

    const formatDate = (isoDate) => {
        return new Date(isoDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };

      const handleCheckboxChange = () => {
        dispatch(completeTask(id))
        navigate(`/tasks/id/${id}`)
      };


    
  return (
    <div className="h-full w-full bg-muted grid place-content-center px-4">
  
        <div className="bg-white rounded-md p-8 flex flex-col gap-8 my-4 lg:mx-8">


            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                <h1 className="text-base text-slate-400">Task Info</h1>

                <div className="flex gap-2 justify-end align-middle ">


                <EditTask task={task} />
                

                <Dialog>
                <DialogTrigger><Trash size={20} className="hover:cursor-pointer"/></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This will delete your task and is irreversible.
                    </DialogDescription>
                    <Button onClick={() => {
                        dispatch(deleteTask(id))
                        navigate('/')
                    }}>Delete</Button>
                    </DialogHeader>
                </DialogContent>
                </Dialog>


            </div>
                </div>
            <h1 className="text-4xl font-semibold">{task.title}</h1>

            </div>

            <p className="text-slate-600 text-lg">{task.description}</p>

            <div className="flex gap-4 justify-between max-sm:flex-col">

                <div  style={{ backgroundColor : `${task.status === "Completed" ? `#16a34a` : `var(--primary)`}`}}
                 className="text-white w-max p-2 rounded-lg text-lg px-4">
                    {task.status}
                </div>


                <div style={{backgroundColor : urgencyColors[task.urgency]}} className="text-white w-max text-lg 
                p-2 px-4 rounded-lg capitalize">
                    {task.urgency}
                </div>

                <div className="flex p-2 gap-2 text-lg">
                    <Calendar />
                    {formatDate(date)}
                </div>

                <div>

                </div>

            </div>


            {
                task.status !== 'Completed' && 
                <>
                <div className="flex items-center space-x-2 ">
                <Checkbox id="terms" onCheckedChange={handleCheckboxChange} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Mark as Completed
                </label>
                   </div>  
                               <AIHelper task={task} />
                               </>

            }


                  

        </div>
</div>  )
}

export default TaskDetail
