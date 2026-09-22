import { useState } from 'react'
import TaskItem from './TaskItem.jsx'

export default function TaskList({ tasks, onToggle, onDelete, onUpdate, onReorder, isOverdue }) {
  const [draggedId, setDraggedId] = useState(null)

  if (tasks.length === 0) {
    return <p className="empty-state">No tasks here. Add one above.</p>
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          overdue={isOverdue(task)}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onDragStart={() => setDraggedId(task.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (draggedId && draggedId !== task.id) onReorder(draggedId, task.id)
            setDraggedId(null)
          }}
        />
      ))}
    </div>
  )
}
