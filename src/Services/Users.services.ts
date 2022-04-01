import { store } from '../Reducer'
import { authedFetch } from './authedFetch'
import { IAPIResponseCollection, IDBStaff } from '/project/globalInterface'

export class UserServices {
  static loadUser = (page: number = 1) => 
  UserServices.fetchUser({ page: page, itemPerPage: 20 })
    .then(async res => {
      const { Resources, ...rest } = res
      store.dispatch({ 
        type: "DOWNLOAD_USER_LIST_SUCCESS2", 
        payload: { users: Resources, ...rest }
      })
    })

  static fetchUser = (props: { page:number, itemPerPage?:number}) => 
    authedFetch<IAPIResponseCollection<IDBStaff>>(`https://hrm.opennet.com.kh/api/hrm/users?page=${props.page}&itemPerPage=${props.itemPerPage||100}`)
}