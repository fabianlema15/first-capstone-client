import React from 'react';
import GenericContext from '../contexts/GenericContext'
import ClientContent from '../components/Client/Client'
import GenericApiService from '../services/generic-api-service';
import Helper from '../components/Utils/Helper';

class ClientPage extends React.Component{
  static defaultProps = {
    ROUTE : 'clients'
  }

  state = {
    objList: [],
    error: null,
    showForm: false,
  };

  setClientList = objList => {
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

  setSelected = (idClient, selected=true) => {
    const client = this.state.objList[idClient];
    client.selected = selected;
    this.setState({
      objList: {
        ...this.state.objList,
        [idClient]:client
      }
    })
  }

  addClient = client => {
    this.setState({
      objList: {
        ...this.state.objList,
        [client.id]:client},
      showForm: false
    })
  }

  editClient = (idClient, clientUpdated) => {
    clientUpdated.selected = false
    Object.assign(this.state.objList[idClient], clientUpdated);
    this.setState({
      objList:{
        ...this.state.objList,
        [idClient]:this.state.objList[idClient]}
    })
  }

  removeClient = (idClient) => {
    const { [idClient]: id, ...rest } = this.state.objList;
    this.setState({
      objList: rest
    })
  }

  getAll = () => {
    GenericApiService.getAll(this.props.ROUTE)
      .then(result => this.setClientList(Helper.serializeObj(result)))
      .catch(this.setError)
  }

  submitNew = (e) => {
    e.preventDefault();
    const { full_name, address, phone, email } = e.target;
    const newClient = {
      full_name: full_name.value,
      address: address.value,
      phone: phone.value,
      email: email.value
    }

    GenericApiService.saveNew(this.props.ROUTE, newClient)
      .then(this.addClient)
      .catch(this.setError)
  }

  submitEdit = (e) => {
    e.preventDefault();
    const { id, full_name, address, phone, email } = e.target;
    const newClient = {
      full_name: full_name.value,
      address: address.value,
      phone: phone.value,
      email: email.value
    }

    GenericApiService.saveExisting(this.props.ROUTE, id.value, newClient)
      .then(() => this.editClient(id.value, newClient))
      .catch(this.setError)
  }

  delete = (idCliento) => {
    GenericApiService.delete(this.props.ROUTE, idCliento)
      .then(() => this.removeClient(idCliento))
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
      getObjArray: Helper.getClientsArray(),
      objName: 'Client'
    }
    return (
      <GenericContext.Provider value={value}>
        <ClientContent />
      </GenericContext.Provider>
    )
  }
}

export default ClientPage;
