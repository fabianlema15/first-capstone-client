import React from 'react';
import GenericContext from '../contexts/GenericContext'
import ProductContent from '../components/Product/Product'
import GenericApiService from '../services/generic-api-service';
import UploadApiService from '../services/upload-api-service';
import Helper from '../components/Utils/Helper';

class ProductPage extends React.Component{
  static defaultProps = {
    ROUTE : 'products'
  }

  state = {
    objList: {},
    error: null,
    showForm: false,
  };

  setProductList = objList => {
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

  setSelected = (idProduct, selected=true) => {
    const product = this.state.objList[idProduct];
    product.selected = selected;
    this.setState({
      objList: {
        ...this.state.objList,
        [idProduct]:product
      }
    })
  }

  addProduct = product => {
    this.setState({
      objList: {
        ...this.state.objList,
        [product.id]:product},
      showForm: false
    })
  }

  editProduct = (idProduct, productUpdated) => {
    productUpdated.selected = false
    Object.assign(this.state.objList[idProduct], productUpdated);
    this.setState({
      objList:{
        ...this.state.objList,
        [idProduct]:this.state.objList[idProduct]}
    })
  }

  removeProduct = (idProduct) => {
    const { [idProduct]: id, ...rest } = this.state.objList;
    this.setState({
      objList: rest
    })
  }

  getAll = () => {
    GenericApiService.getAll(this.props.ROUTE)
      .then(result => this.setProductList(Helper.serializeObj(result)))
      .catch(this.setError)
  }

  submitNew = (e) => {
    e.preventDefault();
    const { name, picture, stock, price, description } = e.target;
    const fileName = `${Date.parse(new Date())}.${picture.files[0].name.split('.').pop()}`;
    const newProduct = {
      name: name.value,
      picture: fileName,
      stock: stock.value,
      price: price.value,
      description: description.value
    }

    GenericApiService.saveNew(this.props.ROUTE, newProduct)
      .then(this.addProduct)
      .then(() => UploadApiService.uploadImage(picture.files[0], fileName))
      .then(res => console.log(res))
      .catch(this.setError)

  }

  submitEdit = (e) => {
    e.preventDefault();
    const { id, name, picture, stock, price, description } = e.target;
    const newProduct = {
      name: name.value,
      picture: picture.value,
      stock: stock.value,
      price: price.value,
      description: description.value
    }

    GenericApiService.saveExisting(this.props.ROUTE, id.value, newProduct)
      .then(() => this.editProduct(id.value, newProduct))
      .catch(this.setError)
  }

  delete = (idProducto) => {
    GenericApiService.delete(this.props.ROUTE, idProducto)
      .then(() => this.removeProduct(idProducto))
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
      getObjArray: Helper.getProductArray(),
      objName: 'Product'
    }

    return (
      <GenericContext.Provider value={value}>
        <ProductContent />
      </GenericContext.Provider>
    )
  }
}

export default ProductPage;
