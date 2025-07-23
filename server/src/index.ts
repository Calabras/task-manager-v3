import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import tasksRouter from './routes/tasks';

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/tasks', tasksRouter);

app.listen(PORT, () => console.log(`API 🚀  http://localhost:${PORT}`));
