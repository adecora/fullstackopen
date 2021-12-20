interface bodyMassValues {
    height: number;
    weight: number;
}

const parseArguments = (args: Array<string>): bodyMassValues => {
    if (args.length !== 4) throw new Error('Bad usage: npm run calculateBmi <height(cm)> <weight(kg)>');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }

}

const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = Number((weight / (height / 100) ** 2).toFixed(1));

    if (bmi < 16.0) {
        return 'Underweight (Severe thinness)';
    } else if (bmi <= 18.4) {
        return 'Underweight (thinness)';
    } else if (bmi <= 24.9) {
        return 'Normal (healthy weight)';
    } else if (bmi <= 29.9) {
        return 'Overweight  (Pre-obese)';
    } else if (bmi <= 39.9) {
        return 'Obese';
    } else {
        return 'Obese (Class III)';
    }
}

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}