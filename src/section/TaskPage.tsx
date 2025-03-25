import TaskDetail from '@/components/TaskDetail';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getTaskbyId } from '@/store/taskSlice';

const TaskPage = () => {


    const { id } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTaskbyId(id))
    }, [id])

    return <TaskDetail id={id!} />
};

export default TaskPage;
