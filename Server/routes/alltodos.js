import express from 'express';
import { alltodos, createTodo, deleteTodo, updateTodo } from '../controllers/todo.js';

const todorouter = express.Router();

todorouter.get('/', alltodos);
todorouter.post('/', createTodo);
todorouter.delete('/:id', deleteTodo);
todorouter.patch('/:id', updateTodo);

export default todorouter;