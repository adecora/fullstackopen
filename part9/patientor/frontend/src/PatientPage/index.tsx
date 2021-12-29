import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon, Card, SemanticICONS } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetail } from "../state";
import { Patient } from "../types";
import EntryDetails from "../EntryDetails";

interface GenderIcon {
    "male": SemanticICONS,
    "female": SemanticICONS,
    "other": SemanticICONS
}

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

    const genderIcon: GenderIcon = {
        "male": "mars",
        "female": "venus",
        "other": "genderless"
    };

    return (
        <div>
            {patientDetail &&
                (<div>
                    <Card>
                        <Card.Content>
                            <Card.Header>
                                {patientDetail.name} {" "}
                                <Icon name={genderIcon[patientDetail.gender]} size="large" />
                            </Card.Header>
                            <Card.Meta>
                                ssn: {patientDetail.ssn}
                            </Card.Meta>
                            <Card.Description>
                                {patientDetail.occupation}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <h2>entries</h2>
                    {patientDetail.entries &&
                        patientDetail.entries.map(entry => (
                            <EntryDetails key={entry.id} entry={entry} />
                        ))
                    }
                </div>)
            }
        </div>
    );
};

export default PatientPage;