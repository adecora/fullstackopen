import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoses';
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('Someone ping the server!');
    res.send('pong');
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.use('/api/diagnoses', diagnoseRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});