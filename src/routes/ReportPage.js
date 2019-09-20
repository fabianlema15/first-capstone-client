import React from 'react';
import GenericContext from '../contexts/GenericContext'
import ReportContent from '../components/Report/Report'
import ReportApiService from '../services/report-api-service';
import GenericApiService from '../services/generic-api-service';
import Helper from '../components/Utils/Helper';

class ReportPage extends React.Component{
  static defaultProps = {
    ROUTE : 'logins'
  }

  state = {
    userCode: null,
    userList: [],
    orderList: {},
    msgResponse: ''
  };

  componentDidMount() {
    GenericApiService.getAll('users')
      .then(result => {
        this.setState({userList: result.map(user => {
          return {
            id: user.id,
            value: user.last_name + ' ' + user.first_name
          }})})
      })
      .catch(this.setError)
  }

  setUserCode = userCode => {
    this.setState({ userCode })
  }


  setOrderList = orderList => {
    this.setState({ orderList })
  }

  setError = error => {
    this.setState({ error: error.error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  getReport = (e) => {
    e.preventDefault();
    const {user_id, from, to } = e.target;
    ReportApiService.getReport(user_id.value, from.value, to.value)
      .then(result => {
        console.log(result);
        this.setOrderList(Helper.serializeObj(result))
      })
      .catch(this.setError)
  }

  sendMail = (reportInfo) => {
    if (!Helper.objHasEmpty(reportInfo))
      ReportApiService.sendReportEmail(reportInfo)
      .then(result => {
        console.log(result);
        this.setState({
          msgResponse: 'Email sent'
        })
      })
      .catch(this.setError)
    else{
      this.setError({error: 'You need email'})
    }
  }

  render() {
    const value = {
      clearError: this.clearError,
      userCode: this.state.userCode,
      setUserCode: this.setUserCode,
      error: this.state.error,
      userList: this.state.userList,
      getReport: this.getReport,
      orderList: this.state.orderList,
      sendMail: this.sendMail,
      msgResponse: this.state.msgResponse,
      objName: 'Report'
    }

    return (
      <GenericContext.Provider value={value}>
        <ReportContent />
      </GenericContext.Provider>
    )
  }
}

export default ReportPage;
