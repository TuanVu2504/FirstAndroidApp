import React from 'react';
import * as style from '../styles'
const { CONSTANT, Border } = style
import { CircleButton } from './Button'
import { useNavigation } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { View, TextInput, TextInputProps, StyleSheet, Text, TouchableHighlight, StyleProp, ViewStyle, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

const defaultStyle = StyleSheet.create({
})

type TAdditionType = {
  type?: 'password' | 'text'
}
const _InputWithUnderLine: React.FC<TextInputProps & TAdditionType> = (props) => {
  const { style, ...rest } = props
  const [ borderColor, setBorderColor ] = React.useState<undefined|string>();
  let _style = StyleSheet.compose(defaultStyle, style ? style : {})
  _style = StyleSheet.compose(_style, borderColor ? { ...Border['green'] } : {})
  function _onFocus(){
    setBorderColor(CONSTANT.COLOR.BLUE)
  }

  function _onBlur(){
    setBorderColor(undefined)
  }

  return <View
    style={_style}
  >
    <TextInput 
      style={{ padding: 0, flex: 1, }}
      onFocus={_onFocus} 
      onBlur={_onBlur} 
      {...rest}
    />
  </View>
}

export const InputWithUnderline = React.memo( _InputWithUnderLine )

interface ISearchViewOnlyBar {
  value?: string
  style?:StyleProp<ViewStyle>
  onPress?: () => void
  onChangeText?: (e:string) => void
}
export const SearchBar:React.FC<ISearchViewOnlyBar> = React.memo((props) => {
  const { onPress, onChangeText, value } = props
  const { goBack  } = useNavigation()

  return (
    <View style={[{ 
      alignItems: 'center', 
      backgroundColor: 'white',
      borderBottomColor: style.CONSTANT.COLOR.GRAY_LIGHT,
      borderBottomWidth: 0.8,
      display: 'flex',
      flexDirection: 'row',
    }, props.style ? props.style : {}]}>
      {/* <TouchableHighlight underlayColor={style.CONSTANT.COLOR.GRAY_LIGHT} onPress={() => console.log(`clicked`)}> */}
      <CircleButton 
        underlayColor={style.CONSTANT.COLOR.GRAY_LIGHT} 
        onPress={goBack} 
        height={46} 
        style={{ backgroundColor: 'white', marginRight: 2, marginLeft: 2, marginTop: 2, marginBottom: 2 }}>
        <FontAwesomeIcon icon={["fas", "arrow-left"]} />
      </CircleButton>
      {/* </TouchableHighlight> */}
      <TouchableHighlight 
        underlayColor={style.CONSTANT.COLOR.GRAY_LIGHT}
        onPress={onPress}
        style={{
          display: 'flex', flexDirection: 'row',alignItems:'center',
          height: 38, paddingLeft: 15,
          flex: 1, 
          borderRadius: 23,
          backgroundColor: style.CONSTANT.COLOR.SMOKE, marginRight: 15,
        }}
      ><>
      {
        onChangeText != undefined 
        ? <><TextInput 
            autoFocus
            style={{ 
              paddingTop:0, paddingBottom:0,
              textAlignVertical: "center",
              fontSize: style.CONSTANT.TEXT_MEDIU, 
              flex: 1, height: '100%', 
              paddingRight: 15,
            }} value={value} 
            placeholder='Search' 
            onChangeText={onChangeText}
          />
          { value != '' ? <CircleButton 
              underlayColor={style.CONSTANT.COLOR.GRAY_LIGHT} 
              onPress={() => onChangeText("")} 
              height={46} 
              style={{ backgroundColor: 'transparent', margin: 2 }}
            >
              <FontAwesomeIcon icon={["fas", "xmark"]} color={style.CONSTANT.COLOR.GRAY} />
            </CircleButton> 
          : null
          }
        </>
        : <>
          <View style={{ marginLeft: 8 }}>
            <FontAwesomeIcon color={style.CONSTANT.COLOR.GRAY} icon={["fas", "magnifying-glass"]} />
          </View>
          <Text style={{marginLeft: 8, fontSize: style.CONSTANT.TEXT_MEDIU, color: style.CONSTANT.COLOR.GRAY }}>Search</Text>
        </>
      }
      </></TouchableHighlight>
    </View>
  )
})