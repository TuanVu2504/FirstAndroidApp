import { oneOf,IDBUserPosition,IDBBranch,IDBDepartment, ISearchProp } from '/project/globalInterface'
import { global_constants } from '/project/globalConstants'
import { SearchService } from '../Services'
import React from 'react'
import { store } from '../Reducer'

export function useDepartment(option: Partial<oneOf<IDBDepartment>>){
  const oKey = global_constants.helpers.keys(option)[0] 
  if(!oKey) return
  return store.getState().opennetResources.departments.find(d => d[oKey] == option![oKey])
}

export function useBranch(option: oneOf<IDBBranch>){
  const oKey = global_constants.helpers.keys(option)[0] 
  const oVal = option[oKey]
  if(!oKey) throw new Error('never happend')
  return store.getState().opennetResources.branches.find(b => b[oKey] == oVal)
}

export function usePosition(option: oneOf<IDBUserPosition>){
  const oKey = global_constants.helpers.keys(option)[0] 
  if(!oKey) return
  const oVal = option[oKey]
  return store.getState().opennetResources.postitions.find(p => p[oKey] == oVal)
}

export function useDelayAPISearch<T>(params?: ISearchProp){
  const [timer, setTimer] = React.useState<ReturnType<typeof setTimeout>|null>(null)
  const [searchResult, setSearchResult] = React.useState<T[]>([])
  const [searchText, setSearchText] = React.useState('')
  const [searching, setSearching] = React.useState(false)

  const onTextChange = (text: string) => {
    setSearchText(text)
    setSearching(true)
    if(timer) clearTimeout(timer)
    if(!text) {
      setSearching(false)
      return
    }
    const delayTimer = setTimeout(() => { 
      SearchService.search<T>(searchText, params)
        .then(res => res.Resources)
        .then(setSearchResult)
        .finally(() => setSearching(false))
    }, 500)
    setTimer(delayTimer)

  }
  return { onTextChange, searchResult, searchText, searching }
}