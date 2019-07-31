import React, { useState } from 'react'

const AddUserForm = props => {
	const initialFormState = {  name: '', username: '' }
	const [ user, setUser ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target
		console.log(event.target)
		setUser({ ...user, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!user.name || !user.username) return
				//console.log(user)
				//submitting the form back to the App component. As we passed the function down with props, we're going to use props to access the function
				props.crudCreate(user)
				//using the setter to reset the form to its initial value after successful submission.
				setUser(initialFormState)
			}}
		>
			<label>FirstName</label>
			<input type="text" name="name" value={user.name} onChange={handleInputChange} />
			<label>LastName</label>
			<input type="text" name="username" value={user.username} onChange={handleInputChange} />
			<button>Add new user</button>
		</form>
	)
}

export default AddUserForm
