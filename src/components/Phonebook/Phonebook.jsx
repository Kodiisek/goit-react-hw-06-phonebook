import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import { addContact, deleteContact, setFilter } from '../../store/contactsSlice';
import './Phonebook.module.css';

const Phonebook = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'filter') {
      dispatch(setFilter(value));
    }
  };

  const handleSubmit = (name, number) => {
    if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return;
    }
    const newContact = {
      id: Date.now(),
      name: name.trim(),
      number: number.trim(),
    };
    dispatch(addContact(newContact));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="phonebook">
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={handleChange}
        placeholder="Search contacts..."
      />
      <ContactList contacts={filteredContacts} handleDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default Phonebook;