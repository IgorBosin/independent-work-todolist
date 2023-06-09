import React, {useState} from 'react';
import {v1} from "uuid";
import {Todolist} from "./Todolist";

export type tasksType = {
    id: string
    titleTask: string
    isDone: boolean
}

const App = () => {

    const [filter, setFilter] = useState('all')
    const [tasks, setTasks] = useState<tasksType[]>([
        {id: v1(), titleTask: 'CSS', isDone: true},
        {id: v1(), titleTask: 'React', isDone: false},
        {id: v1(), titleTask: 'JS', isDone: true},
    ])

    const addTask = (newTitleTask:string) => {
        const newTask = {id: v1(), titleTask: newTitleTask, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const getFilteredTasks = (filt: string) => {
        setFilter(filt)
    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(el => el.id !== taskId))
    }
    const changeFilter = (filter: string) => {
        return (filter === 'active')
            ? tasks.filter(el => !el.isDone)
            : (filter === 'completed')
                ? tasks.filter(el => el.isDone)
                : tasks
    }
    const changeChekedTask = (taskId: string, newIsDone: boolean) => {
        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: newIsDone} : el))
    }

    const filtredTasks = changeFilter(filter)

    return (
        <div>
            <Todolist
                title={'What to learn'}
                tasks={filtredTasks}
                getFilteredTasks={getFilteredTasks}
                removeTask={removeTask}
                changeChekedTask={changeChekedTask}
                addTask={addTask}
                filter={filter}
            />
        </div>
    );
};

export default App;