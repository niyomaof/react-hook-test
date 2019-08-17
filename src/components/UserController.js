import React, { useState, useEffect } from 'react';
import { findAllUser, addUser, deleteUser, editUser } from "../services/user.api";

const useEditInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue)
  const handleInput = (e) => {
    setValue(e.target.value)
  }
  return {
    value, setValue, onChange: handleInput
  }
}

const useListUser = (setOnUserLoad) => {
  const [listUser, setListUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(false)

  const fetch = async () => {
    setLoadingUser(true)
    const data = await findAllUser()
    console.log(data)
    setListUser(data)
    setLoadingUser(false)
  }

  useEffect(() => {
    console.log('Start')
    fetch()
  }, [setOnUserLoad])


  return {
    listUser, loadingUser
  }
}

const onDeleteClick = async (id, setOnUserLoad) => {
  const confirm = window.confirm('ยืนยันการลบ ?')
  if (confirm) {
    const data = await deleteUser(id)
    console.log(data)
    if (data.status === 'success') {
      setOnUserLoad(true)
      setOnUserLoad(false)
    }
  }
}

const onEditClick = (index, setRow, setOnEditShow, user, setUser) => {
  console.log('onEditClick')
  const { name, email, username, password } = user
  console.log('user', user, 'user')
  console.log('setUser', setUser, 'setUser')
  const { setName, setEmail, setUsername, setPassword } = setUser


  setRow(index)
  setOnEditShow(true)


  setName(name)
  setEmail(email)
  setUsername(username)
  setPassword(password)
}

const onEditConfirm = async (user, setOnUserLoad, setOnEditShow, setRow) => {
  const confirm = window.confirm('ยืนยันการแก้ไขข้อมูล ?')
  if (confirm) {
    setOnEditShow(false)
    setRow(-1)

    const data = await editUser(user)
    console.log('data', data, 'data')
    if(data.status === 'success'){
      setOnUserLoad(true)
      setOnUserLoad(false)
    }
  }
}

const onEditCancel = (index, setRow, setOnEditShow) => {
  setOnEditShow(false)
  setRow(-1)
}

const UserController = () => {
  const [onUserLoad, setOnUserLoad] = useState(false);
  const { listUser, loadingUser } = useListUser(onUserLoad)

  const [row, setRow] = useState(-1)
  const [onEditShow, setOnEditShow] = useState(false)

  const { value: name, setValue: setName, onChange: onNameChange } = useEditInput()
  const { value: email, setValue: setEmail, onChange: onEmailChange } = useEditInput(null)
  const { value: username, setValue: setUsername, onChange: onUsernameChange } = useEditInput(null)
  const { value: password, setValue: setPassword, onChange: onPasswordChange } = useEditInput(null)
  return (
    <div>
      <AddUser setOnUserLoad={ setOnUserLoad }/>
      <h1>List User</h1>
      { !loadingUser ? (
        <table border="1">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th> Edit</th>
            <th> Delete</th>
          </tr>
          </thead>
          <tbody>
          {
            listUser ? listUser.map((item, index) => (
              <tr key={ index }>
                <td>{ item.id }</td>
                <td>{ index === row ? (
                  <input type="text" value={ name } onChange={ onNameChange }/>) : item.name } </td>
                <td>{ index === row ? (
                  <input type="email" value={ email } onChange={ onEmailChange }/>) : item.email }</td>
                <td>{ index === row ? (
                  <input type="text" value={ username } onChange={ onUsernameChange }/>) : item.username }</td>
                <td>{ index === row ? (
                  <input type="password" value={ password } onChange={ onPasswordChange }/>) : item.password }</td>
                <td>
                  { onEditShow ? index === row ? (
                      <>
                        <button onClick={ () => onEditConfirm(
                          { id: item.id, name, email, username, password }, setOnUserLoad, setOnEditShow, setRow
                        ) }>Confirm Edit
                        </button>
                        <button onClick={ () => onEditCancel(index, setRow, setOnEditShow) }>Cancel Edit</button>
                      </>
                    ) : (
                      (<button onClick={ () => onEditClick(index, setRow, setOnEditShow,
                        { name: item.name, email: item.email, username: item.username, password: item.password },
                        { setName, setEmail, setUsername, setPassword }
                      ) }>Edit</button>)
                    ) :
                    (<button onClick={ () => onEditClick(index, setRow, setOnEditShow,
                      { name: item.name, email: item.email, username: item.username, password: item.password },
                      { setName, setEmail, setUsername, setPassword }
                    ) }>Edit</button>)
                  }

                </td>
                <td>
                  <button onClick={ () => onDeleteClick(item.id, setOnUserLoad) }>Del</button>
                </td>
              </tr>
            )) : 'wait data...'
          }
          </tbody>
        </table>
      ) : (<h1>Loading...</h1>) }

    </div>
  );
};


const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue)
  const handleInput = (e) => {
    setValue(e.target.value)
  }
  return {
    value, onChange: handleInput
  }
}

const onSubmitAddUser = async (e, user, setOnUserLoad) => {
  e.preventDefault()

  const data = await addUser(user)
  if (data.status === 'success') {
    setOnUserLoad(true)
    setOnUserLoad(false)
  }
}

const AddUser = (props) => {
  const { setOnUserLoad } = props
  const { value: name, onChange: onNameChange } = useInput(null)
  const { value: email, onChange: onEmailChange } = useInput(null)
  const { value: username, onChange: onUsernameChange } = useInput(null)
  const { value: password, onChange: onPasswordChange } = useInput(null)
  return (
    <div>
      <h1>Add Form</h1>
      <form onSubmit={ (e) => onSubmitAddUser(e, { name, email, username, password }, setOnUserLoad) }>
        <input type="text" value={ name } onChange={ onNameChange } placeholder="Name" required/> <br/>
        <input type="email" value={ email } onChange={ onEmailChange } placeholder="Email" required/> <br/>
        <input type="text" value={ username } onChange={ onUsernameChange } placeholder="Username" required/> <br/>
        <input type="password" value={ password } onChange={ onPasswordChange } placeholder="Password" required/> <br/>
        <button>Add</button>
      </form>
    </div>
  )
}

export default UserController;
