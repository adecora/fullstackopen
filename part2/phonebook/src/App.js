import React, { useState, useEffect } from "react";
import Notification from "./components/Notification";
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
    const [notification, setNotification] = useState(null);
    const [notificationType, setType] = useState(null);

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
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with a new one?`
                )
            ) {
                const person = persons.find((p) => p.name === newName);
                const newPerson = { ...person, number: newNumber };
                personService
                    .update(person.id, newPerson)
                    .then((returnedPerson) => {
                        setNotification(
                            `${returnedPerson.name} number changed`
                        );
                        setType("notification");
                        setPersons(
                            persons.map((person) =>
                                person.name !== newName
                                    ? person
                                    : returnedPerson
                            )
                        );
                        setNewName("");
                        setNewNumber("");

                        setTimeout(() => {
                            setNotification(null);
                            setType(null);
                        }, 3000);
                    })
                    .catch((error) => {
                        if (error.response.status === 404) {
                            setNotification(
                                `Information of ${person.name} has already been removed from the server`
                            );
                            setPersons(persons.filter((p) => p.id !== person.id));
                        } else if (error.response.status === 400) {
                            setNotification(error.response.data.error);
                        }
                        
                        setType("error");
                        setNewName("");
                        setNewNumber("");

                        setTimeout(() => {
                            setNotification(null);
                            setType(null);
                        }, 3000);
                    });
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber,
            };

            personService
                .create(newPerson)
                .then((returnedPerson) => {
                    setNotification(`Added ${returnedPerson.name}`);
                    setType("notification");
                    setPersons(persons.concat(returnedPerson));
                    setNewName("");
                    setNewNumber("");

                    setTimeout(() => {
                        setNotification(null);
                        setType(null);
                    }, 3000);
                })
                .catch((error) => {
                    setNotification(error.response.data.error);
                    setType("error");
                    setNewName("");
                    setNewNumber("");

                    setTimeout(() => {
                        setNotification(null);
                        setType(null);
                    }, 3000);
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
            <Notification message={notification} type={notificationType} />
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
