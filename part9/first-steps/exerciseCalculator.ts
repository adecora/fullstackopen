interface studyMetrics {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (study: Array<number>, target: number): studyMetrics => {
    const periodLength = study.length
    const trainingDays = study.filter(h => h !== 0).length
    const average = study.reduce((acc, act) => acc + act) / periodLength
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
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))