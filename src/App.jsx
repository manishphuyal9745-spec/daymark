import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm.jsx'
import StatsBar from './components/StatsBar.jsx'
import FilterBar from './components/FilterBar.jsx'
import TaskList from './components/TaskList.jsx'
import './App.css'

const CATEGORIES = ['Work', 'Personal', 'Urgent', 'Study']
const STORAGE_KEY = 'daymark-tasks'
const THEME_KEY = 'daymark-theme'

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function isOverdue(task) {
  if (task.completed || !task.dueDate) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(task.dueDate)
  return due < today
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [statusFilter, setStatusFilter] = useState('all') // all | active | completed
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'light')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  function addTask(task) {
    setTasks((prev) => [
      { id: crypto.randomUUID(), completed: false, ...task },
      ...prev,
    ])
  }

  function updateTask(id, updates) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function toggleComplete(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function reorderTasks(fromId, toId) {
    setTasks((prev) => {
      const fromIndex = prev.findIndex((t) => t.id === fromId)
      const toIndex = prev.findIndex((t) => t.id === toId)
      if (fromIndex === -1 || toIndex === -1) return prev
      const next = [...prev]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return next
    })
  }

  const visibleTasks = tasks.filter((t) => {
    if (statusFilter === 'active' && t.completed) return false
    if (statusFilter === 'completed' && !t.completed) return false
    if (categoryFilter !== 'all' && t.category !== categoryFilter) return false
    return true
  })

  const remaining = tasks.filter((t) => !t.completed).length
  const completed = tasks.filter((t) => t.completed).length
  const overdue = tasks.filter(isOverdue).length
  const total = tasks.length

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <div>
          <p className="eyebrow">PERSONAL TASKS</p>
          <h1 className="brand">Daymark</h1>
        </div>
        <div className="header-right">
          <div className="summary">
            <span>{remaining} remaining</span>
            <span>{completed} completed</span>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      <main className="main">
        <TaskForm categories={CATEGORIES} onAdd={addTask} />

        <section className="task-section">
          <StatsBar remaining={remaining} completed={completed} overdue={overdue} total={total} />
          <FilterBar
            categories={CATEGORIES}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
          <TaskList
            tasks={visibleTasks}
            onToggle={toggleComplete}
            onDelete={deleteTask}
            onUpdate={updateTask}
            onReorder={reorderTasks}
            isOverdue={isOverdue}
          />
          <p className="hint">Tasks are saved in this browser. Drag a task to reorder the list.</p>
        </section>
      </main>
    </div>
  )
}
