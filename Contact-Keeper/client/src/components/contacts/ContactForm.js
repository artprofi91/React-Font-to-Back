import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
	const contactContext = useContext(ContactContext);

	const { addContact, current, clearCurrent, updateContact } = contactContext;

	useEffect(() => {
		current !== null
			? setContact(current)
			: setContact({
					name: '',
					email: '',
					phone: '',
					type: 'personal'
			  });
		//in brakets specify when we want it to be called on contactContext or current change
	}, [contactContext, current]);

	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal'
	});

	const { name, email, phone, type } = contact;

	const onChange = (e) =>
		setContact({
			...contact,
			[e.target.name]: e.target.value
		});
	const onSubmit = (e) => {
		e.preventDefault();
		current === null ? addContact(contact) : updateContact(contact);
		clearAll();
	};

	const clearAll = () => {
		clearCurrent();
	};
	return (
		<form onSubmit={onSubmit}>
			<h2 className="text-primary">
				{current ? 'Edit Contact' : 'Add Contact'}
			</h2>
			<input
				type="text"
				placeholder="Name"
				name="name"
				value={name}
				onChange={onChange}
				required
			/>
			<input
				type="text"
				placeholder="Email"
				name="email"
				value={email}
				onChange={onChange}
				required
			/>
			<input
				type="text"
				placeholder="Phone"
				name="phone"
				value={phone}
				onChange={onChange}
				required
			/>
			<h5>Contact type</h5>
			<input
				type="radio"
				name="type"
				value="personal"
				checked={type === 'personal'}
				onChange={onChange}
			/>{' '}
			Personal{' '}
			<input
				type="radio"
				name="type"
				value="professional"
				checked={type === 'professional'}
				onChange={onChange}
			/>{' '}
			Professional{' '}
			<div>
				<input
					type="submit"
					value={current ? 'Update Contact' : 'Add Contact'}
					className="btn btn-primary btn-block"
				/>
			</div>
			{current && (
				<div>
					<button className="btn btn-light btn-block" onClick={clearAll}>
						Clear
					</button>
				</div>
			)}
		</form>
	);
};

export default ContactForm;
