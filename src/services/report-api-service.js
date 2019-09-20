import config from '../config'
import TokenService from './token-service'

const ReportApiService = {

  getReport(user_id, from, to) {
    return fetch(`${config.API_ENDPOINT}/orders/filter/${user_id}/${from}/${to}`, {
      headers: {
        "Authorization": `bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
  },

  sendReportEmail(reportInfo) {
    return fetch(`${config.API_ENDPOINT}/orders/send/mail`, {
      method: 'POST',
      headers: {
        "Authorization": `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(reportInfo),
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  }

}

export default ReportApiService;
