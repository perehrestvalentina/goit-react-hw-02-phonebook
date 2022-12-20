import React, { Component } from 'react';
import { nanoid } from 'nanoid';

class App extends Component() {
  state = {
    contacts: [],
    filter: '',
  };

  addNewcontact = (name, number) => {
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts`);
    }
    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          {
            id: nanoid(),
            name: name,
            number: number,
          },
        ],
      };
    });
  };

  deleteContact = event => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== event.target.id
        ),
      };
    });
  };

  handleImputCahange = event => {
    const { value } = event.target;
    this.setState({ filter: value });
  };
  filterInputContact = event => {
    console.log(event.currentTarget.value);
    this.satState({ filter: event.currentTarget.value });
  };

  getNormaliseContacts = () => {
    const normalisedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  render() {
    return (
      <div>
        <h1> Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter onChange={this.filterInputContact} values={this.state.filter} />
        <ContactList
          contacts={this.getNormaliseContacts()}
          onDeleteInputContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
