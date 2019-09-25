import React, { Component } from 'react'

export default class NotFoundPage extends Component {
  toLogin = (e) => {
    this.props.history.push('/login')
  }

  render() {
    return (<main>
      <section>
        <h1>Liquor Store App</h1>
        <p>This is a private app to manage a liquor store business. The administrators should provide you a code user and password to access to the app.</p>
        <button className='blue' type='button' onClick={this.toLogin}>Log In</button>
        <section>
          <div className="title-box" >Demo access</div>
          <div>User Code: 202033</div>
          <div>Password: 202033</div>
        </section>
      </section>
      </main>
    )
  }
}
