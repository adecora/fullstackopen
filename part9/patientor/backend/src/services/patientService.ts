import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';

import { PatientView, PatientEntry, NewPatientEntry } from '../types';

const getEntries = (): PatientView[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
    const id = uuid();

    const newPatientEntry = {
        id,
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addEntry
};