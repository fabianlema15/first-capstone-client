import React from 'react';
import GenericContext from '../contexts/GenericContext'
import UserContent from '../components/User/User'
import GenericApiService from '../services/generic-api-service';
import Helper from '../components/Utils/Helper';

class UserPage extends React.Component{
  static defaultProps = {
    ROUTE : 'users'
  }

  state = {
    objList: [],
    error: null,
    showForm: false,
    currentUser: null,
  };

  setUserList = objList => {
    this.setState({ objList })
  }

  setError = error => {
    this.setState({ error: error.error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  showHideForm = show => {
    this.setState({ showForm: show })
  }

  acceptCode = () => {
    this.setState({ currentUser: null })
  }

  setSelected = (idUser, selected=true) => {
    const user = this.state.objList[idUser];
    user.selected = selected;
    this.setState({
      objList: {
        ...this.state.objList,
        [idUser]:user
      }
    })
  }

  addUser = user => {
    this.setState({
      objList: {
        ...this.state.objList,
        [user.id]:user},
      showForm: false,
      currentUser: user
    })
  }

  editUser = (idUser, userUpdated) => {
    userUpdated.selected = false
    Object.assign(this.state.objList[idUser], userUpdated);
    this.setState({
      objList:{
        ...this.state.objList,
        [idUser]:this.state.objList[idUser]}
    })
  }

  removeUser = (idUser) => {
    const { [idUser]: id, ...rest } = this.state.objList;
    this.setState({
      objList: rest
    })
  }

  getAll = () => {
    GenericApiService.getAll(this.props.ROUTE)
      .then(result => this.setUserList(Helper.serializeObj(result)))
      .catch(this.setError)
  }

  submitNew = (e) => {
    e.preventDefault();
    const { first_name, last_name, address, phone, email, role } = e.target;
    const newUser = {
      first_name: first_name.value,
      last_name: last_name.value,
      address: address.value,
      phone: phone.value,
      email: email.value,
      role: role.value
    }

    GenericApiService.saveNew(this.props.ROUTE, newUser)
      .then(this.addUser)
      .catch(this.setError)
  }

  submitEdit = (e) => {
    e.preventDefault();
    const { id, first_name, last_name, address, phone, email, role } = e.target;
    const newUser = {
      first_name: first_name.value,
      last_name: last_name.value,
      address: address.value,
      phone: phone.value,
      email: email.value,
      role: role.value
    }

    GenericApiService.saveExisting(this.props.ROUTE, id.value, newUser)
      .then(() => this.editUser(id.value, newUser))
      .catch(this.setError)
  }

  delete = (idUsero) => {
    GenericApiService.delete(this.props.ROUTE, idUsero)
      .then(() => this.removeUser(idUsero))
      .catch(this.setError)
  }

  render() {
    const value = {
      objList: this.state.objList,
      showForm: this.state.showForm,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      showHideForm: this.showHideForm,
      setSelected: this.setSelected,
      getAll: this.getAll,
      submitNew: this.submitNew,
      submitEdit: this.submitEdit,
      delete: this.delete,
      getObjArray: Helper.getUsersArray([{id:'ADMIN', value:'ADMIN'}, {id:'MANAGER', value:'MANAGER'}, {id:'SELLER', value:'SELLER'}]),
      objName: 'User',
      currentUser: this.state.currentUser,
      acceptCode: this.acceptCode
    }

    return (
      <GenericContext.Provider value={value}>
        <UserContent />
      </GenericContext.Provider>
    )
  }
}

export default UserPage;
