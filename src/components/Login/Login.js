import React from 'react';
import './Login.css';
import { Input } from '../Utils/FormElements';
import GenericContext from '../../contexts/GenericContext'

class Login extends React.Component{
  static contextType = GenericContext;

  state = {
    user_code: '',
    password: ''
  }

  clickNumber = (number) => {
    if (this.context.error){
      this.context.clearError()
    }
    if (!this.context.userCode && this.state.user_code.length < 6)
      this.setState({
        user_code: this.state.user_code+''+number
      })
    else if (this.context.userCode && this.state.password.length < 6){
      this.setState({
        password: this.state.password+''+number
      })
    }
  }

  clearNumber = (e) => {
    this.context.clearError()
    if (!this.context.userCode)
      this.setState({
        user_code: ''
      })
    else
      this.setState({
        password: ''
      })
  }

  checkNumber = (e) => {
    if (!this.context.userCode){
      if (this.state.user_code !== '')
        this.context.checkUserCode(this.state.user_code);
      else
        this.context.setError({error:'No code inserted'})
    }
    else{
      if (this.state.password !== '')
        this.context.checkLogin(this.state.password);
      else
        this.context.setError({error:'No password inserted'})
    }
  }

  createButtons = () => {
    let buttonsHtml = [];
    for (let i = 0; i < 10; i++){
      if (i===9) buttonsHtml.push(<button key={i} className='gray' onClick={e => this.clickNumber(0)}><span>0</span></button>)
      else buttonsHtml.push(<button key={i} className='gray' onClick={e => this.clickNumber(i+1)}><span>{i+1}</span></button>)
    }
    return buttonsHtml;
  }

  render(){
    return <main role="main">
        <section>
          <fieldset className='login-input'>
            {!this.context.userCode && <Input id='user_code' value={this.state.user_code} label='User Code' type='number' required readOnly/>}
            {this.context.userCode && <Input id='password' value={this.state.password} label='Password' type='password' required readOnly/>}
          </fieldset>
        </section>
        {this.context.error && <section><div className='errorMsg'>{this.context.error}</div></section>}
        <section>
          <div className="numbers-panel panel">
            {this.createButtons()}
          </div>
          <div className="buttons">
            <button className='orange' onClick={this.clearNumber}>Clear</button>
            <button className='green' onClick={this.checkNumber}>Next</button>
          </div>
        </section>
      </main>
  }
}

export default Login;
