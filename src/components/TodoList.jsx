import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function TodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { text, completed: false }]);
  };

  const toggleTodoCompletion = (index) => {
    const updatedTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((todo, i) => i !== index);
    setTodos(updatedTodos);
  };

  const deleteSelectedTodos = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <AddTodo onAddTodo={addTodo} />
      <h2 className='text-center text-2xl font-semibold mt-5 mb-5'>Todos</h2>
      <ul>
        {todos.map((todo, index) => (
          <li className='flex items-center' key={index}>
            <input className='mr-3'
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => toggleTodoCompletion(index)} 
            /> 
            {todo.text}
            <button className='bg-none border-none cursor-pointer ml-3'
              onClick={() => deleteTodo(index)} 
            >
           <FontAwesomeIcon icon={faTrash} className='text-red-400' />
            </button>
          </li>
        ))}
      </ul>
      <button className='bg-red-500 text-white border-none p-3 mt-5 cursor-pointer rounded-lg'
        onClick={deleteSelectedTodos} 
      >
        Delete Selected Todos
      </button>
    </div>
  );
}



