import { Task } from '@entities/task';

const KEY = 'tasks';

export const loadTasks = (): Task[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
};

export const saveTasks = (tasks: Task[]) =>
  localStorage.setItem(KEY, JSON.stringify(tasks));