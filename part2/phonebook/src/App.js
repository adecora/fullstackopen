import React, { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("");

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const addNumber = (event) => {
        event.preventDefault();

        if (persons.map((person) => person.name).includes(newName)) {
            alert(`${newName} is already added to phonebook`);
            setNewName("");
        } else {
            setPersons([...persons, { name: newName }]);
            setNewName("");
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addNumber}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => (
                <div key={person.name}>{person.name}</div>
            ))}
        </div>
    );
};

export default App;
