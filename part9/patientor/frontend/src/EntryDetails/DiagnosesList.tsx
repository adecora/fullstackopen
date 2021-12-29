import React from "react";
import { Card, List } from "semantic-ui-react";

import { Diagnosis } from "../types";
import { useStateValue } from "../state";

const DiagnosesList: React.FC<{ diagnosisCodes?: Array<Diagnosis['code']> }> = ({ diagnosisCodes }) => {
    if (!diagnosisCodes) {
        return null;
    }

    const [{ diagnoses },] = useStateValue();

    return (
        <Card.Content extra>
            <List bulleted>
                {diagnosisCodes.map(code => (
                    <List.Item key={code}>{code} {diagnoses[code]?.name}</List.Item>
                ))}
            </List>
        </Card.Content>
    );
};


export default DiagnosesList;