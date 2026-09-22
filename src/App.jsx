import { useState } from 'react'
import './App.css'

export default function App() {
  const [theme, setTheme] = useState('light')

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <div>
          <p className="eyebrow">PERSONAL TASKS</p>
          <h1 className="brand">Daymark</h1>
        </div>
        <div className="header-right">
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
        <p>Task form and list will go here.</p>
      </main>
    </div>
  )
}
