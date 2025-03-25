import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
    id : string,
    title : string,
    deadline : Date,
    urgency : 'High' | 'Moderate' | 'Low',
    description : string,
    status : 'Completed' | 'Pending' | 'In Progress'
}


export interface TaskState {
    tasks : Task[],
    selectedTask? : Task | null
}

const initialState : TaskState = {
    tasks : [],
    selectedTask : null
}

const taskSlice = createSlice({
    name : "task",
    initialState,
    reducers : {

        getTaskbyId : (state, action : PayloadAction<string | undefined>) => {
            state.selectedTask  = state.tasks.find((task) => task.id === action.payload) || null
        },

        setLocalTask : (state, action : PayloadAction<string>) => {
            state.tasks = JSON.parse(action.payload)
        },

        createTask: {
            reducer: (state, action: PayloadAction<Task>) => {
                state.tasks.push(action.payload);
                localStorage.setItem('task', JSON.stringify(state.tasks))
            },
            prepare: (title: string, deadline: Date, urgency: 'High' | 'Moderate' | 'Low', description: string, status: 'Completed' | 'Pending' | 'In Progress') => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        deadline,
                        urgency,
                        description,
                        status
                    }
                };
            }
        },

        editTask : (state, action: PayloadAction<Task>) => {
            const task = state.tasks.find(task => task.id === action.payload.id)
            if (task) {
                task.title = action.payload.title;
                task.description = action.payload.description;
                task.status = action.payload.status;
                task.deadline = action.payload.deadline;
                task.urgency = action.payload.urgency;
              }
            localStorage.setItem('task', JSON.stringify(state.tasks))

        },

        completeTask : (state, action : PayloadAction<string>) => {
            const task = state.tasks.find(task => task.id === action.payload)
            console.log(task)
            if (task) {
                task.status = task.status === 'Completed' ? 'Pending' : 'Completed'
                localStorage.setItem('task', JSON.stringify(state.tasks))
            }
        },

        deleteTask : (state, action : PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
            localStorage.setItem('task', JSON.stringify(state.tasks))
        }
    }
})

export const {createTask, completeTask, deleteTask, setLocalTask, getTaskbyId, editTask} = taskSlice.actions
export default taskSlice.reducer