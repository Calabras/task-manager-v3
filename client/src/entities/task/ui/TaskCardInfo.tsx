import { Chip, Stack, Typography } from '@mui/material';
import { Task } from '../model/types';
import dayjs from 'dayjs';

export default function TaskCardInfo({ task }: { task: Task }) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1} pt={1}>
      <Chip label={task.category} size="small" />
      <Chip label={task.status} size="small" color="warning" />
      <Chip label={task.priority} size="small" color="primary" />
      <Typography variant="caption" color="text.secondary">
        {dayjs(task.createdAt).format('DD.MM.YYYY')}
      </Typography>
    </Stack>
  );
}