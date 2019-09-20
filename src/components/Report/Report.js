import React from 'react';
import { Input, Select } from '../Utils/FormElements';
import GenericContext from '../../contexts/GenericContext';
import ReportList from './ReportList';
import Header from '../Header/Header'

class Report extends React.Component{
  static contextType = GenericContext;

  state = {
    from: '',
    to: '',
    user_id: '',
    mail_to: '',
  }

  handleInputChange = e => {
    if (this.context.error) this.context.clearError();
    const input = e.target.id;
    const value = e.target.value;
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
        <form onSubmit={this.context.getReport}>
          <h3>Reports</h3>
          <Input id='from' value={this.state.from} label='From' type='date' onChange={this.handleInputChange}/>
          <Input id='to' value={this.state.to} label='to' type='date' onChange={this.handleInputChange}/>
          <Select id='user_id' value={this.state.user_id} label='User' onChange={this.handleInputChange} options={this.context.userList}/>
          <button className='green' type='submit'>Get Report</button>
        </form>
      </section>
      <section>
        <ReportList />
      </section>
      {this.context.error && <section><div className='errorMsg'>{this.context.error}</div></section>}
      {Object.keys(this.context.orderList).length>0 && <section><div>
        <Input id='mail_to' value={this.state.mail_to} label='Send by email to' type='mail' onChange={this.handleInputChange}/>
        <button type='button' className='blue' onClick={e => this.context.sendMail(this.state)}>Send email</button>
        </div><div>{this.context.msgResponse}</div></section>}
    </main>
    </div>
  }
}

export default Report;
