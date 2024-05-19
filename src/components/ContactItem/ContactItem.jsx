import React from 'react';
import PropTypes from 'prop-types';
import './ContactItem.module.css';

const ContactItem = ({ contact, handleDeleteContact }) => {
  const { id, name, number } = contact;

  return (
    <li className="itemLi">
      {name}: {number}
      <button className="deletebtn" onClick={() => handleDeleteContact(id)}>Delete</button>
    </li>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  handleDeleteContact: PropTypes.func.isRequired,
};

export default ContactItem;