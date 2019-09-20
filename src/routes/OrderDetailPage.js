import React from 'react';
import GenericContext from '../contexts/GenericContext'
import OrderDetailContent from '../components/Order/OrderDetail'
import GenericApiService from '../services/generic-api-service';
import Helper from '../components/Utils/Helper';
import TokenService from '../services/token-service';

class OrderDetailPage extends React.Component{
  static defaultProps = {
    ROUTE : 'orders',
    ROUTE1 : 'products',
    ROUTE2 : 'promotions'
  }

  state = {
    objList: {},
    objListAux: {},
    error: null,
    showForm: false,
    currentOrder: null
  };

  componentDidMount() {
    const { orderId } = this.props.match.params
    //console.log(orderId);
    if (orderId && orderId!=='new'){
      Promise.all([
        GenericApiService.getById('orders', orderId),
        GenericApiService.getAll(`orders/${orderId}/products`),
        GenericApiService.getAll(`orders/${orderId}/promotions`)
      ]).then(values =>{
        //console.log(values)
        this.setState({
          currentOrder: values[0],
          objList: Helper.serializeObj(values[1]),
          objListAux: Helper.serializeObj(values[2])
        })
      }).catch(this.setError);
    }
    GenericApiService.getAll('clients')
      .then(result => {
        this.setState({clientList: result.map(client => {
          return {
            id: client.id,
            value: client.full_name
          }})})
      })
      .catch(this.setError)

    GenericApiService.getAll('products')
      .then(result => {
        this.productsListOrder = Helper.serializeObj(result)
        this.productsList = result.map(product => {
          return {
            id: product.id,
            value: product.name
          }})
      })
      .then(() => GenericApiService.getAll('promotions'))
      .then(result => {
        this.promotionsListOrder = Helper.serializeObj(result)
        this.promotionsList = result.map(promotion => {
          return {
            id: promotion.id,
            value: promotion.name
          }})
      })
      .catch(this.setError)
  }

  setProductsList = objList => {
    this.setState({ objList })
  }

  setPromotionsList = objListAux => {
    this.setState({ objListAux })
  }

  setCurrentOrder = currentOrder => {
    //console.log(currentOrder);
    this.setState({ currentOrder })
  }

