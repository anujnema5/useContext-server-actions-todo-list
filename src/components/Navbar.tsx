"use client"

import Link from 'next/link';
import React, { FC } from 'react';
import { useSearchParams } from 'next/navigation'
import clsx from 'clsx';

interface Props {
    // Add your prop types here
}

const Navbar: FC<Props> = () => {
    const searchParams = useSearchParams();
    const todosFilter = searchParams.get('todos');
    console.log(todosFilter);


    return (
        <nav className='flex gap-3'>
            <Link href={'/'} className={clsx('bg-gray-800 px-2 rounded-md my-2', todosFilter === null ? 'active' : "")}>All Todo</Link>
            <Link href={'/?todos=active'} className={clsx('bg-gray-800 px-2 rounded-md my-2', todosFilter === "active" ? 'active' : "")}>Active</Link>
            <Link href={'/?todos=completed'} className={clsx('bg-gray-800 px-2 rounded-md my-2', todosFilter === "completed" ? 'active' : "")}>Completed</Link>
        </nav>
    );
};

export default Navbar;
