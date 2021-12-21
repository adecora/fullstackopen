interface outputMetrics {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface inputMetrics {
    target: number;
    hours: Array<number>;
}

const processArguments = (args: Array<string>): inputMetrics => {
    if (args.length < 4) throw new Error(`Bad usage: npm run calculateExercises <target> <study_hours>...
    supplied at least one <study_hours>.`);

    const metrics: Array<number> = [];
    for (const arg of args.slice(2)) {
        const value = Number(arg);

        if (isNaN(value)) throw new Error('Provided values were not numbers!');
        if (value > 24) throw new Error(`${value} not too many hours in a day.`);
        metrics.push(value);
    }

    return {
        target: metrics[0],
        hours: metrics.slice(1)
    };
};

export const calculateExercises = (study: Array<number>, target: number): outputMetrics => {
    const periodLength = study.length;
    const trainingDays = study.filter(h => h !== 0).length;
    const average = study.reduce((acc, act) => acc + act) / periodLength;
    const success = average >= target;
    let rating;

    if (success) {
        rating = trainingDays < periodLength ? 2 : 3;
    } else {
        rating = average >= target * 0.8 ? 2 : 1;
    }

    const ratingDescription = rating === 1
        ? 'bad you need to push it harder'
        : rating === 2
            ? 'not too bad but could be better'
            : 'execelent keep it harder';

    return {
        periodLength,
        trainingDays,
        average,
        target,
        rating,
        success,
        ratingDescription
    };
};

if (typeof require !== undefined && require.main === module) {
    try {
        const { target, hours } = processArguments(process.argv);
        console.log(calculateExercises(hours, target));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happens.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}