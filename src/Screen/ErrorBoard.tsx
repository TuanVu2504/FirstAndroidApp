import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text } from 'react-native'
import { TAppScreensRoute } from '../Constants'
import { SLayout, SFlex } from '../styles'
const _ErrorBoard = (props: NativeStackScreenProps<TAppScreensRoute, "error_board">) => {
  const { route } = props
  const { error } = route.params
  return (
    <View style={[SLayout.FullScreen, SFlex.center]}>
      <Text>{error || 'Unknown Error'}</Text>
    </View>
  )
}

export const ErrorBoard = React.memo( _ErrorBoard )