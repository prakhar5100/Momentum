import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask, getTaskbyId } from "@/store/taskSlice";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  
    const [task, setTask] = useState({
        title : '',
        deadline : new Date,
        urgency : '',
        description : '',
        status : '',
    })

    const handleOnChange = (id : string, value : string | Date | undefined) => {
        setTask((task) => ({
            ...task,
            [id] : value
        }))
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newTask = dispatch(createTask(task.title, task.deadline, task.urgency, task.description, task.status)).payload
        dispatch(getTaskbyId(newTask.id))
        navigate(`/tasks/id/${newTask.id}`, { state : { task : newTask}})

    }

  return (
    <div className="bg-muted w-full h-full font-poppins grid place-content-center p-4">
      <form className="flex flex-col gap-10 p-5 bg-white border border-slate-300 rounded-lg lg:px-10" onSubmit={(e) => handleSubmit(e)}> 
      <h1 className="font-bold text-2xl text-center">Create a New Task</h1>

        <div className="flex flex-col gap-3">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="title"
            placeholder="Complete the Homework"
            required
            onChange={(e) => handleOnChange("title", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Type your description here"
           onChange={(e) => handleOnChange("description", e.target.value)}
          />
        </div>

        <div className="flex gap-5 justify-between max-lg:flex-col">
        <div className="flex flex-col gap-3">
            <Label htmlFor="status">Status</Label>

            <Select onValueChange={(e) => handleOnChange("status", e)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pending" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
          <Label htmlFor="priority">Priority</Label>

            <Select onValueChange={(e) => handleOnChange("urgency", e)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Low" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
          <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !task.deadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {task.deadline ? format(task.deadline, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={task.deadline}
                  onSelect={(date) => handleOnChange("deadline", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button className="mx-auto" type="submit">Create Task</Button>
      </form>
    </div>
  );
};

export default CreateTask;
