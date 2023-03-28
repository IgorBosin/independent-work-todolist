import React, {ChangeEvent, FC, useState} from 'react';
import {tasksType} from "./App";
import './App.css'

type TodolistType = {
    tasks: tasksType[]
    title: string
    getFilteredTasks: (filt: string) => void
    removeTask: (taskId: string) => void
    changeChekedTask: (taskId: string, newIsDone: boolean) => void
    addTask: (newTitleTask: string) => void
    filter: string
}

export const Todolist: FC<TodolistType> = (
    {
        tasks,
        title,
        getFilteredTasks,
        removeTask,
        changeChekedTask,
        addTask,
        filter,
        ...otherProps
    }) => {

    const [titleInput, setTitleInput] = useState('')
    const [error, setError] = useState('')

    const onClickCreator = (filt: string) => {
        getFilteredTasks(filt)
    }

    const onClickHandler = () => {
        if (titleInput.trim()) {
            addTask(titleInput.trim())
            setTitleInput('')
        } else setError('title cannot be empty')

    }

    const changeTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length < 15) {
            setTitleInput(e.currentTarget.value)
            setError('')
        } else setError('title cannot exceed 15 characters')
    }

    const TaskDisplay = tasks.map(el => {

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
    })


    return (
        <div>
            <h3>{title}</h3>
            <input placeholder={'enter name for new task'} value={titleInput} onChange={changeTitleInput}/>
            <button disabled={Boolean(error)} onClick={onClickHandler}>+</button>
            {error && <div style={{color: "red"}}>{error}</div>}

            <ul>
                {tasks.length ? TaskDisplay : 'task list is empty'}
            </ul>
            <button className={filter === 'all' ? 'activeButton' : ''} onClick={() => onClickCreator('all')}>All
            </button>
            <button className={filter === 'completed' ? 'activeButton' : ''}
                    onClick={() => onClickCreator('completed')}>Completed
            </button>
            <button className={filter === 'active' ? 'activeButton' : ''}
                    onClick={() => onClickCreator('active')}>Active
            </button>
        </div>
    );
};

