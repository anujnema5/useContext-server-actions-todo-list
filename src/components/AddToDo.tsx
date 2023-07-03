"use client";
import { useTodos } from '@/store/todos';
import React, { FC, FormHTMLAttributes, useRef, useState } from 'react';

interface Props {
  // Add your prop types here
}

const AddToDo: FC<Props> = () => {
  const todoOperations = useTodos();
  const inputRef = useRef<HTMLFormElement>(null);

  async function action(data: FormData) {
    const task = data.get('todo');

    if (task && typeof task === 'string') {
      todoOperations?.handleAddTodo(task);
    }

    inputRef.current?.reset();
  }


  return (
    <form action={action} ref={inputRef} className='flex gap-1'>
      <input type="text" placeholder='Write your todo' name='todo' className='text-gray-900 rounded-md px-2' />
      <button type="submit" className='border rounded-md px-2'>ADD</button>
    </form>
  );
};

export default AddToDo;
