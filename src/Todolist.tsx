import React, {ChangeEvent, FC, RefObject, useRef} from 'react';
import {tasksType} from "./App";

type TodolistType = {
    tasks: tasksType[]
    title: string
    getFilteredTasks: (filt: string) => void
    removeTask: (taskId: string) => void
    changeChekedTask: (taskId: string, newIsDone: boolean) => void
    addTask: (newTitleTask: string) => void
}

export const Todolist: FC<TodolistType> = (
    {
        tasks,
        title,
        getFilteredTasks,
        removeTask,
        changeChekedTask,
        addTask,
        ...otherProps
    }) => {

    const addTaskInput: RefObject<HTMLInputElement> = useRef(null)

    const onClickCreator = (filt: string) => {
        getFilteredTasks(filt)
    }

    const onClickHandler = () => {
        // if(addTaskInput.current?.value)
        if (addTaskInput.current) {
            addTask(addTaskInput.current.value)
            addTaskInput.current.value = ''
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <input ref={addTaskInput}/>
            <button onClick={onClickHandler}>+</button>
            <ul>
                {tasks.map(el => {

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeChekedTask(el.id, e.currentTarget.checked)
                    }

                    return (
                        <li key={el.id}>
                            <button onClick={() => removeTask(el.id)}>X</button>
                            <input onChange={onChangeHandler}
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

