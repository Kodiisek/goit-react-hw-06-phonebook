import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

const initialState = {
  contacts: JSON.parse(localStorage.getItem('contacts')) || [],
  filter: '',
};

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }) => {

    return { id: Date.now(), name, number };
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    return id;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    addContactLocally: (state, action) => {
      state.contacts.push(action.payload);
      localStorage.setItem('contacts', JSON.stringify(state.contacts));
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addContact.fulfilled, (state, action) => {
        contactsSlice.caseReducers.addContactLocally(state, action);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
        localStorage.setItem('contacts', JSON.stringify(state.contacts));
      });
  },
});

export const { setFilter, addContactLocally } = contactsSlice.actions;

export const selectContacts = state => state.contacts.contacts;
export const selectFilter = state => state.contacts.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export default contactsSlice.reducer;
