import React from 'react'

const UserTable = props => {

  return (
  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>firstName</th>
        <th>lastName</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map(user => ( //We can call the property whatever we want, as long as it's not a reserved keyword
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(user)
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button 
              //pass function through props to UserTable
                onClick={() => props.deleteUser(user.id)} className="button muted-button">
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
  )
}

export default UserTable
