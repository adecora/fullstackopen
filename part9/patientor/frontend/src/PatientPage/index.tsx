import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon, Card, SemanticICONS } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetail } from "../state";
import { Patient, Gender } from "../types";
import { assertNever } from "../utils";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patientDetail }, dispatch] = useStateValue();

    React.useEffect(() => {
        const fetchPatientDetail = async () => {
            try {
                const { data: patientDetailFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(setPatientDetail(patientDetailFromApi));
            } catch (error) {
                let errorMessage = 'Something went wrong.';
                if (axios.isAxiosError(error) && error.response) {
                    errorMessage += ` Error: ${error.response.data as string}`;
                }
                console.error(errorMessage);
            }
        };
        id !== patientDetail?.id && void fetchPatientDetail();
    }, [dispatch]);

    const genderIcon = (gender: Gender): SemanticICONS => {
        switch (gender) {
            case Gender.Male:
                return "mars";
            case Gender.Female:
                return "venus";
            case Gender.Other:
                return "genderless";
            default:
                return assertNever(gender);
        }
    };

    return (
        <div style={{ width: 300 }}>
            {patientDetail &&
                (<Card fluid
                    header={<h1>
                        {patientDetail.name}
                        <Icon name={genderIcon(patientDetail.gender)} />
                    </h1>}
                    meta={`ssn: ${patientDetail.ssn || 'no info'}`}
                    description={patientDetail.occupation}
                />)}
        </div>
    );
};

export default PatientPage;