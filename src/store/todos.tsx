"use client";
import { ReactNode, createContext, useContext, useState } from "react";

export const todosContext = createContext<TodosContext | null>(null);

export type Todos = {
    id: string,
    task: string,
    completed: boolean,
    createdAt: Date
}

export type TodosContext = {
    todos: Todos[];
    handleAddTodo: (task: string) => void
    toggleTodoAsCompleted: (id: string) => void
    handleTodoDelete: (id: string) => void
}

export const TodosProvider = ({ children }: { children: ReactNode }) => {

    const [todos, setTodos] = useState<Todos[]>(() => {
        const newTodos = localStorage.getItem('todos') || "[]"
        return JSON.parse(newTodos) as Todos[] //THIS IS CALLED TYPE ASSERTION IN TYPESCRIPT
    })

    const handleAddTodo = (task: string) => {
        setTodos((prev) => {
            const newTodos: Todos[] = [
                {
                    id: Math.random().toString(),
                    task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos
        })
    }

    // IF THE TASK IS COMPLETED
    const toggleTodoAsCompleted = (id: string) => {
        setTodos((prev) => {
            const updatedTodos = prev.map((task) => {
                if (task.id === id) { return { ...task, completed: !task.completed } }
                return task;
            })
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        })
    }

    const handleTodoDelete = (id: string) => {
        setTodos((prev) => {
            const updatedTodos = prev.filter((todo) => {
                return todo.id !== id
            })
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        })
    }

    return (
        <todosContext.Provider value={{ todos, handleAddTodo, toggleTodoAsCompleted, handleTodoDelete }}>
            {children}
        </todosContext.Provider>
    )
}


// Context API
export function useTodos() {
    const todosContextValue = useContext(todosContext);

    if (!todosContext) {
        throw new Error('Usetodos used outside of Provider')
    }

    return todosContextValue;
}