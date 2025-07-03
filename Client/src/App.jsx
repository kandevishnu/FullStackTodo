import React from 'react'
import Todo from './components/Todo'
import CreateTodo from './components/CreateTodo'

const App = () => {
  return (
    <>
    <div className='text-center text-3xl font-bold text-fuchsia-800'>Todo</div>
    <CreateTodo />
    <Todo />
    </>
  )
}

export default App
