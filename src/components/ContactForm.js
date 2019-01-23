import React, {Component} from "react";
import img from '../img/img_210318.png';

class ContactForm extends Component {
    constructor(props) {
        super(props);

        if (!this.props.contact) {
            this.state = {
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                image: img
            };
        }
        else {
            this.state = {
                firstName: this.props.contact.firstName,
                lastName: this.props.contact.lastName,
                phone: this.props.contact.phone,
                email: this.props.contact.email,
                image: this.props.contact.image
            };
        }


    }

    //https://stackoverflow.com/questions/43992427/how-to-display-a-image-selected-from-input-type-file-in-reactjs
    onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({image: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    render() {
        let isEditing = this.props.isEditing == -1 ? false: true;

        return(
            <form className="w-full max-w-md m-auto p-4">
                <div className="flex flex-wrap -mx-3 mb-2">

                    <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                        <p className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            Avatar
                        </p>

                        <div className="w-64 h-64 rounded mr-3 ">
                            <img className="w-64 h-64 rounded-full mr-4 "
                                 src={this.state.image}/>
                        </div>
                        <input type="file" onChange={this.onImageChange.bind(this)} id="group_image"/>
                    </div>

                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                               htmlFor="grid-first-name">
                            First Name
                        </label>
                        <input
                            value = {this.state.firstName}
                            onChange={ e => this.setState({firstName: e.target.value})}
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                            id="grid-first-name" type="text" placeholder="John" />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                               htmlFor="grid-last-name">
                            Last Name
                        </label>
                        <input
                            value = {this.state.lastName}
                            onChange={ e => this.setState({lastName: e.target.value})}
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                            id="grid-last-name" type="text" placeholder="Doe" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                               htmlFor="grid-phone">
                            Phone
                        </label>
                        <input
                            value = {this.state.phone}
                            onChange={ e => this.setState({phone: e.target.value})}
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                            id="grid-phone" type="text" placeholder="(602) 555-5555" />
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                               htmlFor="grid-email">
                            Email
                        </label>
                        <input
                            value = {this.state.email}
                            onChange={ e => this.setState({email: e.target.value})}
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                            id="grid-email" type="text" placeholder="jdoe@gmail.com" />
                    </div>
                </div>
                <button
                    className="shadow bg-purple hover:bg-purple-light focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick = {() => {
                        if (!this.state.firstName && !this.state.lastName &&
                            !this.state.phone && !this.state.email) {
                            alert('Enter one of these fields!');
                            return;
                        }

                        //if adding
                        if (!isEditing) {
                            this.props.formSubmit(this.state); //add contact
                            //clear form
                            this.setState({
                                firstName: '',
                                lastName: '',
                                phone: '',
                                email: '',
                                image: img
                            });
                        }
                        else {
                            this.props.saveContact(this.props.index, this.state);
                        }
                    }}>
                    {isEditing ? 'Save Contact' : 'Add Contact'}
                </button>
                {isEditing && <button
                    className="ml-2 shadow bg-red hover:bg-purple-light focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        this.props.removeContact(this.props.index);
                    }}
                >Delete Contact</button>}
                {isEditing && <button
                    className="ml-2 shadow bg-blue hover:bg-purple-light focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        this.props.doneEditing();
                    }}
                >Done</button>}
            </form>
        );
    }
}

export default ContactForm;