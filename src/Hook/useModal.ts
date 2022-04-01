import { useSelectorTyped, useDispatchTyped } from '../Reducer'
import React from 'react'
import { makeid } from '/project/globalConstants'

type TModalProps = {
  onConfirm?: () => Promise<void>
}
export function useConnectModal(props?:TModalProps){
  const onConfirm = props && props.onConfirm
  const [actionID] = React.useState(makeid(14))
  const dispatch = useDispatchTyped();
  const { confirmedState } = useSelectorTyped( state => state.modal )

  React.useEffect(() => {
    if(!confirmedState.ok || confirmedState.actionID != actionID ) return
    if(onConfirm == undefined) {
      dispatch({
        type: "APIDispatchError",
        payload: { err: "Action is confirmed but you did not provide actions for this. This mostly the wrong logic from the developer. Please notify your administrator"}
      })
      return
    }
    onConfirm()
    .then(() => {
      dispatch({ type: 'CloseModal' })
    })
    .catch(err => { 
      dispatch({ 
        type: 'APIDispatchError', 
        payload: {
          err: err.message
        }
      })
    })
  }, [confirmedState])

  const info = (content: string|string[]) => {
    let _message: { type: "string", content: string } | { type: "stringarray", content: string[]};
    if(typeof content == "string"){
      _message = { type: "string", content }
    }
    else {
      _message = { type: "stringarray", content }
    }
    dispatch({
      type: 'OpenModal',
      payload: {
        type: "UserInteraction",
        title: "Message",
        message: _message,
        buttons: [{
        text: "Close",
        type: "cancel"
      }]
      }
    })
  }

  function apiError(err: any){
    dispatch({
      type: "OpenModal",
      payload: {
        type: "UserInteraction",
        "title": "API Error",
        "message": {
          type: "string",
          content: err.message
        },
        "buttons": [{
          "text": "Close",
          type: "cancel"
        }],
      }
    })
  }

  function BlockUserInteraction(message = "Please wait"){
    dispatch({
      type: "OpenModal",
      title: undefined,
      payload: {
        type: "NonUserInteraction",
        "message": { type: "string", content: message },
        "buttons": [],
      }
    })
  }

  const close = () => dispatch({ type: "CloseModal" })

  const requireConfirm = (message: string[]) => {
    dispatch({
      type: 'OpenModal',
      payload: {
        type: "UserInteraction",
        title: "Confirmation is required",
        message: {
          content: message,
          type: "stringarray"
        },
        buttons: [{
          actionid: actionID,
          "text": "OK",
          type: "confirm"
        }, {
          text: "Cancel",
          type: "cancel"
        }]
      }
    })
  }

  return {
    BlockUserInteraction,
    apiError,
    requireConfirm,
    info,
    closeModal: close
  }
}