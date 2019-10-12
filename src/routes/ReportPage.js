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
    this.setState({ orderList, loading: false })
  }

  setError = error => {
    this.setState({ error: error.error || 'We got some error', loading: false })
  }

  clearError = () => {
    this.setState({ error: null, msg: null })
  }

  getReport = (e) => {
    e.preventDefault();
    const {user_id, from, to } = e.target;
    let dateFrom = from.value;
    let dateTo = to.value;
    const dateformat = /^(((0[13578]|1[02])\/(0[1-9]|[12]\d|3[01])\/((19|[2-9]\d)\d{2}))|((0[13456789]|1[012])\/(0[1-9]|[12]\d|30)\/((19|[2-9]\d)\d{2}))|(02\/(0[1-9]|1\d|2[0-8])\/((19|[2-9]\d)\d{2}))|(02\/29\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;

    let splited=dateFrom.split('-');
    if (splited.length === 3){
      dateFrom = `${splited[1]}/${splited[2]}/${splited[0]}`
    }
    splited=dateTo.split('-');
    if (splited.length === 3){
      dateTo = `${splited[1]}/${splited[2]}/${splited[0]}`
    }

    if(dateFrom.match(dateformat) && dateTo.match(dateformat)){
      const dateFromSplit = dateFrom.split('/');
      const dateToSplit = dateTo.split('/');
      this.setState({loading: true})
      ReportApiService.getReport(user_id.value, `${dateFromSplit[2]}-${dateFromSplit[0]}-${dateFromSplit[1]}`, `${dateToSplit[2]}-${dateToSplit[0]}-${dateToSplit[1]}`)
        .then(result => {
          if (result.length > 0)
            this.setOrderList(Helper.serializeObj(result))
            else
            this.setState({msg: 'There are no data on the selected dates', orderList: {}, loading: false})
        })
        .catch(this.setError)
    }else{
      this.setError({error: 'Incorrect date format'})
    }

  }

  sendMail = (reportInfo) => {
    let dateFrom = reportInfo.from;
    let dateTo = reportInfo.to;
    const dateformat = /^(((0[13578]|1[02])\/(0[1-9]|[12]\d|3[01])\/((19|[2-9]\d)\d{2}))|((0[13456789]|1[012])\/(0[1-9]|[12]\d|30)\/((19|[2-9]\d)\d{2}))|(02\/(0[1-9]|1\d|2[0-8])\/((19|[2-9]\d)\d{2}))|(02\/29\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;

    let splited=dateFrom.split('-');
    if (splited.length === 3){
      dateFrom = `${splited[1]}/${splited[2]}/${splited[0]}`
    }
    splited=dateTo.split('-');
    if (splited.length === 3){
      dateTo = `${splited[1]}/${splited[2]}/${splited[0]}`
    }

    if(dateFrom.match(dateformat) && dateTo.match(dateformat)){
      const dateFromSplit = dateFrom.split('/');
      const dateToSplit = dateTo.split('/');
      if (!Helper.objHasEmpty(reportInfo)){
        reportInfo.from = `${dateFromSplit[2]}-${dateFromSplit[0]}-${dateFromSplit[1]}`;
        reportInfo.to = `${dateToSplit[2]}-${dateToSplit[0]}-${dateToSplit[1]}`;
        ReportApiService.sendReportEmail(reportInfo)
        .then(result => {
          this.setState({
            msgResponse: 'Email sent'
          })
        })
        .catch(this.setError)
      }else{
        this.setError({error: 'You need email'})
      }
    }else{
      this.setError({error: 'Incorrect date format'})
    }

  }

  render() {
    const value = {
      clearError: this.clearError,
      userCode: this.state.userCode,
      setUserCode: this.setUserCode,
      error: this.state.error,
      msg: this.state.msg,
      userList: this.state.userList,
      getReport: this.getReport,
      orderList: this.state.orderList,
      sendMail: this.sendMail,
      msgResponse: this.state.msgResponse,
      objName: 'Report',
      loading: this.state.loading,
    }

    return (
      <GenericContext.Provider value={value}>
        <ReportContent />
      </GenericContext.Provider>
    )
  }
}

export default ReportPage;
