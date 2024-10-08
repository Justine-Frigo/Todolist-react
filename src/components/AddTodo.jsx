import React, { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() === '') return;

    onAddTodo(newTodo);
    setNewTodo('');
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input className='border border-gray-300 p-3 mr-4 rounded-lg'
          type="text" 
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Type a new todo"
        />
        <button className='bg-[#4995ac] p-2 m-3 rounded-lg text-slate-50 font-semibold' type="submit">Add Todo</button>
      </form>
    </div>
  );
}



