import { Gender, DiagnoseEntry, HealthCheckRating, Discharge, SickLeave } from "../types";
import { isString, isDate, isSsn, isGender, isDiagnose, isHealthCheck } from "./typeGuards";

export const parseString = (str: unknown): string => {
    if (!str || !isString(str)) {
        throw new Error('Incorrect or missing name: ' + str);
    }

    return str;
};

export const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }

    return date;
};

export const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }

    return ssn;
};

export const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }

    return gender;
};

export const parseDiagnosis = (codes: unknown[]): Array<DiagnoseEntry['code']> => {
    for (const code of codes) {
        if (!isDiagnose(code)) {
            throw new Error('Incorrect code: ' + code);
        }
    }

    return codes as Array<DiagnoseEntry['code']>;
};

export const assertType = (value: never): never => {
    throw new Error(
        'Incorrect or missing type: ' + value
    );
};

export const parseHealtCheck = (check: unknown): HealthCheckRating => {
    if (check === undefined || !isHealthCheck(check)) {
        throw new Error('Incorrect or missing health check: ' + check);
    }

    return check;
};

export const parseDischarge = ({ date, criteria }: { date: unknown, criteria: unknown }): Discharge => {
    if (!date || !criteria || !isString(date) || !isDate(date) || !isString(criteria)) {
        throw new Error(`Incorrect or missing dicharge: ${JSON.stringify({ date, criteria })}`);
    }

    return ({ date, criteria });
};

export const parseSickLeave = ({ startDate, endDate }: { startDate: unknown, endDate: unknown }): SickLeave => {
    if (!startDate || !endDate || !isString(startDate) || !isDate(startDate) || !isString(endDate) || !isDate(endDate)) {
        throw new Error(
            `Incorrect sick leave: ${JSON.stringify({ startDate, endDate })}`
        );
    }

    return ({ startDate, endDate });
};