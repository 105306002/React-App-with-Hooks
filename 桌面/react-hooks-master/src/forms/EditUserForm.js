import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
  const [ user, setUser ] = useState(props.currentUser) //You must use this.setState() to modify an array. Simply applying a new value to  this.state.property will not work.

  useEffect(
    () => {
      setUser(props.currentUser)
    }
    
    ,[ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateUser(user.id, user)
      }}
    >
      <label>FirstName</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
      <label>LastName</label>
      <input type="text" name="username" value={user.username} onChange={handleInputChange} />
      <button>Update user</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditUserForm
