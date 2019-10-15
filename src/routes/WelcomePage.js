import React, { Component } from 'react'
import backArrow from '../images/back.png'
import nextArrow from '../images/next.png'

export default class NotFoundPage extends Component {
  static defaultProps = {
		desImgs : ['Login', 'Main menu', 'List products', 'Description each item', 'Orders', 'Order detail', 'Report', 'Change password']
	}

  state = {
    count: 1
  }

  toLogin = (e) => {
    this.props.history.push('/login')
  }

  backButton = (e) => {
    this.setState({
      count: this.state.count===1 ? 8: this.state.count - 1
    })
  }

  nextButton = (e) => {
    this.setState({
      count: this.state.count===8 ? 1: this.state.count + 1
    })
  }

  render() {
    return (<div>
      <nav>
        <div className='main-title'><h1>Liquor Store App</h1></div>
        <button className='green main-button' type='button' onClick={this.toLogin}>Log In</button>
        {this.context.loading && <div className="loading">Loading..</div> }
      </nav>
      <main className='content-with-nav'>
      <section className='title-section'>
        <section>
          <p>This app could be used by any liquor store because this provides you with facilities to create, edit and delete products, clients, promotions (combos), and users to use the app. Also, you could control your sells getting a report by a period of time.</p>
          <div className='title-subsection'>Users can access this app depending on what role is:
            <ul>
              <li>Admin: Can have access to all functionalities.</li>
              <li>Manager: Have access to manage products, promotions, and sells.</li>
              <li>Seller: Just have access to create manage orders.</li>
            </ul>
          </div>
          <div className='title-subsection'>Follow the next steps to give access to your collaborators:
            <ol>
              <li>Access as admin and create a new user.</li>
              <li>The system should generate a code easy to remember.</li>
              <li>For first access, the password is the same as the user code.</li>
              <li>Enjoy the functionalities.</li>
            </ol>
          </div>
        </section>
      </section>
      <div>
        <h3>Screenshots</h3>
        <div className="polaroid">
          <img src={require(`../images/${this.state.count}.png`)} alt="Description"/>
          <div className="container">
            <p>{`${this.state.count}. ${this.props.desImgs[this.state.count - 1]}`}</p>
          </div>
        </div>
        <div>
          <button className='imageb back-image' onClick={this.backButton}><img src={backArrow} alt='Back'/></button>
          <button className='imageb next-image' onClick={this.nextButton}><img src={nextArrow} alt='Back'/></button>
        </div>
      </div>

      </main>
    </div>
    )
  }
}
