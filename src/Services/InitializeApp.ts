import { IDBDepartment, IDBBranch, IDBUserPosition, IAPIResponseCollection } from '/project/globalInterface'
import { store } from '../Reducer'
import { UserServices } from './Users.services'

export function initializeApp(){
  return Promise.all([
    fetch('https://hrm.opennet.com.kh/api/hrm/departments').then(res => res.json() as Promise<IAPIResponseCollection<IDBDepartment>>),
    fetch('https://hrm.opennet.com.kh/api/hrm/branches').then(res => res.json() as Promise<IAPIResponseCollection<IDBBranch>>),
    fetch('https://hrm.opennet.com.kh/api/hrm/positions').then(res => res.json() as Promise<IAPIResponseCollection<IDBUserPosition>>),
    UserServices.fetchUser({ page: 1, itemPerPage: 20 }).then(res => res)
  ])
  .then(([ department, branch, position, user ]) => {
    store.dispatch({ 'type': 'BRANCHES_DOWNLOAD_SUCCESS', payload: branch.Resources })
    store.dispatch({ 'type': 'DEPARTMENT_DOWNLOAD_SUCCESS', payload: department.Resources })
    store.dispatch({ 'type': 'POSITIONS_DOWNLOAD_SUCCESS', payload: position.Resources })
    store.dispatch({ 'type': 'DOWNLOAD_USER_LIST_SUCCESS2', payload: { 
      users: user.Resources, 
      totalPage: user.totalPages,
      itemperPage: user.itemPerPage,
      selectedPage: user.selectedPage
    }})
  })
}