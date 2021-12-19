const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = Number((weight / (height / 100) ** 2).toFixed(1))

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

console.log(calculateBmi(180, 74));