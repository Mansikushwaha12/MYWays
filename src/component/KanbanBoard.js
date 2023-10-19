// KanbanBoard.js

import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { Draggable } from 'react-draggable';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const socket = socketIOClient('http://localhost:3000');

  useEffect(() => {
    socket.on('new task', (task) => {
      setTasks([...tasks, task]);
    });

    socket.on('task updated', (task) => {
      setTasks((prevTasks) => {
        const taskIndex = prevTasks.findIndex((prevTask) => prevTask.id === task.id);
        prevTasks[taskIndex] = task;
        return prevTasks;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const createTask = (title) => {
    const task = {
      id: Date.now(),
      title,
      status: 'todo',
    };

    socket.emit('create task', task);
  };

  const updateTask = (task) => {
    socket.emit('update task', task);
  };

  const moveTask = (taskId, newStatus) => {
    const task = tasks.find((task) => task.id === taskId);
    task.status = newStatus;

    updateTask(task);
  };

  return (
    <div>
      <h1>Kanban Board</h1>
      <div className="kanban-board">
        <div className="kanban-column">
          <h3>To Do</h3>
          {tasks.filter((task) => task.status === 'todo').map((task) => (
            <Draggable key={task.id} onDragStop={(e, data) => moveTask(task.id, data.dropResult.droppableId)}>
              <div className="kanban-task">
                {task.title}
              </div>
            </Draggable>
          ))}
        </div>
        <div className="kanban-column">
          <h3>In Progress</h3>
          {tasks.filter((task) => task.status === 'in progress').map((task) => (
            <Draggable key={task.id} onDragStop={(e, data) => moveTask(task.id, data.dropResult.droppableId)}>
              <div className="kanban-task">
                {task.title}
              </div>
            </Draggable>
          ))}
        </div>
        <div className="kanban-column">
          <h3>Done</h3>
          {tasks.filter((task) => task.status === 'done').map((task) => (
            <Draggable key={task.id} onDragStop={(e, data) => moveTask(task.id, data.dropResult.droppableId)}>
              <div className="kanban-task">
                {task.title}
              </div>
            </Draggable>
          ))}
        </div>
      </div>
      <button onClick={() => createTask('New Task')}>Create New Task</button>
    </div>
  );
};

export default KanbanBoard;
