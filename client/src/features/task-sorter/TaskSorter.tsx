import { TextField, MenuItem } from '@mui/material';
import { useState } from 'react';

export type SortKey = 'created' | 'priority';

export default function TaskSorter({
  onChange
}: {
  onChange: (key: SortKey) => void;
}) {
  const [value, setValue] = useState<SortKey>('created');

  const handle = (k: SortKey) => {
    setValue(k);
    onChange(k);
  };

  return (
    <TextField
      select
      size="small"
      label="Сортировка"
      value={value}
      onChange={(e) => handle(e.target.value as SortKey)}
      sx={{ minWidth: 160, mr: 2 }}
    >
      <MenuItem value="created">По дате</MenuItem>
      <MenuItem value="priority">По приоритету</MenuItem>
    </TextField>
  );
}