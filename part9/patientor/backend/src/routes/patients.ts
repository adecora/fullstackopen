import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id);

    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatientEntry = toNewPatientEntry(req.body);

        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req, res) => {
    const patient = patientService.findById(req.params.id);

    if (patient) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const newEntry = toNewEntry(req.body);

            const addedEntry = patientService.addEntry(patient, newEntry);
            res.json(addedEntry);
        } catch (error: unknown) {
            let errorMessage = "Something went wrong.";
            if (error instanceof Error) {
                errorMessage += ' Error: ' + error.message;
            }
            res.status(400).send(errorMessage);
        }
    } else {
        res.sendStatus(404);
    }
});

export default router;