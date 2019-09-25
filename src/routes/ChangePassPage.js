import React from 'react';
import GenericContext from '../contexts/GenericContext'
import ChangePassContent from '../components/User/ChangePass'
import AuthApiService from '../services/auth-api-service';
import TokenService from '../services/token-service'

class ChangePassPage extends React.Component{
  static defaultProps = {
    ROUTE : 'logins'
  }

  state = {
    error: null,
    changed: false,
  };

  setError = error => {
    this.setState({ error: error.error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  changePassword = (e) => {
    e.preventDefault();
    const { password, password_rep } = e.target;
    if (password.value !== password_rep.value)
      this.setError({error: 'Passwords do not match!'})
    else
      AuthApiService.changePassword({id: TokenService.decodeUser().user_id, password: password.value})
        .then(result => this.setState({changed: true}))
        .catch(this.setError)
  }

  render() {
    const value = {
      clearError: this.clearError,
      error: this.state.error,
      changePassword: this.changePassword,
      setError: this.setError,
      objName: 'Change Password',
      changed: this.state.changed
    }

    return (
      <GenericContext.Provider value={value}>
        <ChangePassContent />
      </GenericContext.Provider>
    )
  }
}

export default ChangePassPage;
