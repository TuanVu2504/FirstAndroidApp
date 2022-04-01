import React from 'react'
import { ScrollView, TouchableHighlight, View, Text } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TAuthedRoute } from '../Constants'
import { MyImage, SearchBar, BlackText, FlexRow, FlexColCenter, CircleButton, HorizontalLine } from '../Components'
import { IDBStaff } from '/project/globalInterface'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as style from '../styles'
import { global_constants } from '/project/globalConstants'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { useBranch, useDepartment, usePosition } from '../Hook'
import { useSelectorTyped } from '../Reducer'


const SubMenu: React.FC<{ onPress: () => void, title: string, icon: IconProp }> = (props) => (
  <FlexColCenter>
    <CircleButton underlayColor={style.CONSTANT.COLOR.GRAY_2} height={50} style={{ marginBottom: 5}} onPress={props.onPress}>
      <FontAwesomeIcon size={22} icon={props.icon}/>
    </CircleButton>
    <BlackText style={{ fontSize: style.CONSTANT.TEXT_SMALL, fontWeight: '500' }}>
      {props.title}
    </BlackText>
  </FlexColCenter>
)

const PersonnalInfo:React.FC<{ icon: IconProp, Title: () => JSX.Element }> = ({ icon, Title }) => (
  <FlexRow style={{ height: 40, paddingHorizontal: 15 }}>
    <FontAwesomeIcon size={25} color="gray" icon={icon}/>
    <View style={{ marginLeft: 15 }}>
      {Title()}
    </View>
  </FlexRow>
)

const UserDetail = (props: NativeStackScreenProps<TAuthedRoute, "UserDetails">) => {
  const { route, navigation } = props
  const { user }  = route.params
  const { auth } = useSelectorTyped(s => s)
  const position = usePosition({ pos_id: user.pos_id })!
  const department = useDepartment({ department_id: user.department_id })
  const branch = useBranch({ branch_id: user.branch_id })!
  const title = user.title || `${position.pos_name}`
  const organition = `OPENNET, OPN ${department?department.short_code:branch?.short_code}`
  
  function follow(){

  }

  function message(){

  }

  function organization_map(){

  }
  
  function more(){
    
  }

  function edit(){

  }

  function acitivityLog(){

  }
  return (
    <View style={{ height:'100%'}}>
      <SearchBar onPress={() => navigation.navigate("Search") }/>
      {/* Searh bar hei 40*/} 
      <ScrollView style={{backgroundColor:'white',}}>
        <MagicAvatar user={user} />
        <View style={[
          style.Padding['left-right-15'], 
          { 
            paddingTop: 15, 
            height: 240,
            marginBottom: 100,
          }
        ]}>
          <MyImage 
            align="stretch"
            style={{ flex: 1, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
            url={global_constants.url.userCover(user.code_staff)}
            fallBackUrl={global_constants.url.defaultCover}
          />
        </View>
        {/* <View style={{ height: 60 }}>
          <Text>badge</Text>
        </View> */}
        <View style={{ height: 60, justifyContent:'center', display:'flex', marginBottom: 5 }}>
          <BlackText style={{ fontSize: 28, fontWeight: '600', textAlign: 'center' }}>
            {user.name.split(' ').pop() + ' ' + user.name.split(' ').slice(0, user.name.split(' ').length - 1).join(' ') }
          </BlackText>
        </View>
        <FlexRow style={{ 
          paddingHorizontal: 100/4/2/5 + ''+'%', 
        }}>
          { auth.code_staff != user.code_staff ? <SubMenu onPress={follow} title="Follow" icon={["far", "plus-square"]} /> : null }
          { auth.code_staff != user.code_staff ? <SubMenu onPress={message} title="Message" icon={["fab", "facebook-messenger"]} /> : null }
          <SubMenu onPress={organization_map} title="Organization" icon={["fas", "sitemap"]} />
          { auth.code_staff == user.code_staff ? <SubMenu onPress={edit} title="Edit profile" icon={["fas", "user-pen"]} /> : null }
          { auth.code_staff == user.code_staff ? <SubMenu onPress={acitivityLog} title="Activity log" icon={["fas", "list-ul"]} /> : null }
          <SubMenu onPress={more} title="More" icon={["fas", "ellipsis"]} />
        </FlexRow>
        <HorizontalLine style={{ marginTop: 20, marginHorizontal: 15, marginBottom: 5 }} />
        <View>
          <PersonnalInfo icon={["fas", "briefcase"]} Title={() => <FlexRow><BlackText style={{ fontWeight: title.length > 20 ? '400' : '600' }}>{title.length > 20 ? 'Work': title}</BlackText><BlackText> at Opennet</BlackText></FlexRow> } />
          <PersonnalInfo icon={["fas", "diagram-project"]} Title={() => <BlackText>{organition}</BlackText> } />
          <PersonnalInfo icon={["fas", "location-arrow"]} Title={() => <BlackText>{branch.name}</BlackText> } />
          <PersonnalInfo icon={["fas", "envelope"]} Title={() => <BlackText>{user.mail_opn}</BlackText> } />

        </View>
      </ScrollView>
    </View>
  )
}


const MagicAvatar = (props: { user: IDBStaff }) => {
  const { user } = props
  return (
    <View 
      style={{
        backgroundColor: 'white',
        padding: 5,
        overflow: 'hidden',
        borderRadius: 95,
        transform:[{ translateY: -90 }, { translateX: -90 }],
        position:'absolute',
        top: 235,left: '50%',
        zIndex: 1
      }}>
      <TouchableHighlight
        style={{ width: 180, height: 180, borderRadius: 90 }}
        onPress={() => console.log(`clicked`)}
        underlayColor={style.CONSTANT.COLOR.GRAY}
      >
        <MyImage 
          circle={true} 
          height={180}
          width={180}
          url={global_constants.url.userAvatar(user.code_staff)} 
        />
      </TouchableHighlight>
    </View>
    
    
  )
}

export default UserDetail