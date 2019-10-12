import React from 'react';
import GenericNew from '../Generic/GenericNew';
import GenericSubNew from '../Generic/GenericSubNew';
import PromotionNew from './PromotionNew';
import GenericList from '../Generic/GenericList';
import GenericSubList from '../Generic/GenericSubList';
import GenericContext from '../../contexts/GenericContext'
import Header from '../Header/Header'
import './Promotion.css'

class Promotion extends React.Component{
  static contextType = GenericContext;

  componentDidMount() {
    this.context.clearError()
    this.context.getAll()
  }

  render(){
    return <div>
        <Header />
      <main className='content-with-nav'>
        <section>
          {(this.context.showForm && !this.context.newProduct) && <GenericNew />}
          {(this.context.showForm && this.context.newProduct) && <PromotionNew />}
          {this.context.error && <section><div className='errorMsg'>{this.context.error}</div></section>}
          {this.context.newProduct && <section className='sub-promotion'>
            {(this.context.showSubForm) && <GenericSubNew />}
            {!this.context.showSubForm && <button className='blue' onClick={e => this.context.showHideSubForm(!this.context.showSubForm)}>Add Product to Promotion</button>}
            <section>
              <GenericSubList/>
            </section>
            </section>}
          {!this.context.showForm && <button className='blue' onClick={e => this.context.showHideForm(!this.context.showForm)}>Add</button>}
        </section>
        <section>
          <section>Heroku server has restrictions about stored images and to send email, for this reason, images from product and promotion that are uploaded are not showing. Also the email is not sending.</section>
          <GenericList/>
        </section>
      </main>
    </div>
  }
}

export default Promotion;
