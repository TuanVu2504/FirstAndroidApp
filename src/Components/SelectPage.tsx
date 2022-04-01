import React from 'react'
import { SHorizontalPageing, SColor, CONSTANT } from '../styles'
import { View, Text, TouchableHighlight } from 'react-native'

interface IPageProps {
  totalPage?:number,
  onPageClick: (page: number) => void,
  selectedPage?:number
}

export const HorizontalPageSelect:React.FC<IPageProps> = (props) => {
  const { totalPage, onPageClick, selectedPage } = props
  const minLimit = selectedPage && totalPage && (selectedPage < 4 ? 1 : +totalPage - 4 < selectedPage ? totalPage - 8 : +selectedPage - 4) ||  1
  const maxLimit = selectedPage && totalPage && ( selectedPage < 4 ? 8 : +selectedPage + 4 < totalPage ? +selectedPage + 4 : totalPage) || 1
  return (
    totalPage && totalPage > 1 ? <View style={SHorizontalPageing.container}>
    {
      Array.from(new Array(totalPage)).map((u,i) => {
        const page = i + 1
        const itemStyle = [
          SHorizontalPageing.item, 
          selectedPage && selectedPage == page ? SHorizontalPageing.active : {}
        ]
        const willRender = page == 1 || page == totalPage || page >= minLimit && page <= maxLimit 
        const onPress = () => onPageClick(page)
        return (
          willRender ? <View key={i} style={SHorizontalPageing.itemContainer}>
            <TouchableHighlight 
              underlayColor={CONSTANT.COLOR.GRAY_LIGHT}
              onPress={ onPress } 
              style={itemStyle}
            >
              <Text>
                { page }
              </Text>
            </TouchableHighlight>
          </View>
          : null
        )
      })
    }
    </View>
    : null
  )
}