import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  CardActions,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '@entities/task/model/types';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { deleteTaskOnServer } from '@entities/task/model/slice';

export default function TaskItem({ task }: { task: Task }) {
  const dispatch = useAppDispatch();
  const { id, title, description, category, status, priority } = task;

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(deleteTaskOnServer(id));
  };

  return (
    <Card
      component={RouterLink}
      to={`/task/${id}`}
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        transition: 'box-shadow .15s, transform .15s',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
          transform: 'translateY(-2px)'
        },
        textDecoration: 'none'
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" gutterBottom noWrap>
            {title}
          </Typography>

          {/* иконка‑корзина */}
          <Tooltip title="Удалить">
            <IconButton size="small" onClick={handleDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>

        {description && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {description}
          </Typography>
        )}

        <Stack direction="row" spacing={1} pt={2} flexWrap="wrap" rowGap={1}>
          <Chip label={category} size="small" color="default" />
          <Chip label={status}    size="small" color="warning" />
          <Chip label={priority}  size="small" color="primary" />
        </Stack>
      </CardContent>

      {/* кнопка “Редактировать” */}
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          fullWidth
          sx={{ textTransform: 'uppercase' }}
        >
          Редактировать
        </Button>
      </CardActions>
    </Card>
  );
}
