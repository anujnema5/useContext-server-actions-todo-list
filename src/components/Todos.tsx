"use client";
import { useTodos } from '@/store/todos';
import { useSearchParams } from 'next/navigation';
import React, { FC } from 'react';

interface Props {
    // Add your prop types here
}

const TODO_ACTIONS = {
    ACTIVE: "active",
    COMPLETED: "completed"
}

const Todos: FC<Props> = () => {
    const todos = useTodos();
    const searchParams = useSearchParams();
    const todosFilter = searchParams.get('todos');

    let _filterTodos = todos?.todos;

    // LOGIC FOR ACTIVE & COMPLETED TODOS
    if (todosFilter === TODO_ACTIONS.ACTIVE) {
        _filterTodos = todos?.todos.filter((todo) => !todo.completed)
    }

    else if (todosFilter === TODO_ACTIONS.COMPLETED) {
        _filterTodos = todos?.todos.filter((todo) => todo.completed)
    }



    return (
        <ul className=''>
            {_filterTodos?.map((todo) => (
                <div className='flex gap-3 my-4'>
                    <li>{todo.task}</li>
                    <input type="checkbox" name="" id={todo.id}
                        onChange={() => todos?.toggleTodoAsCompleted(todo.id)} checked={todo.completed} />
                    <span className=''>{todo.completed ? "Completed" : "not completed"}</span>



                    {
                        todo.completed && (
                            <button type='button' onClick={() => todos?.handleTodoDelete(todo.id)} className='bg-gray-700 px-3 rounded-lg'>Delete</button>
                        )
                    }
                </div>
            ))}
        </ul>
    );
};

export default Todos;
