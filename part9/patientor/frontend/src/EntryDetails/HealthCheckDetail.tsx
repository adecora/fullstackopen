import React from "react";
import { Icon, Card, SemanticCOLORS } from "semantic-ui-react";

import { HealthCheckEntry } from "../types";
import DiagnosesList from "./DiagnosesList";

interface HealthColorChecking {
    0: SemanticCOLORS,
    1: SemanticCOLORS,
    2: SemanticCOLORS,
    3: SemanticCOLORS
}

const HealthCheckDetail: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {

    const healthColorChecking: HealthColorChecking = {
        0: "green",
        1: "yellow",
        2: "orange",
        3: "red"
    };

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date} {" "}
                    <Icon name="user md" size="large" />
                </Card.Header>
                <Card.Description>
                    {entry.description}
                </Card.Description>
                <Card.Description>
                    <Icon name="heart" color={healthColorChecking[entry.healthCheckRating]} />
                </Card.Description>
            </Card.Content>
            <DiagnosesList diagnosisCodes={entry.diagnosisCodes} />
        </Card>
    );
};

export default HealthCheckDetail;

