class TaskManager {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  add(title, priority = "medium") {
    const task = {
      id: this.nextId++,
      title,
      priority,
      done: false,
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(task);
    return task;
  }

  complete(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new Error(`Task ${id} not found`);
    task.done = true;
    return task;
  }

  remove(id) {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new Error(`Task ${id} not found`);
    return this.tasks.splice(index, 1)[0];
  }

  list(filter = "all") {
    const map = { all: () => true, done: (t) => t.done, pending: (t) => !t.done };
    return this.tasks.filter(map[filter] ?? map.all);
  }

  summary() {
    const total = this.tasks.length;
    const done = this.tasks.filter((t) => t.done).length;
    return { total, done, pending: total - done };
  }
}

const manager = new TaskManager();
manager.add("Buy groceries", "low");
manager.add("Fix login bug", "high");
manager.add("Write tests", "medium");
manager.complete(1);

console.log("Tasks:", manager.list());
console.log("Summary:", manager.summary());
