import { IAPIAuthedContext } from '/project/globalInterface'
import { store } from '../Reducer'

const failed = (message:string) => {
  store.dispatch({ type: 'USER_LOGOUT_REQUEST', payload: { message: message }})
  store.dispatch({ type: "UPDATE_APP_STATE", payload: "AUTHENTICATING" })
}
function authenticate(username: string, password: string){
  return fetch('https://hrm.opennet.com.kh/api/authentication/login', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: {
        email: username,
        password
      }
    })
  })
  .then(res => { 
    if(res.ok) return res.json().then(res => res as IAPIAuthedContext)
                                .then(user => { 
                                  store.dispatch({ type: "UPDATE_APP_STATE", payload: "INITIALIZING" })
                                  store.dispatch({ type: 'USER_LOGIN_SUCCESS', payload: user })
                                })
    return res.json()
      .then(error => {
        failed(error.message)
      })
      .catch(() => failed('Login failed'))
    })
}

function verifycookie(){
  return fetch("https://hrm.opennet.com.kh/api/authentication/verifycookie", 
    { method: "GET" }
  )
  .then(res => {
    if(res.ok) return res.json().then(res => res as IAPIAuthedContext)
                                .then(user => {
                                  store.dispatch({ type: "UPDATE_APP_STATE", payload: "INITIALIZING" })
                                  store.dispatch({ type: 'USER_LOGIN_SUCCESS', payload: user }) 
                                })
    return res.json()
      .then(err => failed(err.message))
      .catch(() => failed('Can not verify cookie'))
  })
}

function logout(){
  return fetch('https://hrm.opennet.com.kh/api/authentication/logout', { method: 'DELETE' })
  .then(async res => {
    if(res.ok){
      const message = await res.json().then(res => res.message )
      store.dispatch({ type: "UPDATE_APP_STATE", payload: "AUTHENTICATING" }),
      store.dispatch({ type: "USER_LOGOUT_REQUEST", payload: { message }})
    }
  })
}

export class Authentication {
  static authenticate = authenticate
  static verifycookie = verifycookie
  static logout = logout
}