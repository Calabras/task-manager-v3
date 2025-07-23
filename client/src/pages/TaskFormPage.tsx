import { Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '@features/task-crud/TaskForm';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  createTaskOnServer,
  updateTaskOnServer
} from '@entities/task/model/slice';
import { Task } from '@entities/task/model/types';

export default function TaskFormPage({ mode }: { mode: 'create' | 'edit' }) {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const task = useAppSelector((s) =>
    s.tasks.list.find((t) => t.id === id)
  );

  const handleSubmit = async (values: Omit<Task, 'id' | 'createdAt'>) => {
    if (mode === 'create') {
      await dispatch(createTaskOnServer(values));
    } else if (id) {
      await dispatch(updateTaskOnServer({ ...values, id, createdAt: task!.createdAt }));
    }
    navigate('/');
  };

  if (mode === 'edit' && !task) return <Typography>Задача не найдена</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {mode === 'create' ? 'Новая задача' : 'Редактирование'}
      </Typography>
      <TaskForm
        defaultValues={task}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
      />
    </Container>
  );
}
