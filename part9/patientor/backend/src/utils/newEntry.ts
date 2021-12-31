import { BaseEntry, Entry, EntryWithoutId, OccupationalHealthcareEntry } from "../types";
import {
    parseDate,
    parseString,
    parseDiagnosis,
    assertType,
    parseHealtCheck,
    parseDischarge,
    parseSickLeave
} from "./parser";


interface BaseFields {
    date: unknown,
    specialist: unknown,
    diagnosisCodes: unknown[],
    description: unknown,
}

const toBaseEntry = (
    { description, date, specialist, diagnosisCodes }: BaseFields
): Omit<BaseEntry, 'id'> => {
    let baseEntry: Omit<BaseEntry, 'id'> = {
        date: parseDate(date),
        specialist: parseString(specialist),
        description: parseString(description)
    };

    if (diagnosisCodes) {
        baseEntry = {
            ...baseEntry,
            diagnosisCodes: parseDiagnosis(diagnosisCodes)
        };
    }

    return baseEntry;
};

interface Fields extends BaseFields {
    type: Entry['type'],
    discharge: {
        date: unknown,
        criteria: unknown
    },
    healthCheckRating: unknown,
    employerName: unknown,
    sickLeave: {
        startDate: unknown,
        endDate: unknown
    }
}

export const toNewEntry = ({
    type,
    date,
    specialist,
    diagnosisCodes,
    description,
    discharge,
    healthCheckRating,
    employerName,
    sickLeave
}: Fields): EntryWithoutId => {
    switch (type) {
        case "HealthCheck":
            return {
                type,
                ...toBaseEntry({ date, description, specialist, diagnosisCodes }),
                healthCheckRating: parseHealtCheck(healthCheckRating)
            };
        case "Hospital":
            return {
                type,
                ...toBaseEntry({ date, description, specialist, diagnosisCodes }),
                discharge: parseDischarge(discharge)
            };
        case "OccupationalHealthcare": {
            let newEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
                type,
                ...toBaseEntry({ date, description, specialist, diagnosisCodes }),
                employerName: parseString(employerName)
            };

            if (sickLeave) {
                newEntry = {
                    ...newEntry,
                    sickLeave: parseSickLeave(sickLeave)
                };
            }

            return newEntry;
        }
        default:
            return assertType(type);
    }
};