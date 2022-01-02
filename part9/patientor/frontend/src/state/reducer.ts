import { State } from "./state";
import { Diagnosis, Patient, Entry } from "../types";

interface NewEntry {
  patient: Patient,
  entry: Entry
}

export type Action =
  | {
    type: "ADD_ENTRY",
    payload: NewEntry
  }
  | {
    type: "SET_DIAGNOSE_LIST",
    payload: Diagnosis[]
  }
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_PATIENT_DETAIL";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_DETAIL":
      return {
        ...state,
        patientDetail: action.payload
      };
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patientDetail: {
          ...action.payload.patient,
          entries: action.payload.patient.entries
            ? action.payload.patient.entries.concat(action.payload.entry)
            : [action.payload.entry]
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload: patientListFromApi
});

export const setPatientDetail = (patientDetailFromApi: Patient): Action => ({
  type: "SET_PATIENT_DETAIL",
  payload: patientDetailFromApi
});

export const addPatient = (newPatient: Patient): Action => ({
  type: "ADD_PATIENT",
  payload: newPatient
});

export const setDiagnoseList = (diagnoseListFromApi: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSE_LIST",
  payload: diagnoseListFromApi
});

export const addEntry = (patient: Patient, entry: Entry): Action => ({
  type: "ADD_ENTRY",
  payload: { patient, entry }
});