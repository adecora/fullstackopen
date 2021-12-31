import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';

import { PatientView, PatientEntry, NewPatientEntry, Entry, EntryWithoutId } from '../types';

const getEntries = (): PatientView[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const findById = (id: string): PatientEntry | undefined => {
    const patient = patients.find(patient => patient.id === id);
    return patient;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const id = uuid();

    const newPatientEntry = {
        id,
        ...entry,
        entries: []
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntry = (patient: PatientEntry, entry: EntryWithoutId): Entry => {
    const id = uuid();

    const newEntry = {
        id,
        ...entry
    };

    patient.entries.push(newEntry);
    return newEntry;
};

export default {
    getEntries,
    findById,
    addPatient,
    addEntry
};