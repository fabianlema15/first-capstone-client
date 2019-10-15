import React from 'react';
import GenericContext from '../contexts/GenericContext'
import PromotionContent from '../components/Promotion/Promotion'
import GenericApiService from '../services/generic-api-service';
import UploadApiService from '../services/upload-api-service';
import Helper from '../components/Utils/Helper';

class PromotionPage extends React.Component{
  static defaultProps = {
    ROUTE : 'promotions',
    SUBROUTE : 'products'
  }

  state = {
    objList: {},
    objSubList: {},
    error: null,
    showForm: false,
    showSubForm: false,
    newProduct: null
  };

  componentDidMount() {
    GenericApiService.getAll('products')
      .then(result => {
        this.productsList = result.map(product => {
          return {
            id: product.id,
            value: product.name
          }})
      })
      .catch(this.setError)
  }

  setPromotionList = objList => {
    this.setState({ objList, loading: false })
  }

  setPromotionSubList = objSubList => {
    this.setState({ objSubList })
  }

  setError = error => {
    this.setState({ error: error.error, loading: false })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setNewProduct = product => {
    this.setState({newProduct: product })
  }

  showHideForm = show => {
    this.setState({ showForm: show })
  }

  showHideSubForm = show => {
    this.setState({ showSubForm: show })
  }

  setSelected = (idPromotion, selected=true) => {
    const promotion = this.state.objList[idPromotion];
    promotion.selected = selected;
    this.setState({
      objList: {
        ...this.state.objList,
        [idPromotion]:promotion
      }
    })
  }

  addPromotion = promotion => {
    this.setState({
      objList: {
        ...this.state.objList,
        [promotion.id]:promotion},
      showForm: false,
      loading: false
    })
  }

  addSubPromotion = promotion_producto => {
    this.setState({
      objSubList: {
        ...this.state.objSubList,
        [promotion_producto.id]:promotion_producto},
      showSubForm: false
    })
  }

  editPromotion = (idPromotion, promotionUpdated) => {
    promotionUpdated.selected = false
    Object.assign(this.state.objList[idPromotion], promotionUpdated);
    this.setState({
      objList:{
        ...this.state.objList,
        [idPromotion]:this.state.objList[idPromotion]},
      loading: false
    })
  }

  removePromotion = (idPromotion) => {
    const { [idPromotion]: id, ...rest } = this.state.objList;
    this.setState({
      objList: rest
    })
  }

  removeSubPromotion = (idPromotionProduct) => {
    const { [idPromotionProduct]: id, ...rest } = this.state.objSubList;
    this.setState({
      objSubList: rest
    })
  }

  getAll = () => {
    this.setState({loading: true})
    GenericApiService.getAll(this.props.ROUTE)
      .then(result => this.setPromotionList(Helper.serializeObj(result)))
      .catch(this.setError)
  }

  submitNew = (e) => {
    e.preventDefault();
    const { name, picture, stock, price, description } = e.target;
    const fileName = `${Date.parse(new Date())}.${picture.files[0].name.split('.').pop()}`;
    const newPromotion = {
      name: name.value,
      picture: fileName,
      stock: stock.value,
      price: price.value,
      description: description.value
    }

    let promotionAdded = {}
    this.setState({loading: true})
    GenericApiService.saveNew(this.props.ROUTE, newPromotion)
      .then(promotion => {
        promotionAdded = promotion
      })
      .then(() => UploadApiService.uploadImage(picture.files[0], fileName))
      .then(res => {
          this.setNewProduct(promotionAdded)
      })
      .catch(this.setError)
  }

  submitSubNew = (e) => {
    e.preventDefault();
    const { product_id, quantity } = e.target;
    const promotion_id = this.state.newProduct.id;
    const newPromotion = {
      product_id: product_id.value,
      quantity: quantity.value,
      promotion_id: promotion_id,
    }
    this.setState({loading: true})
    GenericApiService.saveNew(`${this.props.ROUTE}/${promotion_id}/${this.props.SUBROUTE}`, newPromotion)
      .then(this.addSubPromotion)
      .catch(this.setError)
  }

  submitEdit = (e) => {
    e.preventDefault();
    const { id, name, picture, stock, price, description } = e.target;
    const fileName = `${Date.parse(new Date())}.${picture.files[0].name.split('.').pop()}`;
    const newPromotion = {
      name: name.value,
      picture: fileName,
      stock: stock.value,
      price: price.value,
      description: description.value
    }

    GenericApiService.saveExisting(this.props.ROUTE, id.value, newPromotion)
      .then(() => UploadApiService.uploadImage(picture.files[0], fileName))
      .then(res => this.editPromotion(id.value, newPromotion))
      .catch(this.setError)
  }

  delete = (idPromotion) => {
    GenericApiService.delete(this.props.ROUTE, idPromotion)
      .then(() => this.removePromotion(idPromotion))
      .catch(this.setError)
  }

  deleteSub = (idPromotionProduct) => {
    const promotion_id = this.state.newProduct.id;
    const idProducto = this.state.objSubList[idPromotionProduct].product.id;
    GenericApiService.delete(`${this.props.ROUTE}/${promotion_id}/${this.props.SUBROUTE}`, idProducto)
      .then(() => this.removeSubPromotion(idPromotionProduct))
      .catch(this.setError)
  }

  render() {
    const value = {
      objList: this.state.objList,
      objSubList: this.state.objSubList,
      showForm: this.state.showForm,
      showSubForm: this.state.showSubForm,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      showHideForm: this.showHideForm,
      showHideSubForm: this.showHideSubForm,
      setSelected: this.setSelected,
      getAll: this.getAll,
      submitNew: this.submitNew,
      submitEdit: this.submitEdit,
      delete: this.delete,
      getObjArray: Helper.getPromotionsArray(),
      getSubObjArray: Helper.getPromotionProductArray(this.productsList),
      objName: 'Promotion',
      newProduct: this.state.newProduct,

      getSubAll: this.getSubAll,
      submitSubNew: this.submitSubNew,
      deleteSub: this.deleteSub,
      loading: this.state.loading,
    }

    return (
      <GenericContext.Provider value={value}>
        <PromotionContent />
      </GenericContext.Provider>
    )
  }
}

export default PromotionPage;
