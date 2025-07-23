//форма создания/редактирования задачи
import {
  Button,
  Stack,
  TextField,
  MenuItem,
  Paper,
  Typography
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Category,
  Priority,
  Status,
  Task
} from '@entities/task/model/types';
import dayjs from 'dayjs';

const schema = z.object({
  title: z.string().min(1, 'обязательно'),
  description: z.string().optional(),
  category: z.enum(['Bug', 'Feature', 'Documentation', 'Refactor', 'Test']),
  status: z.enum(['To Do', 'In Progress', 'Done']),
  priority: z.enum(['Low', 'Medium', 'High'])
});

type FormValues = z.infer<typeof schema>;

interface Props {
  defaultValues?: Task;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
}

const categories: Category[] = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'];
const statuses: Status[] = ['To Do', 'In Progress', 'Done'];
const priorities: Priority[] = ['Low', 'Medium', 'High'];

export default function TaskForm({ defaultValues, onSubmit, onCancel }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: defaultValues ?? {
      title: '',
      description: '',
      category: 'Feature',
      status: 'To Do',
      priority: 'Medium'
    },
    resolver: zodResolver(schema)
  });

  return (
    <Paper sx={{ p: 3, maxWidth: 600 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Заголовок"
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Описание" multiline minRows={3} />
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField select label="Категория" {...field}>
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField select label="Статус" {...field}>
                {statuses.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <TextField select label="Приоритет" {...field}>
                {priorities.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {defaultValues && (
            <Typography variant="caption" color="text.secondary">
              Создано&nbsp;{dayjs(defaultValues.createdAt).format('DD.MM.YYYY HH:mm')}
            </Typography>
          )}

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={onCancel}>
              Отмена
            </Button>
            <Button variant="contained" type="submit">
              Сохранить
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
