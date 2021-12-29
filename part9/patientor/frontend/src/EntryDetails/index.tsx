import React from "react";

import { Entry } from "../types";
import { assertNever } from "../utils";
import HealthCheckDetail from "./HealthCheckDetail";
import OccupationlHealthcare from "./OccupationlHealthcare";
import HospitalDetail from "./HospitalDetail";

const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalDetail entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationlHealthcare entry={entry} />;
        case "HealthCheck":
            return <HealthCheckDetail entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;