import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) || [];
  });
  const [filter, setFilter] = useState('');

  const onFormSubmit = (name, number) => {
    if (JSON.parse(localStorage.getItem('contacts')).length === 0) {
      setContacts(state => [
        ...state,
        { name: name, number: number, id: nanoid() },
      ]);
    }

    for (const contact of contacts) {
      if (contact.name.toLowerCase() === name.toLowerCase()) {
        alert(`${contact.name} is alerady in Contacts`);
        break;
      }
      setContacts(state => [
        ...state,
        { name: name, number: number, id: nanoid() },
      ]);
    }

    // });
  };
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts([...updatedContacts]);
  };

  const handleFilter = value => {
    setFilter(value);
  };

  const filteredData = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm onFormSubmit={onFormSubmit} />
      <h2>Contacts</h2>
      <Filter handleFilter={handleFilter} />
      <ContactList data={filteredData} deleteContact={deleteContact} />
    </div>
  );
}
