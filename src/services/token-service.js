import jwtDecode from 'jwt-decode'
import config from '../config'

let _timeoutId
const _TEN_SECONDS_IN_MS = 10000

const TokenService = {
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token)
  },
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY)
  },
  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  encodeUser(user, role) {
    window.sessionStorage.setItem(config.AUX_KEY, window.btoa(`${user}:${role}`))
  },
  decodeUser() {
    const encoded = window.sessionStorage.getItem(config.AUX_KEY);
    if (encoded){
      const data = window.atob(encoded).split(':');
      return {
        user_id : data[0],
        role: data[1],
      }
    }
  },
  parseJwt(jwt) {
   return jwtDecode(jwt)
 },
 readJwtToken() {
   return TokenService.parseJwt(TokenService.getAuthToken())
 },
 _getMsUntilExpiry(payload) {
   /*
     payload is from the JWT
     the `exp` value is in seconds, need to convert to ms, so * 1000
     calculates the difference between now and when the JWT will expire
   */
   return (payload.exp * 1000) - Date.now()
 },
 queueCallbackBeforeExpiry(callback) {
   /* get the number of ms from now until the token expires */
   const msUntilExpiry = TokenService._getMsUntilExpiry(
     TokenService.readJwtToken()
   )
   /*
     queue a callback that will happen 10 seconds before the token expires
     the callback is passed in as an argument so could be anything,
       in this app, the callback is for calling the refresh endpoint
   */
   _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS)
 },
 clearCallbackBeforeExpiry() {
   clearTimeout(_timeoutId)
 },

}

export default TokenService
