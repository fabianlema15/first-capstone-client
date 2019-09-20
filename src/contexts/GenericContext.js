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
})
export default GenericContext
