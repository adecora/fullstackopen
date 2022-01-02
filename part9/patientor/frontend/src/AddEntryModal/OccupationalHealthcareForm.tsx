import React from "react";
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "semantic-ui-react";

import { OccupationalHealthcareEntry, SickLeave } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";

type EntryWithoutId = Omit<OccupationalHealthcareEntry, 'id'>;

interface Props {
    onSubmit: (values: EntryWithoutId) => void;
    onCancel: () => void;
}

const OccupationalHealthcareForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();

    const handleSubmit = ({
        date,
        specialist,
        description,
        type,
        employerName,
        sickLeave
    }: EntryWithoutId) => {
        if (!sickLeave?.startDate && !sickLeave?.endDate) {
            onSubmit({
                date,
                specialist,
                description,
                type,
                employerName
            });
        } else {
            onSubmit({
                date,
                specialist,
                description,
                type,
                employerName,
                sickLeave
            });
        }
    };

    return (
        <Formik
            initialValues={{
                date: "",
                specialist: "",
                description: "",
                type: "OccupationalHealthcare",
                employerName: "",
                sickLeave: {
                    startDate: "",
                    endDate: ""
                }
            }}
            onSubmit={handleSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string | SickLeave } = {};
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.employerName) {
                    errors.employerName = requiredError;
                }
                if (values.sickLeave?.startDate && !values.sickLeave?.endDate) {
                    errors.sickLeave = {
                        startDate: "",
                        endDate: "End date must be also provided"
                    };
                }
                if (!values.sickLeave?.startDate && values.sickLeave?.endDate) {
                    errors.sickLeave = {
                        startDate: "Start date must be also provided",
                        endDate: ""
                    };
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

                return (
                    <Form className="form ui">
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Field
                            label="Employer name"
                            placeholder="Employer name"
                            name="employerName"
                            component={TextField}
                        />
                        <Grid widths='equal'>
                            <Grid.Row style={{ paddingBottom: 0 }} columns={1}>
                                <Grid.Column>
                                    <h3>Sick leave</h3>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                                <Grid.Column floated="left">
                                    <Field
                                        label="Start date"
                                        placeholder="YYYY-MM-DD"
                                        name="sickLeave.startDate"
                                        component={TextField}
                                    />
                                </Grid.Column>
                                <Grid.Column floated="right">
                                    <Field
                                        label="End date"
                                        placeholder="YYYY-MM-DD"
                                        name="sickLeave.endDate"
                                        component={TextField}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}

        </Formik>
    );
};

export default OccupationalHealthcareForm;