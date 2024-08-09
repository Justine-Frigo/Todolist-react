import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import DraggableTodoList from './DraggableTodoList';

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
      <h2 className='text-center text-2xl font-semibold mt-5 mb-5 text-[#4995ac]'>Todos</h2>
      <DraggableTodoList 
        todos={todos} 
        setTodos={setTodos} 
        toggleTodoCompletion={toggleTodoCompletion} 
        deleteTodo={deleteTodo} 
        deleteSelectedTodos={deleteSelectedTodos} 
      />
    </div>
  );
}


