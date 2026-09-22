# Daymark — Personal Task Manager

Daymark is a personal to-do application built with React. It helps a user add, organise, and track daily tasks by category, due date, and completion status. Tasks are saved in the browser with `localStorage`, so the list is still there after a page refresh.

**GitHub repository:** [https://github.com/manishphuyal9745-spec/daymark](https://github.com/manishphuyal9745-spec/daymark)

## Features implemented

- Add a task with title, category (Work / Personal / Urgent / Study), and optional due date
- Edit a task title inline
- Delete a task
- Mark a task as complete or incomplete
- Filter tasks by status: All / Active / Completed
- Filter tasks by category
- Live counts: Remaining, Completed, Overdue, and Total
- Overdue highlight when a due date is in the past and the task is not completed
- Drag-and-drop to reorder tasks
- Light / dark theme toggle (saved in `localStorage`)
- Persist all tasks in `localStorage`
- Empty state when a filter has no matching tasks
- Form validation when the title is empty
- Responsive layout for desktop and mobile widths

## Technologies / libraries used

- React 18 (functional components only)
- React hooks: `useState`, `useEffect`
- Vite 5 (dev server and production build)
- Plain CSS (no UI framework)
- Browser `localStorage` (no backend)

## Setup instructions

1. Install [Node.js](https://nodejs.org) (v18 or later).
2. Open a terminal in the project folder.
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the URL shown in the terminal (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## Screenshots

**1. Main dashboard (light theme)**

![Daymark dashboard light theme](screenshots/dashboard-light.png)

**2. Dark theme**

![Daymark dashboard dark theme](screenshots/dashboard-dark.png)

**3. Mobile layout**

![Daymark mobile layout](screenshots/mobile.png)

## Project structure

```
daymark/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── screenshots/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── components/
        ├── TaskForm.jsx
        ├── StatsBar.jsx
        ├── FilterBar.jsx
        ├── TaskList.jsx
        └── TaskItem.jsx
```

## Known limitations

- Data is stored only in this browser (`localStorage`). It does not sync across devices.
- Inline edit currently changes the **title** only. Category and due date are set when the task is added.
- Drag-and-drop uses the HTML5 drag API, so it works best with a mouse. On a phone it is less convenient.
- There is no user account or backend. Clearing browser data deletes the tasks.

## Course mapping

This project is **Option 1: Personal Task Manager (To-Do App)** from the React Course Project assignment. Core features and the three stretch goals (drag-and-drop, due dates / overdue, dark/light theme) are implemented.
