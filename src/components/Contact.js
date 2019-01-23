import React, {Component} from "react";
import ContactForm from "./ContactForm";
import img from '../img/img_210318.png';

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing : false
        };
    }

    doneEditing() {
        this.setState({editing: false});
    }

    render() {
        return (
            <div className="w-full sm:w-full md:w-1/2 m-auto">
                {this.state.editing ? <ContactForm contact={this.props.contact}
                                                   removeContact = { this.props.removeContact }
                                                   doneEditing = { this.doneEditing.bind(this)}
                                                   saveContact = { this.props.saveContact} index = {this.props.index} /> : (
                    <li className="inline-block border-b border-grey-light flex justify-between items-center py-4">
                        <div className="flex items-start w-2/6 sm:w-1/2">
                            <div className="w-10 h-10 rounded mr-3">
                                <img className="w-10 h-10 rounded-full mr-4"
                                     src={this.props.contact.image}/>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div>
                                    <span className="font-bold">{this.props.contact.firstName} {this.props.contact.lastName}</span>
                                </div>
                            </div>
                        </div>
                        <p className="w-2/6 text-black leading-normal">{this.props.contact.phone}</p>
                        <p className="sm:min-w-0 w-1/6">{this.props.contact.email}</p>
                        <button
                            onClick={() => {this.setState({editing: !this.state.editing})}}
                            className="shadow bg-purple hover:bg-purple-light focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                            Edit/View
                        </button>
                    </li>
                )}


            </div>
        );
    }
}

export default Contact;