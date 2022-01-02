import React from "react";
import { Modal } from "semantic-ui-react";

import AddEntryForm, { EntryWithoutId } from "./AddEntryForm";


interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryWithoutId) => void;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new entry</Modal.Header>
        <Modal.Content>
            <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
    </Modal>
);

export default AddEntryModal;