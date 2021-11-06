import React, { useState } from "react";

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
            <h1>Phonebook</h1>
            <div>
                filter show with <input onChange={handleFilterName} />
            </div>
            <h2>add a new</h2>
            <form onSubmit={addNumber}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number:{" "}
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {personsToShow.map((person) => (
                <div key={person.id}>
                    {person.name} {person.number}
                </div>
            ))}
        </div>
    );
};

export default App;
