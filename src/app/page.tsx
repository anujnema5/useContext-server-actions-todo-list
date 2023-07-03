import AddToDo from '@/components/AddToDo'
import Navbar from '@/components/Navbar'
import Todos from '@/components/Todos'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='p-5 flex flex-col gap-1'>
      <Navbar/>
      <AddToDo/>
      <Todos/>
    </main>
  )
}
