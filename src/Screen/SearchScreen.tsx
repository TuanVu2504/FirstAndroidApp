import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { View,Text, TouchableHighlight,ActivityIndicator } from 'react-native'
import { MyImage, SearchBar, BlackText, CircleButton, FlexCenter, FlexRowCenterRow } from '../Components'
import { Appstyle, useDelayAPISearch, usePosition } from '../Hook'
import { TAuthedRoute } from '../Constants'
import { IDBStaff, IGroupChat, IGroupPost } from '/project/globalInterface'
import { global_constants } from '/project/globalConstants'
import * as style from '../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const _SearchScreen = (props: NativeStackScreenProps<TAuthedRoute, "Search">) => {
  const { navigation, route } = props;
  const { params } = route

  const { onTextChange, searchResult, searchText, searching } = useDelayAPISearch<IDBStaff|IGroupChat|IGroupPost>(params)

  return  (
    <View style={Appstyle.FullScreen.style}>
      <SearchBar value={searchText} onChangeText={ onTextChange } />
      <View>
      {
        searchText == '' ? <RecentSearch />
        : searchResult.length > 0 ? searchResult.map(search => {
          const key = "code_staff" in search ? search.code_staff :
                      "threadId" in search ? search.threadId :
                      search.groupId
            
          
          return (
            <View key={key}>
            {
              "code_staff" in search ? <SearchResultItem user={search} onPress={() => navigation.navigate("UserDetails", { user: search })} />
              : "threadId" in search ? <SearchResultItem thread={search} onPress={() => console.log(`clicked`)} />
                                     : <SearchResultItem group={search} onPress={() => console.log(`clicked`)} />
            }
            </View>
          ) 
        })
        :null
      }
      </View>
      { 
        searchText !== '' ? <View style={{ display: 'flex', flexDirection: 'row', height: 50, alignItems: 'center', paddingHorizontal: 10 }}>
          <CircleButton height={40} style={{ backgroundColor: style.CONSTANT.COLOR.GRAY }}>
            <FontAwesomeIcon color="white" icon={["fas", "magnifying-glass"]}/>
          </CircleButton>
          <BlackText style={{ marginLeft: 10 }}>{searchText}</BlackText>
        </View> 
        : null 
      }
      {
        searching 
          ? <FlexCenter style={{ height: 100 }}><ActivityIndicator size={"small"} /></FlexCenter> 
          : null
      }
    </View>
  )
}

export const SearchScreen = React.memo( _SearchScreen ) as typeof _SearchScreen 

const SearchResultItem: React.FC<{
  user?: IDBStaff,
  thread?: IGroupChat,
  group?: IGroupPost
  onPress: () => void
}> = (props) => {
  const { user, thread, group, onPress } = props
  const imageUrl = user ? global_constants.url.userAvatar(user.code_staff)
                : group ? group.groupAvatar.url 
                : thread ? global_constants.url.userAvatar(thread.members[0].code_staff) : ""
  const name =  user ? user.name 
              : group ? group.groupName
              : thread ? thread.threadName : ""
  const desc = user ? ( user.pos_id && usePosition({ pos_id: user.pos_id })?.pos_name || user.title )
              : group ? group.groupDescription || group.members.length + ' members'
              : thread ? thread.threadDescription || thread.members.length + ' member'
              : ''
  function confirmSearch() {
    // api call to dispatch object has been search by the user.
    onPress()
  }
  return (
    <TouchableHighlight onPress={confirmSearch} underlayColor={style.CONSTANT.COLOR.GRAY_LIGHT}>
      <View style={{
        display: 'flex', 
        flexDirection: 'row', 
        height: 50, 
        alignItems:"center",
        paddingLeft: 10,
      }}>
        <MyImage width={40} height={40} url={imageUrl} />
        <View style={{ marginLeft: 10 }}>
          <BlackText style={{ fontSize: style.CONSTANT.TEXT_MEDIU }}>{name}</BlackText>
          <Text style={{ fontSize: style.CONSTANT.TEXT_SMALL }}>{desc}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
    
}

const RecentSearch = () => {
  return (
    <View>
      <Text>recent search</Text>
    </View>
  )
}

export default SearchScreen