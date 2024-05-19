import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ContactForm.module.css';

const ContactForm = ({ handleSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(name, number);
    setName('');
    setNumber('');
  };

  return (
    <form className="contactForm" onSubmit={onSubmit}>
      <label className="phoneLabel">
        Name
        <input className="phoneInput" type="text" name="name" value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <br />
      <label className="phoneLabel">
        Number
        <input className="phoneInput" type="tel" name="number" value={number} onChange={e => setNumber(e.target.value)} required />
      </label>
      <br />
      <button className="addButton" type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default ContactForm;