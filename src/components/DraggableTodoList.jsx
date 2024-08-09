import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const ItemType = 'TODO';

function DraggableTodoItem({ todo, index, moveTodo, toggleTodoCompletion, deleteTodo }) {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTodo(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li ref={(node) => ref(drop(node))} className="flex items-center mb-2 cursor-pointer bg-[#4995ac] p-3 m-4 rounded-lg text-slate-50 font-semibold">
      <input
        className="mr-3"
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodoCompletion(index)}
      />
    <span className={todo.completed ? 'line-through text-gray-500' : ''}>
        {todo.text}
      </span>
      <button
        className="ml-auto bg-none border-none cursor-pointer"
        onClick={() => deleteTodo(index)}
      >
        <FontAwesomeIcon icon={faTrash} className="text-red-500" />
      </button>
    </li>
  );
}

export default function DraggableTodoList({ todos, setTodos, toggleTodoCompletion, deleteTodo, deleteSelectedTodos }) {
  const moveTodo = (fromIndex, toIndex) => {
    const updatedTodos = Array.from(todos);
    const [movedTodo] = updatedTodos.splice(fromIndex, 1);
    updatedTodos.splice(toIndex, 0, movedTodo);
    setTodos(updatedTodos);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ul>
        {todos.map((todo, index) => (
          <DraggableTodoItem
            key={index}
            index={index}
            todo={todo}
            moveTodo={moveTodo}
            toggleTodoCompletion={toggleTodoCompletion}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
      <div className='flex justify-center'>
      <button
        className="bg-red-500 text-slate-50 border-none p-3 mt-4 cursor-pointer rounded-lg font-semibold"
        onClick={deleteSelectedTodos}
      >
        Delete Selected Todos
      </button>
      </div>
    </DndProvider>
  );
}
