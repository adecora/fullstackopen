import React, { useState } from "react";

const Filter = ({ name, onChange }) => (
    <div>
        filter show with <input value={name} onChange={onChange} />
    </div>
);

const PersonForm = ({
    onSubmit,
    name,
    onChangeName,
    number,
    onChangeNumber,
}) => (
    <form onSubmit={onSubmit}>
        <div>
            name: <input value={name} onChange={onChangeName} />
        </div>
        <div>
            number: <input value={number} onChange={onChangeNumber} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
);

const Persons = ({ persons }) => (
    <>
        {persons.map((person) => (
            <div key={person.id}>
                {person.name} {person.number}
            </div>
        ))}
    </>
);

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filterName, setFilterName] = useState("");

    const personsToShow = !filterName
        ? persons
        : persons.filter((person) =>
              person.name.toLowerCase().includes(filterName)
          );

    const addNumber = (event) => {
        event.preventDefault();

        if (!newName || !newNumber) {
            !newName
                ? alert("name must not be empty")
                : alert("number must not be empty");
        } else if (persons.map((person) => person.name).includes(newName)) {
            alert(`${newName} is already added to phonebook`);
            setNewName("");
            setNewNumber("");
        } else {
            const newPerson = {
                name: newName,
                number: newNumber,
                id: persons.length + 1,
            };
            setPersons(persons.concat(newPerson));
            setNewName("");
            setNewNumber("");
        }
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilterName = (event) => {
        setFilterName(event.target.value.toLowerCase());
    };

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter name={filterName} onChange={handleFilterName} />

            <h3>Add a new</h3>

            <PersonForm
                onSubmit={addNumber}
                name={newName}
                onChangeName={handleNameChange}
                number={newNumber}
                onChangeNumber={handleNumberChange}
            />

            <h3>Numbers</h3>

            <Persons persons={personsToShow} />
        </div>
    );
};

export default App;