  setError = error => {
    this.setState({ error: error.error.message || error.error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  showHideForm = (show, type=1) => {
    if (show) this.formType = type
    this.setState({ showForm: show })
  }

  setSelected = (idOrderDetail, type, selected=true) => {
    const product = type===1?this.state.objList[idOrderDetail]:this.state.objListAux[idOrderDetail];
    product.selected = selected;
    product.formType = type;
    if (type===1)
      this.setState({
        objList: {
          ...this.state.objList,
          [idOrderDetail]:product
        }
      })
    else
      this.setState({
        objListAux: {
          ...this.state.objListAux,
          [idOrderDetail]:product
        }
      })
  }

  addOrderProductDetail = product => {
    this.setState({
      objList: {
        ...this.state.objList,
        [product.id]:product},
      showForm: false
    })
  }

  addOrderPromotionDetail = promotion => {
    this.setState({
      objListAux: {
        ...this.state.objListAux,
        [promotion.id]:promotion},
      showForm: false
    })
  }

  editOrderProduct = (idOrderDetail, productUpdated) => {
    productUpdated.selected = false
    Object.assign(this.state.objList[idOrderDetail], productUpdated);
    this.setState({
      objList:{
        ...this.state.objList,
        [idOrderDetail]:this.state.objList[idOrderDetail]}
    })
  }

  editOrderPromotion = (idOrderDetail, promotionUpdated) => {
    promotionUpdated.selected = false
    Object.assign(this.state.objListAux[idOrderDetail], promotionUpdated);
    this.setState({
      objListAux:{
        ...this.state.objListAux,
        [idOrderDetail]:this.state.objListAux[idOrderDetail]}
    })
  }

  removeOrderProductDetail = (idOrderDetail) => {
    const { [idOrderDetail]: id, ...rest } = this.state.objList;
    this.setState({
      objList: rest
    })
  }

  removeOrderPromotionDetail = (idOrderDetail) => {
    const { [idOrderDetail]: id, ...rest } = this.state.objListAux;
    this.setState({
      objListAux: rest
    })
  }

  getAll = () => {
    if (this.state.currentOrder)
      GenericApiService.getAll(`${this.props.ROUTE}/0/${this.props.ROUTE1}`)
        .then(result => this.setProductsList(Helper.serializeObj(result)))
        .then(() => GenericApiService.getAll(`${this.props.ROUTE}/0/${this.props.ROUTE2}`))
        .then(result => this.setPromotionsList(Helper.serializeObj(result)))
        .catch(this.setError)
  }

  submitNewOrder = (newOrderDetail) => {
    newOrderDetail.user_id = TokenService.decodeUser().user_id;
    //console.log(newOrderDetail);
    GenericApiService.saveNew(this.props.ROUTE, newOrderDetail)
      .then(this.setCurrentOrder)
      .catch(this.setError)
  }

  submitNew = (e) => {
    e.preventDefault();
    const { promotion_id, product_id, price, quantity, observation } = e.target;
    const typeObject = this.formType===1?{product_id:product_id.value}:{promotion_id:promotion_id.value}
    const newOrderDetail = {
      ...typeObject,
      order_id: this.state.currentOrder.id,
      quantity: quantity.value,
      price: price.value,
      observation: observation.value
    }

    GenericApiService.saveNew(`${this.props.ROUTE}/${this.state.currentOrder.id}/${this.formType===1?this.props.ROUTE1:this.props.ROUTE2}`, newOrderDetail)
      .then(orderDetail => {
        this.setState({currentOrder: {...this.state.currentOrder, subtotal:orderDetail.subtotal, tax:orderDetail.tax, total:orderDetail.total}})
        this.formType===1?this.addOrderProductDetail(orderDetail):this.addOrderPromotionDetail(orderDetail)
      })
      .catch(this.setError)
  }

  submitProductEdit = (e) => {
    e.preventDefault();
    const { id, product_id, price, quantity, observation } = e.target;
    const newOrderDetail = {
      product_id:product_id.value,
      order_id: this.state.currentOrder.id,
      quantity: quantity.value,
      price: price.value,
      observation: observation.value
    }
    GenericApiService.saveExisting(`${this.props.ROUTE}/${this.state.currentOrder.id}/${this.props.ROUTE1}`, product_id.value, newOrderDetail)
      .then(() => this.editOrderProduct(id.value, newOrderDetail))
      .catch(this.setError)
  }

  submitPromotionEdit = (e) => {
    e.preventDefault();
    const { id, promotion_id, price, quantity, observation } = e.target;
    const newOrderDetail = {
      promotion_id:promotion_id.value,
      order_id: this.state.currentOrder.id,
      quantity: quantity.value,
      price: price.value,
      observation: observation.value
    }
    GenericApiService.saveExisting(`${this.props.ROUTE}/${this.state.currentOrder.id}/${this.props.ROUTE2}`, promotion_id.value, newOrderDetail)
      .then(() => this.editOrderPromotion(id.value, newOrderDetail))
      .catch(this.setError)
  }

  delete = (idOrderDetail, type) => {
    const id = type===1?this.state.objList[idOrderDetail].product.id:this.state.objListAux[idOrderDetail].promotion.id;
    GenericApiService.deleteWithResult(`${this.props.ROUTE}/${this.state.currentOrder.id}/${type===1?this.props.ROUTE1:this.props.ROUTE2}`, id)
      .then(orderDetail => {
        this.setState({currentOrder: {...this.state.currentOrder, subtotal:orderDetail.subtotal, tax:orderDetail.tax, total:orderDetail.total}})
        type===1?this.removeOrderProductDetail(idOrderDetail):this.removeOrderPromotionDetail(idOrderDetail)
      })
      .catch(this.setError)
  }

  render() {
    const value = {
      objList: this.state.objList,
      objListAux: this.state.objListAux,
      showForm: this.state.showForm,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      showHideForm: this.showHideForm,
      setSelected: this.setSelected,
      getAll: this.getAll,
      submitNewOrder: this.submitNewOrder,
      submitNew: this.submitNew,
      submitProductEdit: this.submitProductEdit,
      submitPromotionEdit: this.submitPromotionEdit,
      delete: this.delete,
      getClientsObj: this.state.clientList,
      getObjArray: this.formType===1?Helper.getOrderProductArray(this.productsList):Helper.getOrderPromotionArray(this.promotionsList),// Helper.getOrdersArray(this.state.clientList),
      getObjArrayProd: Helper.getOrderProductArray(this.productsList),
      getObjArrayProm: Helper.getOrderPromotionArray(this.promotionsList),
      objName: 'Order Detail',
      currentOrder: this.state.currentOrder,
      productsListOrder: this.productsListOrder,
      promotionsListOrder: this.promotionsListOrder,
    }

    return (
      <GenericContext.Provider value={value}>
        <OrderDetailContent />
      </GenericContext.Provider>
    )
  }
}

export default OrderDetailPage;
