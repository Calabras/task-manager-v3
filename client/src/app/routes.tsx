import { Routes, Route } from 'react-router-dom';
import TaskListPage from '@/pages/TaskListPage';
import TaskFormPage from '@/pages/TaskFormPage';
import NotFound      from '@/pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"           element={<TaskListPage />} />
      <Route path="/task/new"   element={<TaskFormPage mode="create" />} />
      <Route path="/task/:id"   element={<TaskFormPage mode="edit"   />} />
      <Route path="*"           element={<NotFound />} />
    </Routes>
  );
}