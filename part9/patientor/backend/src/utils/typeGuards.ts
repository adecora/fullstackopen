import { DiagnoseEntry, Gender, HealthCheckRating } from "../types";
import diagnoses from "../../data/diagnoses";


export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const isDate = (date: string): boolean => {
    const regex = new RegExp('^\\d{4}-\\d{1,2}-\\d{1,2}$', 'gm');
    return regex.test(date) && Boolean(Date.parse(date));
};

export const isSsn = (ssn: string): boolean => {
    const regex = new RegExp('^\\d{6}-\\d{2,4}[A-Z]*$', 'gm');
    return regex.test(ssn);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isDiagnose = (code: any): code is DiagnoseEntry['code'] => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return diagnoses.map(d => d.code).includes(code);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHealthCheck = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
};