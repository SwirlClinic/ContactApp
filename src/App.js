import React, { Component } from 'react';
import './App.css';
import dragA from './img/dragunov.jpg';

import ContactForm from "./components/ContactForm";
import Contact from "./components/Contact";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      contacts: [
          {
            firstName: 'Sergei',
            lastName: 'Dragunov',
              phone:'123 124 1234',
              email: 'sergei@gmail.com',
              image: dragA
          }
      ],
        toEdit: -1
    };
  }

  addContact(contact) {
    this.setState(prevState => ({
        //contacts: [contact, ...prevState.contacts]
        contacts: [...prevState.contacts, contact]
    }));
  }


  removeContact(index) {
      let newContacts = [...this.state.contacts];
      newContacts.splice(index,1);
      this.setState({
          toEdit: -1,
          contacts: newContacts
      });
  }

    saveContact(index, contact) {


        let newContacts = [...this.state.contacts];
        newContacts[index] = contact;
        this.setState({
            toEdit: -1,
            contacts: newContacts
        });


    }


  render() {
      console.log(this.state);

    return (
        <div className="">
          <header className="bg-orange p-4">
            <h1 className="text-white text-3xl">Contacts</h1>
          </header>

          <div className="bg-grey-lightest">
            <ContactForm
                isEditing={this.state.toEdit}
                removeContact = {this.removeContact.bind(this)}
                saveContact = {this.saveContact.bind(this)}
                formSubmit={this.addContact.bind(this)} />
          </div>

            {
              this.state.contacts.map((item, index) => (<Contact contact={item} key={item.firstName+item.lastName+item.phone+item.email+index} index={index} saveContact = {this.saveContact.bind(this)} removeContact = {this.removeContact.bind(this)} />))
            }
        </div>
    );
  }
}

export default App;
