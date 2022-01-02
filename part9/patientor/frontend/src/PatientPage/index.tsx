import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon, Card, SemanticICONS, Button } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetail, addEntry } from "../state";
import { Patient, Entry } from "../types";
import EntryDetails from "../EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryWithoutId } from "../AddEntryModal/AddEntryForm";

interface GenderIcon {
    "male": SemanticICONS,
    "female": SemanticICONS,
    "other": SemanticICONS
}

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patientDetail }, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

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

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryWithoutId) => {
        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(addEntry(patientDetail as Patient, newEntry));
            closeModal();
        } catch (error: unknown) {
            let errorMessage = 'Something went wrong.';
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = `${error.response.data as string}`;
            }
            setError(errorMessage);
        }
    };

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
                        <Card.Content extra>
                            <AddEntryModal
                                modalOpen={modalOpen}
                                onSubmit={submitNewEntry}
                                error={error}
                                onClose={closeModal}
                            />
                            <Button onClick={() => openModal()}>Add New Entry</Button>
                        </Card.Content>
                    </Card>
                    <h2>entries</h2>
                    <Card.Group>
                        {patientDetail.entries &&
                            patientDetail.entries.map(entry => (
                                <EntryDetails key={entry.id} entry={entry} />
                            ))
                        }
                    </Card.Group>
                </div>)
            }
        </div>
    );
};

export default PatientPage;