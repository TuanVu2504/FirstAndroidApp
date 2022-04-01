import React from 'react'
import { View, Text } from 'react-native'
import { global_constants } from '../../../../globalConstants'
import { MyImage } from '../Components'
import { SLoading, SMargin, SText } from '../styles'

const _ScreenLoading: React.FC<{ message: string }> = (props) => {
  const { message } = props
  return (
    <View style={SLoading.Container}>
      <MyImage 
        url={global_constants.url.opennet_loglo_brand} 
        align="bottom" 
        {...global_constants.size.opennet_logo_brand.normal} />
      {/* <ActivityIndicator size="large" style={[SMargin['bot-20']]} /> */}
      <Text style={{ 
        ...SText.Large,
        ...SText.Bold,
      }}>{message}</Text>
    </View>
  )
}

export const ScreenLoading = React.memo( _ScreenLoading )