import React from 'react';
import GenericContext from '../contexts/GenericContext'
import LoginContent from '../components/Login/RegularLogin'
import GenericApiService from '../services/generic-api-service';
import AuthApiService from '../services/auth-api-service';

class LoginPage extends React.Component{
  static defaultProps = {
    ROUTE : 'logins'
  }

  state = {
    userCode: null
  };

  setUserCode = userCode => {
    this.setState({ userCode })
  }

  setError = error => {
    this.setState({ error: error.error, loading: false })
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

  checkLogin = password => {
    const loginData = {
      user_code: this.state.userCode,
      password: password,
    }
    AuthApiService.login(loginData)
      .then(result => {
        this.props.history.push(`/menu`)
      })
      .catch(this.setError)
  }

  submitLogin = e => {
    e.preventDefault();
    this.setState({loading: true})
    const { user_code, password } = e.target;
    const loginData = {
      user_code: user_code.value,
      password: password.value,
    }
    AuthApiService.login(loginData)
      .then(result => {
        this.props.history.push(`/menu`)
      })
      .catch(this.setError)
  }

  render() {
    const value = {
      clearError: this.clearError,
      error: this.state.error,
      submitLogin: this.submitLogin,
      setError: this.setError,
      loading: this.state.loading,
      objName: 'Log In',
    }

    return (
      <GenericContext.Provider value={value}>
        <LoginContent />
      </GenericContext.Provider>
    )
  }
}

export default LoginPage;
