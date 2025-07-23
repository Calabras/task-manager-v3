import { Stack, TextField, MenuItem } from '@mui/material';
import { Status, Category, Priority } from '@entities/task/model/types';

interface Props {
  status?: Status | 'All';
  category?: Category | 'All';
  priority?: Priority | 'All';
  onStatusChange?: (status: Status | 'All') => void;
  onCategoryChange?: (category: Category | 'All') => void;
  onPriorityChange?: (priority: Priority | 'All') => void;
}

const statuses: (Status | 'All')[] = ['All', 'To Do', 'In Progress', 'Done'];
const categories: (Category | 'All')[] = ['All', 'Bug', 'Feature', 'Documentation', 'Refactor', 'Test'];
const priorities: (Priority | 'All')[] = ['All', 'Low', 'Medium', 'High'];

export default function TaskFilters({
  status = 'All',
  category = 'All', 
  priority = 'All',
  onStatusChange = () => {},
  onCategoryChange = () => {},
  onPriorityChange = () => {}
}: Props) {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <TextField
        select
        label="Статус"
        value={status}
        onChange={(e) => onStatusChange(e.target.value as Status | 'All')}
        sx={{ minWidth: 120 }}
      >
        {statuses.map((s) => (
          <MenuItem key={s} value={s}>
            {s === 'All' ? 'Все' : s}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Категория"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as Category | 'All')}
        sx={{ minWidth: 120 }}
      >
        {categories.map((c) => (
          <MenuItem key={c} value={c}>
            {c === 'All' ? 'Все' : c}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Приоритет"
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value as Priority | 'All')}
        sx={{ minWidth: 120 }}
      >
        {priorities.map((p) => (
          <MenuItem key={p} value={p}>
            {p === 'All' ? 'Все' : p}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}