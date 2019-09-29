import React, { Component } from 'react'
import backArrow from '../images/back.png'
import nextArrow from '../images/next.png'

/*const arrayImgs = [
  {desc: 'Login',
  img: require('../../images/menu_icon.png')}
]*/

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
    return (<main>
      <section className='title-section'>
        <h1>Liquor Store App</h1>
        <p>This is a private app to manage a liquor store business. The employer should provide you a code user and password to access to the app.</p>
        <button className='blue' type='button' onClick={this.toLogin}>Log In</button>
        <section>
          <div className="title-box" >Demo access</div>
          <div>User Code: 202033</div>
          <div>Password: 202033</div>
        </section>
      </section>
      <section>
        <h3>Functionalities</h3>
        <ul>
          <li>There are 3 roles: admin, manager, and seller.</li>
          <li>As the admin should able to access all functionalities of the app.</li>
          <li>The manager can see and manage (CRUD) a list of all products, clients, sales, and sellers.</li>
          <li>Admin can create new accounts with any role.</li>
          <li>Managers can create promotions (combos) that can have many products and the quantity of each one.</li>
          <li>As the manager could daily report of all employees, manage products and its stocks, also manages one new sale. Get reports of sales and products.</li>
          <li>Manage can get reports of sales by any seller.</li>
          <li>Users should access the app using code with 6 numbers.</li>
          <li>The client should have basic information to be contacted if is necessary.</li>
          <li>Each sale can add new products and manage quantity. The total by each product and all products should be calculated automatically.</li>
          <li>The product of each product inside of promotions should be updated automatically after the new sale.</li>
          <li>Each product should behave at least information on stock, price, and picture.</li>
          <li>Reports should be sended by email.</li>
          <li>The app should be focused on use in phone or tablet device.</li>
        </ul>
      </section>
      <section>
        <h3>Images</h3>
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
      </section>

      </main>
    )
  }
}
