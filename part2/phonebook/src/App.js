import React, { useState, useEffect } from "react";
import personService from "./services/persons";

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

const Persons = ({ persons, onClick }) => (
    <>
        {persons.map((person) => (
            <div key={person.id}>
                {person.name} {person.number}{" "}
                <button onClick={onClick(person)}>delete</button>
            </div>
        ))}
    </>
);

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filterName, setFilterName] = useState("");

    useEffect(() => {
        personService
            .getAll()
            .then((initialPersons) => setPersons(initialPersons));
    }, []);

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
            };

            personService.create(newPerson).then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson));
                setNewName("");
                setNewNumber("");
            });
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

    const deleteUser = ({ name, id }) => {
        return () => {
            if (window.confirm(`Delete ${name} ?`)) {
                personService.remove(id).then((_) => {
                    setPersons(persons.filter((person) => person.id !== id));
                });
            }
        };
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

            <Persons persons={personsToShow} onClick={deleteUser} />
        </div>
    );
};

export default App;
