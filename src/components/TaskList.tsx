import React from 'react';
import { Task } from '../types';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdate, onTaskDelete }) => {
  const taskGroups = tasks.reduce((groups, task) => {
    const status = task.completed ? 'Completed' : 'Pending';
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(task);
    return groups;
  }, {} as { [key: string]: Task[] });

  return (
    <div className="kanban-board">
      {Object.keys(taskGroups).map((status) => (
        <div key={status} className="kanban-column">
          <h2>{status}</h2>
          <div className="kanban-tasks">
            {taskGroups[status].map((task) => (
              <div key={task.id} className="kanban-task">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <button onClick={() => onTaskUpdate(task)}>Update</button>
                <button onClick={() => onTaskDelete(task.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
