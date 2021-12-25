import patients from '../../data/patients';

import { PatientView } from '../types';

const getEntries = (): PatientView[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getEntries
};