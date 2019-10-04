import React from 'react';
import GenericContext from '../../contexts/GenericContext'
import { Link } from 'react-router-dom';
import './Header.css'

class Product extends React.Component{
  static contextType = GenericContext;

  render(){
    return <nav>
      <div className='name-centered'><h1>{this.context.objName}</h1></div>
      {!this.props.notBack && <div className='back-nav'>
        <Link
          to={this.props.back || '/menu'}>
          Back
        </Link>
      </div>}
      {this.context.loading && <div className="loading">Loading..</div> }
    </nav>
  }
}

export default Product;
