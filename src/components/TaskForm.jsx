import { useState } from 'react'

export default function TaskForm({ categories, onAdd }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) {
      setError('Title is required.')
      return
    }
    onAdd({ title: title.trim(), category, dueDate })
    setTitle('')
    setDueDate('')
    setError('')
  }

  return (
    <form className="card add-task-card" onSubmit={handleSubmit}>
      <h2>Add a task</h2>
      {error && <p className="error-text">{error}</p>}

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="What needs to get done?"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
          if (error) setError('')
        }}
      />

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="category">Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="dueDate">Due date</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="btn-primary">
        Add task
      </button>
    </form>
  )
}
