import {
  createSlice,
  createAsyncThunk,
  PayloadAction
} from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { Task, Status, Category, Priority } from './types';
import { api } from '@shared/lib/api';

/* ────────── thunks ────────── */
export const fetchTasks = createAsyncThunk('tasks/fetch', () =>
  api<Task[]>('/tasks')
);

export const createTaskOnServer = createAsyncThunk(
  'tasks/create',
  async (data: Omit<Task, 'id' | 'createdAt'>) =>
    api<Task>('/tasks', { method: 'POST', body: JSON.stringify(data) })
);

export const updateTaskOnServer = createAsyncThunk(
  'tasks/update',
  async (task: Task) =>
    api<Task>(`/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify(task)
    })
);

export const deleteTaskOnServer = createAsyncThunk(
  'tasks/delete',
  async (id: string) => {
    await api<null>(`/tasks/${id}`, { method: 'DELETE' });
    return id; // вернём, чтобы убрать из store
  }
);

/* ────────── slice ────────── */
interface TasksState {
  list: Task[];
  loading: boolean;
  filters: {
    status: Status | 'All';
    category: Category | 'All';
    priority: Priority | 'All';
  };
}
const initialState: TasksState = {
  list: [],
  loading: false,
  filters: { status: 'All', category: 'All', priority: 'All' }
};

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    /* фильтры остались как были */
    setStatusFilter(s, a: PayloadAction<Status | 'All'>) { s.filters.status = a.payload; },
    setCategoryFilter(s, a: PayloadAction<Category | 'All'>) { s.filters.category = a.payload; },
    setPriorityFilter(s, a: PayloadAction<Priority | 'All'>) { s.filters.priority = a.payload; }
  },
  extraReducers: (b) =>
    b
      /* fetch */
      .addCase(fetchTasks.pending, (s) => { s.loading = true; })
      .addCase(fetchTasks.fulfilled, (s, { payload }) => {
        s.loading = false;
        s.list = payload;
      })
      /* create */
      .addCase(createTaskOnServer.fulfilled, (s, { payload }) => {
        s.list.push(payload);
      })
      /* update */
      .addCase(updateTaskOnServer.fulfilled, (s, { payload }) => {
        const i = s.list.findIndex((t) => t.id === payload.id);
        if (i !== -1) s.list[i] = payload;
      })
      /* delete */
      .addCase(deleteTaskOnServer.fulfilled, (s, { payload: id }) => {
        s.list = s.list.filter((t) => t.id !== id);
      })
});

export const {
  setStatusFilter,
  setCategoryFilter,
  setPriorityFilter
} = slice.actions;
export default slice.reducer;
