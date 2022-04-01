import { IDBStaff, ISearchProp } from "/project/globalInterface"

export type TAppScreensRoute = {
  Login: undefined | { from: string },
  error_board: {
    error?:string
  },
  check_cookie: undefined,
  initialize_app: undefined,
  auth_dashboard: undefined
}
export type THomeScreenRoute = {
  users: undefined
  attendances: undefined
  resources: undefined
  tools: undefined
  menu: undefined
}

export type TAuthedRoute = {
  UserDetails: { user: IDBStaff },
  Home: undefined,
  Search?: ISearchProp
}

