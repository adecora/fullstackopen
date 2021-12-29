import React from "react";
import { Icon, Card } from "semantic-ui-react";

import { HospitalEnty } from "../types";
import DiagnosesList from "./DiagnosesList";

const HospitalDetail: React.FC<{ entry: HospitalEnty }> = ({ entry }) => {

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date} {" "}
                    <Icon name="hospital outline" size="large" />
                </Card.Header>
                <Card.Description>
                    {entry.description}
                </Card.Description>
            </Card.Content>
            <DiagnosesList diagnosisCodes={entry.diagnosisCodes} />
        </Card>
    );
};

export default HospitalDetail;

