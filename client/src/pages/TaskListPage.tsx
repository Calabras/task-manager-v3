import { Container, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskList from '@entities/task/ui/TaskList';
import { Link } from 'react-router-dom';

export default function TaskListPage() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Задачи
      </Typography>

      <Button
        component={Link}
        to="/task/new"
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mb: 2 }}
      >
        Новая задача
      </Button>

      <TaskList />
    </Container>
  );
}