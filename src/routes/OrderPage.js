import React from 'react';
import GenericContext from '../contexts/GenericContext'
import OrderContent from '../components/Order/Order'
import GenericApiService from '../services/generic-api-service';
import Helper from '../components/Utils/Helper';
import TokenService from '../services/token-service'

class OrderPage extends React.Component{
  static defaultProps = {
    ROUTE : 'orders'
  }

  state = {
    objList: {},
    error: null,
    showForm: false,
  };

  setOrderList = objList => {
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

  setSelected = (idOrder, selected=true) => {
    this.props.history.push(`/order/${idOrder}`)
    //return <Redirect to={`/orders/${idOrder}`} />
  }

  addOrder = order => {
    this.setState({
      objList: {
        ...this.state.objList,
        [order.id]:order},
      showForm: false
    })
  }

  editOrder = (idOrder, orderUpdated) => {
    orderUpdated.selected = false
    Object.assign(this.state.objList[idOrder], orderUpdated);
    this.setState({
      objList:{
        ...this.state.objList,
        [idOrder]:this.state.objList[idOrder]}
    })
  }

  removeOrder = (idOrder) => {
    const { [idOrder]: id, ...rest } = this.state.objList;
    this.setState({
      objList: rest
    })
  }

  getAll = () => {
    if (TokenService.decodeUser())
      GenericApiService.getAll(`${this.props.ROUTE}/byuser/${TokenService.decodeUser().user_id}`)
        .then(result => this.setOrderList(Helper.serializeObj(result)))
        .catch(this.setError)
  }

  submitNew = (e) => {
    e.preventDefault();
    const { name, picture, stock, price, description } = e.target;
    const newOrder = {
      name: name.value,
      picture: picture.value,
      stock: stock.value,
      price: price.value,
      description: description.value
    }

    GenericApiService.saveNew(this.props.ROUTE, newOrder)
      .then(this.addOrder)
      .catch(this.setError)
  }

  submitEdit = (e) => {
    e.preventDefault();
    const { id, name, picture, stock, price, description } = e.target;
    const newOrder = {
      name: name.value,
      picture: picture.value,
      stock: stock.value,
      price: price.value,
      description: description.value
    }

    GenericApiService.saveExisting(this.props.ROUTE, id.value, newOrder)
      .then(() => this.editOrder(id.value, newOrder))
      .catch(this.setError)
  }

  delete = (idOrdero) => {
    GenericApiService.delete(this.props.ROUTE, idOrdero)
      .then(() => this.removeOrder(idOrdero))
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
      getObjArray: Helper.getOrdersArray(),
      objName: 'Order'
    }

    return (
      <GenericContext.Provider value={value}>
        <OrderContent />
      </GenericContext.Provider>
    )
  }
}

export default OrderPage;
