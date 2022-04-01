import React from 'react'
import { Text } from 'react-native'

const Nothing:React.FC<{ content?:string }> = (props) => {
  return <Text>{ props.content || 'Nothing' }</Text>
}

export default Nothing