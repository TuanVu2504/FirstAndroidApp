import { 
  AuthenticationState, 
  IAuthenticationAction, 
  pageActions, 
  IOpennetResourceState, TAppActions,
  IDBStaff, Action_Staff, IUserPermission, IModalState, ModalActions
} from '/project/globalInterface'

import { defaultAuthState, OpennetResourceState, defaultModalState } from '/project/globalConstants'

export function auth(state = defaultAuthState, actions: IAuthenticationAction): AuthenticationState{
  switch(actions.type){
    case 'USER_LOGIN_REQUEST': {
      return defaultAuthState
    }
    case 'USER_LOGIN_SUCCESS': {
      const user = actions.payload
      return { ...state, 'loggedIn': true, 'loggedout': false, ...user, }
    }
    case 'USER_LOGOUT_REQUEST': {
      const { payload } = actions
      return { ...defaultAuthState, 'message': payload.message }
    }
    default: return state
  }
}

export function opennetResource(state = OpennetResourceState, actions: pageActions): IOpennetResourceState {
  switch(actions.type){
    case 'BRANCHES_DOWNLOAD_SUCCESS': { return { ...state, branches: actions.payload} }
    case 'DEPARTMENT_DOWNLOAD_SUCCESS': { return { ...state, departments: actions.payload } }
    case 'POSITIONS_DOWNLOAD_SUCCESS': { return { ...state, postitions: actions.payload } }
    default: return state
  }
}

interface IDefaultUserListState {
  totalPage?: number, 
  selectedPage?:number,
  itemperPage?: number
  users: IDBStaff[]
}
export const defaultUserListState: IDefaultUserListState = {
  users: []
}
export function user(state = defaultUserListState, actions: Action_Staff): IDefaultUserListState {
  switch(actions.type){
    case 'CHANGE_USER_INFORMATION': {
      const { newState, user } = actions.payload
      return {
        ...state,
        users: state.users.map(e => e.code_staff == user.code_staff ? { ...e, newState } : e)
      }
    }
    case 'DOWNLOAD_USER_LIST_SUCCESS2':{
      return { ...state, ...actions.payload }
    }
    default: return state
  }
}

export const defaultPermissions: IUserPermission[] = []
export function permissions(state = defaultPermissions,actions: Action_Staff): IUserPermission[] {
  switch(actions.type){
    case 'DEL_USER_PERMISSION':{
      return state.filter(per => per.permission_id != actions.payload.payload)
    }
    case 'INS_USER_PERMISSION':{
      const { user, payload } = actions.payload
      return [...state, payload]
    }
    default: return state
  }
}

export function modal(state = defaultModalState, actions: ModalActions): IModalState {
  switch(actions.type){
    case "CloseModal": { return defaultModalState }
    case "OpenModal": {
      return { 
        ...state, ...actions.payload, open: true,
      }
    }
    case "Confirmed": {
      console.log(actions)
      return {
        ...state, 
        confirmedState: {
          ok: true,
          actionID: actions.actionID
        },
      }
    }
    case "APIDispatchError": {
      return {
        ...state,
        confirmedState: {
          ...state.confirmedState,
          ok: false,
        },
        title: "API Dispatch Error",
        message: {
          type: "string", content: actions.payload.err
        },
        buttons: [
          { type: "cancel", text: "Cancel" },
        ]
      }
    }
    default: return state
  }
}

export interface IAppState {
  appState: "INITIALIZING" | "READY" | "AUTHENTICATING"
}
const defaultAppState: IAppState = {
  appState: "AUTHENTICATING"
}

export function appState(state = defaultAppState, actions: TAppActions){
  switch(actions.type){
    case "UPDATE_APP_STATE": {
      return { ...state, appState: actions.payload }
    }
    default: return state
  }
}