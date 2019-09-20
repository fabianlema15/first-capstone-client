import config from '../config'
import TokenService from './token-service';

const GenericApiService = {
  getAll(route) {
      return fetch(`${config.API_ENDPOINT}/${route}`, {
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

  getById(route, id) {
        return fetch(`${config.API_ENDPOINT}/${route}/${id}`, {
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

  saveNew(route, obj) {
    return fetch(`${config.API_ENDPOINT}/${route}`, {
      method: 'POST',
      headers: {
        "Authorization": `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  saveExisting(route, id, obj) {
    return fetch(`${config.API_ENDPOINT}/${route}/${id}`, {
      method: 'PATCH',
      headers: {
        "Authorization": `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : Promise.resolve('OK')
      )
  },

  delete(route, id) {
    return fetch(`${config.API_ENDPOINT}/${route}/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : Promise.resolve('OK')
      )
  },

  deleteWithResult(route, id) {
    return fetch(`${config.API_ENDPOINT}/${route}/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }

}

export default GenericApiService;
