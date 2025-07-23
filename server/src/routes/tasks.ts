import { Router } from 'express';
import { nanoid } from 'nanoid';
import { Task } from '../types.js';

const router = Router();

/** Памятное хранилище (перезапустите — очистится) */
const tasks: Task[] = [];

/** GET /tasks?search= */
router.get('/', (req, res) => {
  const { search } = req.query;
  if (typeof search === 'string' && search.trim()) {
    const s = search.toLowerCase();
    return res.json(tasks.filter((t) => t.title.toLowerCase().includes(s)));
  }
  res.json(tasks);
});

/** GET /tasks/:id */
router.get('/:id', (req, res) => {
  const found = tasks.find((t) => t.id === req.params.id);
  found ? res.json(found) : res.status(404).send('Not found');
});

/** POST /tasks */
router.post('/', (req, res) => {
  const data = req.body as Omit<Task, 'id' | 'createdAt'>;
  const task: Task = { ...data, id: nanoid(), createdAt: new Date().toISOString() };
  tasks.push(task);
  res.status(201).json(task);
});

/** PATCH /tasks/:id */
router.patch('/:id', (req, res) => {
  const idx = tasks.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).send();
  tasks[idx] = { ...tasks[idx], ...req.body };
  res.json(tasks[idx]);
});

/** DELETE /tasks/:id */
router.delete('/:id', (req, res) => {
  const idx = tasks.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).send();
  tasks.splice(idx, 1);
  res.status(204).send();
});

export default router;
