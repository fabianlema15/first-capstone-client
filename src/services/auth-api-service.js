import config from '../config'
import TokenService from './token-service'
import IdleService from './idle-service'

const AuthApiService = {

  login(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      ).then(res => {
        /*
          whenever a logint is performed:
          1. save the token in local storage
          2. queue auto logout when the user goes idle
          3. queue a call to the refresh endpoint based on the JWT's exp value
        */
        TokenService.encodeUser(res.id, res.role);
        TokenService.saveAuthToken(res.authToken)
        IdleService.regiserIdleTimerResets()
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthApiService.postRefreshToken()
        })
        return res
      })
  },

  postRefreshToken(){
    return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res =>
    (!res.ok) ? res.json().then(e => Promise.reject(e))
    : res.json()
  ).then(res => {
        /*
          similar logic to whenever a user logs in, the only differences are:
          - we don't need to queue the idle timers again as the user is already logged in.
          - we'll catch the error here as this refresh is happening behind the scenes
        */
        //TokenService.encodeUser(res.id, res.role);
        TokenService.saveAuthToken(res.authToken)
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthApiService.postRefreshToken()
        })
        return res
      })
      .catch(err => {
        console.log('refresh token request error')
        console.error(err)
      })
  },

  changePassword(credentials) {
    console.log(credentials);
    return fetch(`${config.API_ENDPOINT}/auth/changepassword`, {
      method: 'PATCH',
      headers: {
        "Authorization": `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
}

export default AuthApiService;
