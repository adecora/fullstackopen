import React from "react";
import { Icon, Card } from "semantic-ui-react";

import { OccupationalHealthcareEntry } from "../types";
import DiagnosesList from "./DiagnosesList";

const OccupationlHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date} {" "}
                    <Icon name="stethoscope" size="large" /> {" "}
                    {entry.employerName}
                </Card.Header>
                <Card.Description>
                    {entry.description}
                </Card.Description>
            </Card.Content>
            <DiagnosesList diagnosisCodes={entry.diagnosisCodes} />
        </Card>
    );
};

export default OccupationlHealthcare;

