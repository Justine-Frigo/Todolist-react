import './index.css'
import React from 'react';
import TodoList from './components/TodoList';


export default function App() {
  return (
    <div className='flex flex-col items-center max-w-xl mt-12 m-auto p-7 rounded-xl bg-[#D3E6EC]'>
      <h1 className='text-center text-4xl font-bold mb-5 text-[#4995ac]'>My Todo List</h1>
      <TodoList />
    </div>
  );
}




