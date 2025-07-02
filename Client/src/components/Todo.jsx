import React, { useEffect, useState } from 'react';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/todo")
            .then(res => res.json())
            .then(data => {
                setTodos(data.todos);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching todos:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="mt-5">
            {loading ? (
                <div>Loading...</div>
            ) : todos.length > 0 ? (
                todos.map(todo => (
                    <div key={todo._id} className='border border-gray-300 rounded-lg p-2 mt-2'>
                        <h3 className="font-bold">{todo.title}</h3>
                        {todo.description && <p>{todo.description}</p>}
                        <p>Importance: {todo.importance}</p>
                        <p>Status: {todo.completed ? '✅ Completed' : '❌ Not Completed'}</p>
                    </div>
                ))
            ) : (
                <div>No todos found</div>
            )}
        </div>
    );
};

export default Todo;
