import { store } from '../Reducer'
export function authedFetch<T>(url: RequestInfo, init?:RequestInit){
  return fetch(url, init)
  .then( async res => {
    if(res.status == 401){ 
      store.dispatch({ "type": "UPDATE_APP_STATE", payload: "AUTHENTICATING" })
      store.dispatch({ type: 'USER_LOGOUT_REQUEST', payload: { message: 'Cookie token expired' } })
      throw new Error(`Authentication is required`)
    }
    if(res.status == 403){
      store.dispatch({ "type": "UPDATE_APP_STATE", payload: "AUTHENTICATING" })
      store.dispatch({ type: 'APIDispatchError', payload: { err: 'You are not allowed to access this resources' } })
      throw new Error(`Unauthorized`) 
    }
    if(res.status == 500){
      store.dispatch({ type: 'APIDispatchError', payload: { "err": 'Internal Server Error' }})
      throw new Error(`Server Interal Error`)  
    }
    try {
      const responseObject = await res.json()
      return responseObject as T
    } catch(err){
      store.dispatch({ type: 'APIDispatchError', payload: { "err": (err as unknown as any).message }})
      throw err
    }
  })
}