import React, { useState, Fragment } from 'react'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import UserTable from './tables/UserTable'
import axios from 'axios';



// className is used instead of class for adding CSS classes, as class is a reserved keyword in JavaScript.
// Properties and methods in JSX are camelCase - onclick will become onClick.
// Self-closing tags must end in a slash - e.g. <img />

const App = () => {
	// Data
	const usersData = [
		//{ id: 1, name: 'Tania', username: 'floppydiskette' },
		//{ id: 2, name: 'Craig', username: 'siliconeidolon' },
		//{ id: 3, name: 'Ben', username: 'benisphere' },
	]


	const initialFormState = { id: null, name: '', username: '' }

	// Setting state
	const [ users, setUsers ] = useState(usersData) // An array of two values，const users = state[0] : the state value， setUsers = state[1] : function to change value
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)
	const [res, setRes] = useState({data: null, error: null, isLoading: false});
	//const [error, setError]

	// CRUD operations
	const addUser = user => {  // take a user object as a parameter, and add them to the users array of objects，
		user.id = users.length + 1
		setUsers([ ...users, user ])  //The ...users code ensures that all the previous users remain in the array.
	}
	
	const deleteUser = id => {
		setEditing(false)

		setUsers(users.filter(user => user.id !== id))
	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}

	const editRow = user => {
		setEditing(true)

		setCurrentUser({ id: user.id, name: user.name, username: user.username })
	}

	//read方法 get
	const crudRead = () => {
		axios.get('api/Todo')  //https://dog.ceo/api/breeds/image/random
		.then(response => {
		console.log(response)
		//setUsers([ ...users, {id:response.data[0].id, name :"3asda" ,username: 'happy' }]);
		setUsers([ ...users, response.data]);
		})
		.catch(error => {
		  console.log(error);
		});		
	  }

	  // create方法 post
	  const crudCreate = a => {

		//console.log(a)
		//axios.post('api/Todo', {headers: {ContentType: 'application/json'}}, a)  
		axios.post('api/Todo',a)
		    .then(response => {
		 setUsers( [ ...users, response.data ]); 
			//setUsers([...users, {id:response.data.id, a:response.data}]);
		//setUsers([ ...users, {id:response.data[0].id, name :"3asda" ,username: 'happy' }]);
		  //.log(response);
		})
		.catch(error => {
		  //console.log(error);
		  setRes({data: null, isLoading: false, error});
		});		
	  }

	  // update方法
	  const cruUpdate = () => {
		axios.get('api/Todo')  //https://dog.ceo/api/breeds/image/random
		.then(response => {

		setUsers([ ...users, {id:response.data[0].id, name :"3asda" ,username: 'happy' }]);
		  //console.log(posts);
		})
		.catch(error => {
		  console.log(error);
		});		
	  }

	  // delete方法
	  const cruDelete = () => {
		axios.post('api/Todo', { posted_data: 'example' })  //https://dog.ceo/api/breeds/image/random
		.then(response => {

		//setUsers([ ...users, {id:response.data[0].id, name :"3asda" ,username: 'happy' }]);
		  console.log(response);
		})
		.catch(error => {
		  console.log(error);
		});		
	  }
	 
	return (
		<div className="container">
			<h1>CRUD App with Hooks</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditUserForm
								//editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (

						<Fragment>
							<h2>Add user</h2>
							<AddUserForm crudCreate={crudCreate} />
						</Fragment>
						
					)}
				</div>
				<div className="flex-large">
					<h2 >View users</h2> 
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser}  />
				</div>
			</div>
		</div>
	)
}

export default App
