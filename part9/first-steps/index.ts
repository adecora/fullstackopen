import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

interface Body {
    daily_exercises: Array<number>;
    target: number
}

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query['height']);
    const weight = Number(req.query['weight']);

    if (!isNaN(height) && !isNaN(weight)) {
        const bmi = calculateBmi(height, weight);

        res.json({
            weight, height, bmi
        });
    } else {
        res.status(400).json({
            error: 'malformatted parameters'
        });
    }
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body as Body;

    if (
        daily_exercises === undefined ||
        target === undefined
    ) {
        res.status(400).json({
            error: 'parameters missing'
        });
    } else if (
        daily_exercises instanceof Array &&
        daily_exercises.length > 0 &&
        daily_exercises.every(ex => typeof ex === 'number') &&
        typeof target === 'number'
    ) {
        res.json(calculateExercises(daily_exercises, target));
    } else {
        res.status(400).json({
            error: 'malformatted parameters'
        });
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});