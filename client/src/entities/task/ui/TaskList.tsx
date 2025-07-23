import { Grid, Stack } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { useEffect } from 'react';
import { fetchTasks } from '@entities/task/model/slice';
import TaskItem from '@entities/task/ui/TaskItem';
import TaskFilters from '@features/task-filters/TaskFilter';     
import TaskSorter, { SortKey } from '@features/task-sorter/TaskSorter';
import {
  setStatusFilter,
  setCategoryFilter,
  setPriorityFilter
} from '@entities/task/model/slice';
import { useMemo, useState } from 'react';

export default function TaskList() {
  const dispatch = useAppDispatch();
  const { list, filters } = useAppSelector((s) => s.tasks);
  
  useEffect(() => { dispatch(fetchTasks()); }, [dispatch]);

  const [sortKey, setSortKey] = useState<SortKey>('created');

  /* фильтрация */
  const filtered = useMemo(
    () =>
      list.filter(
        (t) =>
          (filters.status === 'All' || t.status === filters.status) &&
          (filters.category === 'All' || t.category === filters.category) &&
          (filters.priority === 'All' || t.priority === filters.priority)
      ),
    [list, filters]
  );

  /* сортировка поверх отфильтрованного */
  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sortKey === 'created') {
      return arr.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    if (sortKey === 'priority') {
      const order = { High: 3, Medium: 2, Low: 1 };
      return arr.sort((a, b) => order[b.priority] - order[a.priority]);
    }
    return arr;
  }, [filtered, sortKey]);

  return (
    <>
      {/* блок фильтров + сортировка */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        mb={2}
        flexWrap="wrap"
      >
        <TaskFilters
          status={filters.status}
          category={filters.category}
          priority={filters.priority}
          onStatusChange={(v) => dispatch(setStatusFilter(v))}
          onCategoryChange={(v) => dispatch(setCategoryFilter(v))}
          onPriorityChange={(v) => dispatch(setPriorityFilter(v))}
        />

        {/* селектор сортировки */}
        <TaskSorter onChange={setSortKey} />
      </Stack>

      <Grid container spacing={2}>
        {sorted.map((t) => (
          <Grid item xs={12} sm={6} md={4} key={t.id}>
            <TaskItem task={t} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}