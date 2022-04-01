import React from 'react'
import { View, Text, StyleProp, ViewStyle, TouchableHighlight, ColorValue } from 'react-native'
import Ripple from 'react-native-material-ripple'
import * as style from '../styles'
const { SButtonDefault, CONSTANT, CircleOutSideIcon, SFlex } = style


interface IButtonProps {
  onPress: () => void,
  style?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<ViewStyle>
  children: string
}

export const  Button = (props: IButtonProps) => {
  const { onPress, children, style, textStyle } = props
  return (
    <Ripple
    onPress={onPress}
    style={[SButtonDefault.container, style]}
    rippleColor={CONSTANT.COLOR.GRAY_LIGHT}
    rippleOpacity={1}
    rippleDuration={400}
    >
      <Text style={[SButtonDefault.text, textStyle]}>{children}</Text>
    </Ripple>
  )
}


export const CircleButton: React.FC<{ 
  onPress?: () => void
  underlayColor?:ColorValue,
  height?: number, 
  style?:StyleProp<ViewStyle> 
}> = (props) => {
  const { underlayColor, onPress } = props
  const _style = props && props.style || {}
  const height = props && props.height || 40
  const width = height
  const borderRadius = height / 2
  return <View style={[CircleOutSideIcon.circle, { width, height, borderRadius }, _style, { overflow: 'hidden' }]}>
    <TouchableHighlight 
      onPress={onPress} 
      underlayColor={underlayColor||style.CONSTANT.COLOR.SMOKE} 
      style={{ width: '100%', display: 'flex', ...SFlex.center, ...SFlex[1]}}
    >
      { props.children }
    </TouchableHighlight>
  </View>
}