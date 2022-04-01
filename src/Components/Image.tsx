import React from 'react'
import { global_constants } from '/project/globalConstants'
import { View, StyleProp, Image, ViewStyle, ActivityIndicator, LayoutChangeEvent } from 'react-native'
import {  SImage } from '../styles'

interface IImageProps {
  height?: number, 
  width?:number, 
  circle?:boolean
  url: string,
  fallBackUrl?: string,
  align?: "center"|"mid-row"|"center-col"|"left"|"right"|"top"|"bottom"|"stretch"
  style?: StyleProp<ViewStyle>
  logUrl?:boolean
}

export const MyImage = (props: IImageProps) => {
  const { height, width, circle, url, style, align, fallBackUrl, logUrl } = props
  const [ cSize, setCSize ] = React.useState<{ cheight:number, cWidth: number }|undefined>(undefined)
  const _align = align || "center"
  const [image,setImage] = React.useState<string>(url)
  const [loading, setLoading] = React.useState(true)
  
  //  componentShouldUpdate
  React.useEffect(() => setImage(url), [url])

  const containerStyle: StyleProp<ViewStyle>[] = [SImage.container]
  if(style) containerStyle.push(style)

  function onLayout (e: LayoutChangeEvent){
    if(cSize) return
    const { width, height }  = e.nativeEvent.layout 
    setCSize({ cWidth: width, cheight: height })
  }

  const imageStyle: { width: number, height: number, borderRadius?:number } = { 
    width: width || cSize?.cWidth|| 0, height: height || cSize?.cheight|| 0, borderRadius: undefined 
  }

  if(_align == "center"){
    const square = imageStyle.height > imageStyle.width
                  ? imageStyle.width 
                  : imageStyle.height
    imageStyle.height = square
    imageStyle.width = square
    imageStyle.borderRadius = circle ? square / 2 : undefined   
  } else if(_align == "bottom"){
    // containerStyle.push({ "paddingBottom": 0 })
  }

  const loadError = () => { 
    setLoading(false)
    setImage(fallBackUrl || global_constants.images.defaultAvatarImg) 
  }
  const loadEnd = () => { setLoading(false) }
  const loadStart = () => { setLoading(true) }


  return (
    <View style={containerStyle} onLayout={onLayout}>
      <Image 
        style={[imageStyle]} 
        onError={ loadError } source={{ uri: image }} 
        onLoadStart={loadStart} 
        onLoadEnd={loadEnd} 
      />
      { loading && <View style={SImage.loading}>
          <ActivityIndicator size={'small'}/>
        </View>
      }
    </View>
  )
}