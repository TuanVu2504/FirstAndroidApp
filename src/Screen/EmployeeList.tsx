import React from 'react';
import { View, Text,  ScrollView, TouchableHighlight } from 'react-native'
import { useSelectorTyped } from '../Reducer'
import Nothing from './Nothing'
import { UserServices } from '../Services'
import { HorizontalPageSelect, MyImage } from '../Components'
import { BackGround, FlexInline, SLayout,SFlex, SMargin, SUserList, CONSTANT } from '../styles';
import { useBranch, useDepartment, useConnectModal, usePosition } from '../Hook'
import { IDBStaff } from '../../../../globalInterface';
import { global_constants } from '../../../../globalConstants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TAuthedRoute } from '../Constants';

const EmployeeList = React.memo(() => {
  const { BlockUserInteraction, closeModal } = useConnectModal()
  const { users, totalPage, selectedPage } = useSelectorTyped(s => s.user )
  function donwloadUser(page: number){
    BlockUserInteraction('Loading users...')
    UserServices.loadUser(page).then(closeModal)
  }
  return (
    <React.Fragment>
      <ScrollView style={[users.length == 0 ? [SFlex.center, SFlex[1]] : SLayout.flex1, BackGround.white ]}>
      { users.length == 0 
        ? <Nothing /> 
        : users.map( u => <UserItem key={u.code_staff} user={u}/>)
      }
      </ScrollView>
      <HorizontalPageSelect totalPage={totalPage} onPageClick={donwloadUser} selectedPage={selectedPage} />
    </React.Fragment>
  )
})

interface IUserProps {
  user: IDBStaff
}
const UserItem = React.memo((props: IUserProps) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<TAuthedRoute>>()
  const { user } = props
  const department  = useDepartment({ department_id: user.department_id })
  const branch      = useBranch({ branch_id: user.branch_id })
  const postition   = usePosition({ pos_id: user.pos_id })

  const onItemClick = React.useCallback(() => { 
    navigate("UserDetails", { user })
  },[])
  
  return (
    <TouchableHighlight 
      underlayColor={CONSTANT.COLOR.GRAY_LIGHT}
      onPress={
        onItemClick
        // () => navigator.navigate('UserDetails', { user })
      }
      style={SUserList.itemContainer}
    >
      <React.Fragment>
        <MyImage 
          style={{ padding: 10, width: 100 }}
          url={global_constants.url.userAvatar(user.code_staff)} 
          circle={true} 
          height={70} 
          width={70} 
          align={"center"}
        />
        <View style={SUserList.InfoContainer}>
          <View style={SMargin['bot-3']}><Text style={SUserList.username}>{user.name}</Text></View>
          <FlexInlineList width={200}>
            { branch ? <View style={[SUserList.UserInfoSummaryCtn, BackGround.orange]}><Text style={SUserList.UserInfoSummaryTxt}>{branch.short_code}</Text></View> : undefined }
            { department ? <View style={[SUserList.UserInfoSummaryCtn, BackGround.blue]}><Text style={SUserList.UserInfoSummaryTxt}>{department.short_code}</Text></View> : undefined }        
            { postition ? <View style={[SUserList.UserInfoSummaryCtn, BackGround['gray-dark']]}><Text style={SUserList.UserInfoSummaryTxt}>{postition.pos_code}</Text></View> : undefined }        
          </FlexInlineList>
        </View>
      </React.Fragment>
    </TouchableHighlight>
)
})

interface IFlexInlineProps {
  width?: number
}
export const FlexInlineList: React.FC<IFlexInlineProps> = (props) => {
  const { children,width } = props
  const combimeStyle: {[k:string]:string|number}[] = [FlexInline.container]
  if(width) combimeStyle.push({ width })

  return <View style={combimeStyle}>
    { children }
  </View>
}

export default EmployeeList