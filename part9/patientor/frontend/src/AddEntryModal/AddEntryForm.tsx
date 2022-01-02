import React from "react";
import { Form } from "semantic-ui-react";

import { Entry } from "../types";
import { TypeOption } from "../AddPatientModal/FormField";
import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HospitalForm from "./HospitalForm";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

interface Props {
    onSubmit: (values: EntryWithoutId) => void;
    onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [type, setType] = React.useState<Entry['type']>("Hospital");

    const changeType = ({ target: { value } }: { target: { value: Entry['type'] } }) => {
        setType(value);
    };

    const typeOptions: TypeOption[] = [
        { value: "Hospital", label: "Hospital" },
        { value: "HealthCheck", label: "HealthCheck" },
        { value: "OccupationalHealthcare", label: "OccupationalHealthcare" }
    ];

    return (
        <div>
            <Form style={{ marginBottom: "1em" }}>
                <Form.Field label="Type" control="select" onChange={changeType} name="type" value={type}>
                    {typeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label || option.value}
                        </option>
                    ))}
                </Form.Field>
            </Form>
            {type === "HealthCheck"
                ? <HealthCheckForm onSubmit={onSubmit} onCancel={onCancel} />
                : type === "Hospital"
                    ? <HospitalForm onSubmit={onSubmit} onCancel={onCancel} />
                    : <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onCancel} />
            }
        </div>
    );
};

export default AddEntryForm;