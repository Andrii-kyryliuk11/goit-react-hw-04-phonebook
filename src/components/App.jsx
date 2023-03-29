import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  onFormSubmit = data => {
    this.state.contacts.forEach(contact => {
      if (contact.name.toLowerCase() === data.name.toLowerCase()) {
        alert(`${contact.name} is alerady in Contacts`);
      }
    });

    this.setState(prevState => ({
      contacts: [...prevState.contacts, data],
      name: '',
    }));
  };

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    }
  }

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilter = value => {
    this.setState({ filter: value });
  };

  render() {
    const filteredData = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <div>
        <h2>Phonebook</h2>
        <ContactForm
          onFormSubmit={this.onFormSubmit}
          takeName={this.takeName}
        />
        <h2>Contacts</h2>
        <Filter handleFilter={this.handleFilter} />
        <ContactList data={filteredData} deleteContact={this.deleteContact} />
      </div>
    );
  }
}
