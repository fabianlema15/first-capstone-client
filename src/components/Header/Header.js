import React from 'react';
import GenericContext from '../../contexts/GenericContext'
import { Link } from 'react-router-dom';
import './Header.css'

class Product extends React.Component{
  static contextType = GenericContext;

  render(){
    return <nav>
      <div className='back-nav'><Link
        to={this.props.back || '/menu'}>
        Back
      </Link></div>
      <div className='name-nav'><h2>{this.context.objName}s</h2></div>
    </nav>
  }
}

export default Product;
