import React, {FC} from 'react';
import {tasksType} from "./App";

type TodolistType = {
    tasks: tasksType[]
    title: string
    getFilteredTasks: (filt: string) => void
    removeTask: (taskId: string) => void
    changeChekedTask: (taskId: string) => void
}

export const Todolist: FC<TodolistType> = (
    {
        tasks,
        title,
        getFilteredTasks,
        removeTask,
        changeChekedTask,
        ...otherProps
    }) => {

    const onClickCreator = (filt: string) => {
        getFilteredTasks(filt)
    }


    return (
        <div>
            <h3>{title}</h3>
            <ul>
                {tasks.map(el => {

                    return (
                        <li key={el.id}>
                            <button onClick={() => removeTask(el.id)}>X</button>
                            <input onClick={()=>changeChekedTask(el.id)}
                                   type="checkbox"
                                   checked={el.isDone}/>{el.titleTask}
                        </li>
                    )
                })}
            </ul>
            <button onClick={() => onClickCreator('all')}>All</button>
            <button onClick={() => onClickCreator('completed')}>Completed</button>
            <button onClick={() => onClickCreator('active')}>Active</button>
        </div>
    );
};

