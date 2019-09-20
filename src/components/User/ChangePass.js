import React from 'react';
import { Input } from '../Utils/FormElements';
import GenericContext from '../../contexts/GenericContext';
import Header from '../Header/Header'

class Report extends React.Component{
  static contextType = GenericContext;

  state = {
    password: '',
    password_rep: '',
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
        <Header />
      <main className='content-with-nav'>
      {this.context.error && <section><div className='errorMsg'>{this.context.error}</div></section>}
      <section>
        <form onSubmit={this.context.changePassword}>
          <h3>Change Password</h3>
          <Input id='password' value={this.state.password} label='Password' type='password' onChange={this.handleInputChange}/>
          <Input id='password_rep' value={this.state.password_rep} label='Repeat Password' type='password' onChange={this.handleInputChange}/>
          {!this.context.changed ? <button className='green' type='submit'>Change Password</button> : <div>Password changed</div>}
        </form>
      </section>
    </main>
    </div>
  }
}

export default Report;
