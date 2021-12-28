import { State } from "./state";
import { Patient } from "../types";

export type Action =
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