import React from "react";
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "semantic-ui-react";

import { HospitalEnty, Discharge } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";

type EntryWithoutId = Omit<HospitalEnty, 'id'>;

interface Props {
    onSubmit: (values: EntryWithoutId) => void;
    onCancel: () => void;
}

const HospitalForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                date: "",
                specialist: "",
                description: "",
                type: "Hospital",
                discharge: {
                    date: "",
                    criteria: ""
                }
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string | Discharge } = {};
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.discharge.date || !values.discharge.criteria) {
                    errors.discharge = {
                        date: !values.discharge.date ? requiredError : "",
                        criteria: !values.discharge.criteria ? requiredError : ""
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
                        <Grid widths='equal'>
                            <Grid.Row style={{ paddingBottom: 0 }} columns={1}>
                                <Grid.Column>
                                    <h3>Discharge</h3>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                                <Grid.Column floated="left">
                                    <Field
                                        label="Date"
                                        placeholder="YYYY-MM-DD"
                                        name="discharge.date"
                                        component={TextField}
                                    />
                                </Grid.Column>
                                <Grid.Column floated="right">
                                    <Field
                                        label="Criteria"
                                        placeholder="Criteria"
                                        name="discharge.criteria"
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

export default HospitalForm;