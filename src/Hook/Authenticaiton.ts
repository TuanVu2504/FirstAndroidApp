import React from 'react'
import { Authentication } from '../Services'

export function useVerifyCookie(){
  const [ checking, setChecking ] = React.useState(true)

  React.useEffect(() => {
    Authentication.verifycookie()
    .then(() => setChecking(false))
  }, [])
  return {
    checking
  }
}