import { IAPIResponseCollection, ISearchProp } from '/project/globalInterface'
import { authedFetch } from './authedFetch'

export class SearchService {
  static search<T>(searchText: string, params?:ISearchProp){
    
  let _endPoint = params && params.endPoint || "https://hrm.opennet.com.kh/api/search"
  const _limit  = params && params.limit    || 10
  const _fields  = params && params.fields


  _endPoint += '?search=' + searchText
  _endPoint += _limit != undefined ? '&limit=' + _limit : ''
  _endPoint += _fields != undefined ? '&field='  + _fields.join(",") : ''

    return authedFetch<IAPIResponseCollection<T>>(_endPoint)
  }
}