import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { editTask, Task } from "@/store/taskSlice"
import { Edit2 } from "lucide-react"
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const EditTask = ({task} : {task : Task}) => {

    const [editedTask, setTask] = useState(task)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOnChange = (id : string, value : string | Date | undefined) => {
        setTask((task) => ({
            ...task,
            [id] : value
        }))
    }
    
  return (
    <div>
          <Popover>
      <PopoverTrigger asChild>
      <Edit2 size={20} className="hover:cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Edit</h4>
            <p className="text-sm text-muted-foreground">
              Edit fields of the task.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                defaultValue={editedTask.title}
                className="col-span-2 h-8"
                onChange={(e) => handleOnChange("title", e.target.value)}
                />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                defaultValue={editedTask.description}
                className="col-span-2 h-8"
                onChange={(e) => handleOnChange("description", e.target.value)}

              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Status</Label>
              <Select onValueChange={(e) => handleOnChange("status", e)}>
              <SelectTrigger className="w-[180px] col-span-2 h-8">
                <SelectValue placeholder={editedTask.status} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="priority">Priority</Label>
              <Select onValueChange={(e) => handleOnChange("urgency", e)}>
              <SelectTrigger className="w-[180px] col-span-2 h-8">
                <SelectValue placeholder={editedTask.urgency}/>
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="high">High</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[180px] justify-start text-left font-normal",
                    !editedTask.deadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {editedTask.deadline ? format(editedTask.deadline, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={editedTask.deadline}
                  onSelect={(date) => handleOnChange("deadline", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            </div>

            <Button onClick={() => {
                dispatch(editTask(editedTask))
                navigate(`/tasks/id/${editedTask.id}/`, { replace: true} )

            }}>
                Edit Task
            </Button>


          </div>
        </div>
      </PopoverContent>
    </Popover>
    </div>
  )
}

export default EditTask
