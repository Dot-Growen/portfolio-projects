import React, { useState } from 'react';
import CreateArea from './CreateArea'
import Task from './Task'
import Footer from './Footer';


function App() {
  const [tasks, setTasks] = useState([])


  const saveTask = (newTask) => {
    console.log(newTask)
    setTasks(preVTask => {
      return (
        [...preVTask, newTask]
      )
    })
  }

  const deleteTask = (deleteId) => {
    setTasks(preVTasks => {
      return preVTasks.filter((taskItem, index) => {
        return index !== deleteId
      })
    })
  }

  const completed = (id) => {
    for (var i = 0; i < tasks.length; i++) {
      if (id === i) {
        tasks[i].complete = !tasks[i].complete
        setTasks([...tasks])
      }
    }
  }

  return (
    <div>
      <div className="note-section">
        <CreateArea
          onAdd={saveTask}
        />
        {tasks.map((taskItem, index) => {
          return (

            <Task
              key={index}
              id={index}
              onDelete={deleteTask}
              title={taskItem.title}
              content={taskItem.content}
              onDone={completed}
              status={taskItem.complete}
            />
          )
        })}</div>
      <Footer />
    </div>
  );
}

export default App;


//// Components: Create Task
///// Data => Hooks: task - string
///// Props => func(newTask)
///// Method => handleChange for setting a new task, lift state(newTask)&clearing input

//// Components: Task
///// Props => key, id, string, func(deleteId)
///// Method => lift state(deleteId)

//// Components: App
///// Data => Hooks: tasks - array
///// Methods => Map task, Delete task, Update list

