import React from 'react'
import { View, StyleProp, ViewStyle, ColorValue } from 'react-native'
import * as style from '../styles'

export const FlexRow: React.FC<{ style?: StyleProp<ViewStyle> }> = (props) => {
  const { style, children } = props
  return <View style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center' }, style ? style : {} ]}>
  { children }
  </View>
}

export const FlexRowCenterCol: React.FC<{ style?: StyleProp<ViewStyle> }> = (props) => {
  const { style, children } = props
  return <View style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center' }, style ? style : {} ]}>
  { children }
  </View>
}

export const FlexRowCenterRow: React.FC<{ style?: StyleProp<ViewStyle> }> = (props) => {
  const { style, children } = props
  return <View style={[{ display: 'flex', flexDirection: 'row', alignContent: 'center' }, style ? style : {} ]}>
  { children }
  </View>
}

export const FlexColCenter: React.FC<{ style?: StyleProp<ViewStyle> }> = (props) => {
  const { style, children } = props
  return <View style={[{ display: 'flex', flexDirection: "column", alignItems:'center', flex: 1 }, style ? style : {} ]}>
  { children }
  </View>
}

export const FlexCenter: React.FC<{ style?: StyleProp<ViewStyle> }> = (props) => {
  const { style, children } = props
  return <View style={[{ display: 'flex', alignItems:'center', justifyContent:'center' }, style ? style : {} ]}>
  { children }
  </View>
}

export const HorizontalLine: React.FC<{ color?:ColorValue, borderWidth?:number, style?:StyleProp<ViewStyle> }> = (props) => (
  <View style={[
    { 
      borderBottomColor: props.color || style.CONSTANT.COLOR.GRAY_2,
      borderBottomWidth: props.borderWidth || 0.5
    }, 
    props.style ? props.style : {}
  ]}/>
)