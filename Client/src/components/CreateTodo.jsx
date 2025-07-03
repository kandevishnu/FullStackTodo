import React, { useState } from 'react';
import axios from 'axios';

const CreateTodo = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    importance: 'Low',
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/todo', form);
      console.log('Todo added:', res.data);

      // Clear form after submit (optional)
      setForm({
        title: '',
        description: '',
        importance: 'Low',
        completed: false,
      });
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg max-w-md mx-auto">
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="w-full border p-2 rounded"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description (optional)"
        className="w-full border p-2 rounded"
      />
      <select
        name="importance"
        value={form.importance}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="completed"
          checked={form.completed}
          onChange={handleChange}
        />
        Completed
      </label>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
        Add Todo
      </button>
    </form>
  );
};

export default CreateTodo;
