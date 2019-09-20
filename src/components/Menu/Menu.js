import React from 'react';
import { withRouter } from 'react-router-dom';
import './Menu.css'
import Helper from '../Utils/Helper'
import TokenService from '../../services/token-service'
import IdleService from '../../services/idle-service'
import menuImage from '../../images/menu_icon.png'

class Menu extends React.Component {

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.props.history.push('/login')
  }

  getMenuAccess = () => {
    return [{
        path: '/products',
        label: 'Products'
    },{
        path: '/clients',
        label: 'Clients'
    },{
        path: '/users',
        label: 'Users'
    },{
        path: '/promotions',
        label: 'Promotions'
    },{
        path: '/orders',
        label: 'Orders'
    },{
        path: '/reports',
        label: 'Reports'
    }]
  }

  redirectTo = (path) => {
    this.props.history.push(path)
  }

  changePassword = () => {
    this.props.history.push('/password')
  }

  getMenus = () => {
    const decoded = TokenService.decodeUser();
    return this.getMenuAccess().map((menu, idx) => {
      if (Helper.roleHasAccess(decoded.role, menu.path))
        return <div key={idx} className='main-item'> <div className='menu-item'>
        {menu.label}
          <button className='border-gray' onClick={e => this.redirectTo(menu.path)} ><img src={menuImage} alt={menu.label}></img></button>
        </div></div>
      else
      return '';
    }

  )}

 render(){
   return <main>
          <section>
              {this.getMenus()}
              <div className='main-item'>
                <div className='menu-item'>
                  Change Password
                  <button className='border-gray' onClick={this.changePassword} ><img src={menuImage} alt='Icon'></img></button>
                </div>
              </div>
            <div className='main-item'>
              <div className='menu-item'>
                Logout
                <button className='border-gray' onClick={this.handleLogoutClick} ><img src={menuImage} alt='Icon'></img></button>
              </div>
            </div>
          </section>
        </main>
 }
}

export default withRouter(Menu);
