import React from 'react';
import { Input } from '../Utils/FormElements';
import GenericContext from '../../contexts/GenericContext';
import Header from '../Header/Header'
import { Link } from 'react-router-dom';

class RegularLogin extends React.Component{
  static contextType = GenericContext;

  state = {
    user_code: '',
    password: '',
  }

  handleInputChange = e => {
    if (this.context.error) this.context.clearError();
    const input = e.target.id;
    const value = e.target.value;
    if (!isNaN(parseInt(value)) || value==='')
      this.setState({
        [input]: value
      })
  }

  render(){
    return <div>
        <Header notBack={true}/>
      <main className='content-with-nav'>
      {this.context.error && <section><div className='errorMsg'>{this.context.error}</div></section>}
      <section>
        <h4>Insert credentials provided by your employer</h4>
        <form onSubmit={this.context.submitLogin}>
          <Input id='user_code' value={this.state.user_code} label='User Code' type='number' onChange={this.handleInputChange}/>
          <Input id='password' value={this.state.password} label='Password' type='password' onChange={this.handleInputChange}/>
          <Link to='/'>Cancel</Link>
          {!this.context.changed ? <button className='green' type='submit'>Log In</button> : <div>Password changed</div>}
        </form>
        <section>
          <div className="title-box">Demo access</div>
          <div>User Code: 202033</div>
          <div>Password: 202033</div>
        </section>
      </section>
    </main>
    </div>
  }
}

export default RegularLogin;
