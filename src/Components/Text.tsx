import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
import { SColor } from '../styles'

export interface ITextProps {
  children?: string,
  style?: StyleProp<TextStyle>
}

export const WhiteText = (props:ITextProps) => 
  <Text style={[ SColor.white, props.style ]}>
    {props.children}
  </Text>

export const BlackText = (props:ITextProps) => 
  <Text style={[ SColor.black, { fontSize: 18 }, props.style ]}>
    {props.children}
  </Text>