import { useState } from 'react'

function formatDate(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function TaskItem({
  task,
  overdue,
  onToggle,
  onDelete,
  onUpdate,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(task.title)

  function saveEdit() {
    if (draftTitle.trim()) {
      onUpdate(task.id, { title: draftTitle.trim() })
    }
    setIsEditing(false)
  }

  return (
    <div
      className={`card task-item ${overdue ? 'overdue' : ''}`}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <span className="drag-handle" aria-hidden="true">⠿</span>

      <button
        className={`checkbox ${task.completed ? 'checked' : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label="Toggle complete"
      >
        {task.completed && '✓'}
      </button>

      <div className="task-body">
        {isEditing ? (
          <input
            className="edit-input"
            value={draftTitle}
            autoFocus
            onChange={(e) => setDraftTitle(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
          />
        ) : (
          <p className={`task-title ${task.completed ? 'done' : ''}`}>
            {task.title} <span className="chip">{task.category}</span>
          </p>
        )}
        <p className={`task-date ${overdue ? 'overdue-text' : ''}`}>
          {overdue ? 'Overdue · ' : ''}
          {task.dueDate ? `Due ${formatDate(task.dueDate)}` : 'No due date'}
        </p>
      </div>

      <button className="icon-btn" onClick={() => setIsEditing(true)} aria-label="Edit">
        ✎
      </button>
      <button className="icon-btn" onClick={() => onDelete(task.id)} aria-label="Delete">
        🗑
      </button>
    </div>
  )
}
