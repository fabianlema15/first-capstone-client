import React from 'react';
import GenericContext from '../contexts/GenericContext'
import MenuContent from '../components/Menu/Menu'
import GenericApiService from '../services/generic-api-service';
import AuthApiService from '../services/auth-api-service';

class MenuPage extends React.Component{
  static defaultProps = {
    ROUTE : 'logins'
  }

  state = {
    userCode: null
  };

  setUserCode = userCode => {
    this.setState({ userCode })
  }


  setMenuList = objList => {
    this.setState({ objList })
  }

  setError = error => {
    this.setState({ error: error.error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  checkUserCode = user_code => {
    GenericApiService.getAll(`users/is/${user_code}`)
      .then(result => {
        this.setState({
          userCode: user_code
        })
      })
      .catch(this.setError)
  }

  checkMenu = password => {
    const loginData = {
      user_code: this.state.userCode,
      password: password,
    }
    AuthApiService.login(loginData)
      .then(result => {
        this.props.history.push(`/orders`)
      })
      .catch(this.setError)
  }

  render() {
    const value = {
      clearError: this.clearError,
      userCode: this.state.userCode,
      setUserCode: this.setUserCode,
      error: this.state.error,
      checkUserCode: this.checkUserCode,
      checkMenu: this.checkMenu
    }

    return (
      <GenericContext.Provider value={value}>
        <MenuContent />
      </GenericContext.Provider>
    )
  }
}

export default MenuPage;
