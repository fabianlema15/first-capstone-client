import React from 'react'
//import GenericApiService from '../services/generic-api-service';

const GenericContext = React.createContext({
  productList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setProductList: () => {},
  showForm: () => {},
  hideForm: () => {},
  getAll: () => {},
})
export default GenericContext
