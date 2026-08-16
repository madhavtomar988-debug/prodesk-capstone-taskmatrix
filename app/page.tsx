"use client";

import { useState, useEffect } from "react";

type Task = {
  id: number;
  title: string;
  status: "To Do" | "In Progress" | "Review" | "Done";
};

type Project = {
  id: number;
  name: string;
};

type Member = {
  id: number;
  name: string;
  role: string;
};

const initialTasks: Task[] = [
  { id: 1, title: "Design login page", status: "To Do" },
  { id: 2, title: "Create dashboard", status: "In Progress" },
  { id: 3, title: "Build task API", status: "Review" },
  { id: 4, title: "Setup project", status: "Done" },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [sprintName, setSprintName] = useState("Sprint 1");
  const [sprintStart, setSprintStart] = useState("");
  const [sprintEnd, setSprintEnd] = useState("");
  const [sprintLoaded, setSprintLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);

useEffect(() => {
  const savedTasks = localStorage.getItem("taskmatrix_tasks");
  const savedSprint = localStorage.getItem("taskmatrix_sprint");

  if (savedTasks) {
    setTasks(JSON.parse(savedTasks));
  }

  if (savedSprint) {
    const sprint = JSON.parse(savedSprint);

    setSprintName(sprint.sprintName || "Sprint 1");
    setSprintStart(sprint.sprintStart || "");
    setSprintEnd(sprint.sprintEnd || "");
  }

  setLoaded(true);
  setSprintLoaded(true);
}, []);

useEffect(() => {
  if (loaded) {
    localStorage.setItem("taskmatrix_tasks", JSON.stringify(tasks));
  }
}, [tasks, loaded]);

useEffect(() => {
  if (sprintLoaded) {
    localStorage.setItem(
      "taskmatrix_sprint",
      JSON.stringify({
        sprintName,
        sprintStart,
        sprintEnd,
      })
    );
  }
}, [sprintName, sprintStart, sprintEnd, sprintLoaded]);



  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        status: "To Do",
      },
    ]);

    setNewTask("");
  };

  const deleteTask = (id: number) => {
  setTasks((prev) => prev.filter((task) => task.id !== id));
};
  
  const updateTaskStatus = (
  id: number,
  status: Task["status"]
) => {
  setTasks((prev) =>
    prev.map((task) =>
      task.id === id ? { ...task, status } : task
    )
  );
};

  const columns: Task["status"][] = [
    "To Do",
    "In Progress",
    "Review",
    "Done",
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-bold text-cyan-400">TaskMatrix</h1>
          <button className="rounded-lg bg-slate-800 px-4 py-2 text-sm">
            Profile
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <p className="text-sm text-cyan-400">PROJECT MANAGEMENT</p>
          <h2 className="mt-2 text-4xl font-bold">Team Dashboard</h2>
          <p className="mt-2 text-slate-400">
            Plan, track and manage your team&apos;s work.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Projects", "5"],
            ["Total Tasks", String(tasks.length)],
            ["Completed", String(tasks.filter((t) => t.status === "Done").length)],
            ["Sprint Progress", "72%"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-2 text-3xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
          />
          <button
            onClick={addTask}
            className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
          >
            + Add Task
          </button>
        </div>

        <div className="mb-8 rounded-xl border border-slate-800 bg-slate-900 p-5">
  <div className="mb-4 flex items-center justify-between">
    <div>
      <p className="text-sm text-cyan-400">CURRENT SPRINT</p>
      <h3 className="mt-1 text-xl font-bold">{sprintName}</h3>
    </div>

    <span className="text-sm text-slate-400">
      {tasks.filter((task) => task.status === "Done").length} / {tasks.length} completed
    </span>
  </div>

  <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-800">
    <div
      className="h-full bg-cyan-500"
      style={{
        width: `${
          tasks.length
            ? (tasks.filter((task) => task.status === "Done").length /
                tasks.length) *
              100
            : 0
        }%`,
      }}
    />
  </div>

  <div className="grid gap-3 sm:grid-cols-3">
    <input
      value={sprintName}
      onChange={(e) => setSprintName(e.target.value)}
      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
      placeholder="Sprint name"
    />

    <input
      type="date"
      value={sprintStart}
      onChange={(e) => setSprintStart(e.target.value)}
      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
    />

    <input
      type="date"
      value={sprintEnd}
      onChange={(e) => setSprintEnd(e.target.value)}
      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
    />
  </div>
</div>

        <div className="grid gap-5 lg:grid-cols-4">
          {columns.map((column) => (
            <div
              key={column}
              className="min-h-72 rounded-xl border border-slate-800 bg-slate-900 p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">{column}</h3>
                <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-400">
                  {tasks.filter((task) => task.status === column).length}
                </span>
              </div>

              <div className="space-y-3">
                {tasks
                  .filter((task) => task.status === column)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="rounded-lg border border-slate-700 bg-slate-800 p-4"
                    >
                      <p className="font-medium">{task.title}</p>
                      <p className="mt-2 text-xs text-slate-500">
                        Task #{task.id}
                      </p>
                      <button
  onClick={() => deleteTask(task.id)}
  className="mt-3 rounded-md bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-400"
>
  Delete
</button>
                       <select
  value={task.status}
  onChange={(e) =>
    updateTaskStatus(
      task.id,
      e.target.value as Task["status"]
    )
  }
  className="mt-3 w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-white"
>
  <option value="To Do">To Do</option>
  <option value="In Progress">In Progress</option>
  <option value="Review">Review</option>
  <option value="Done">Done</option>
</select>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}