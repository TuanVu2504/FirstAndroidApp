import React from 'react';
import EmployeeList from './EmployeeList'
import { Text, View, TouchableOpacity, } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { TAppScreensRoute, TAuthedRoute, THomeScreenRoute } from '../Constants'
import UserDetail from './UserDetailScreen';
import AppMenuScreen from './MenuScreen'
import SearchScreen from './SearchScreen'
import * as styles from '../styles';
import { CircleButton, MyImage } from '../Components';
import { global_constants } from '../../../../globalConstants';
import { useNavigation } from '@react-navigation/native';
const { CONSTANT } = styles
const AuthedHomeBodyStack = createNativeStackNavigator()
const AuthedHomeTab = createMaterialTopTabNavigator()

const HomeScreen = React.memo(() => {
  const [ showHeader, setShowHeader ] = React.useState(false)
  const toggleTitle = React.useCallback(() => setShowHeader(s => !s), [])
  
  return (
    <View style={styles.SLayout.flex1}>
      { showHeader ? <TopHeader /> : null }
      <NavigateScreen toggleUserTabFocus={toggleTitle}/>
    </View>
  )
})

const NavigateScreen = React.memo((props: { toggleUserTabFocus: () => void }) => {
  const { toggleUserTabFocus } = props
  const iconSize = 25
  const initRoute = 'users'
  return (
    <AuthedHomeTab.Navigator 
      screenOptions={{ 
        tabBarActiveTintColor: CONSTANT.COLOR.ORANGE,
        tabBarShowLabel: false,
        tabBarIndicatorStyle: styles.BackGround.orange,
      }}
      initialRouteName={initRoute}
    >
      <AuthedHomeTab.Screen name='users' 
        listeners={() => ({
          focus: toggleUserTabFocus,
          blur: toggleUserTabFocus
        })}
        component={EmployeeList} options={{
        tabBarIcon: ({ focused, color }) => {
          return <FontAwesomeIcon icon={["fas", "users"]} size={iconSize} color={focused ? CONSTANT.COLOR.ORANGE : undefined } />
        }
      }}/>
      <AuthedHomeTab.Screen name='attendances' component={TestScreen} options={{
        tabBarIcon: ({ focused, color }) => {
          return <FontAwesomeIcon icon={["far", "calendar-check"]} size={iconSize} color={focused ? CONSTANT.COLOR.ORANGE : undefined }/>
        }
      }}/>
      <AuthedHomeTab.Screen name='resources' component={TestScreen} options={{
        tabBarIcon: ({ focused, color }) => {
          return <FontAwesomeIcon icon={["fas", "wrench"]} size={iconSize} color={focused ? CONSTANT.COLOR.ORANGE : undefined }/>
        }
      }}/>
      <AuthedHomeTab.Screen name='tools' component={TestScreen} options={{
        tabBarIcon: ({ focused, color }) => {
          return <FontAwesomeIcon icon={["fas", "gear"]} size={iconSize} color={focused ? CONSTANT.COLOR.ORANGE : undefined }/>
        }
      }}/>
      <AuthedHomeTab.Screen name='menu' component={AppMenuScreen} options={{
        tabBarIcon: ({ focused, color }) => {
          return <FontAwesomeIcon icon={["fas", "bars"]} size={iconSize} color={focused ? CONSTANT.COLOR.ORANGE : undefined }/>
        }
      }}/>
    </AuthedHomeTab.Navigator>
  )
})
const AuthedScreen = React.memo((props: NativeStackScreenProps<TAppScreensRoute>) => {
  return (
    <View style={styles.SLayout.FullScreen}>
      <AuthedHomeBodyStack.Navigator 
        initialRouteName='Home' 
        screenOptions={{ headerShown: false }}
      >
        <AuthedHomeBodyStack.Screen name="UserDetails" component={UserDetail}/>
        <AuthedHomeBodyStack.Screen name="Home" component={HomeScreen}/>
        <AuthedHomeBodyStack.Screen name="Search" component={ SearchScreen }/>
      </AuthedHomeBodyStack.Navigator>
    </View> 
  )
})

const TopHeader = React.memo(() => {
  const navigation = useNavigation<NativeStackNavigationProp<TAuthedRoute>>()
  return (
    <View style={styles.STopHeader.container}>
      <MyImage 
        url={global_constants.url.opennet_loglo_brand} 
        align="bottom" 
        width={global_constants.size.opennet_logo_brand.normal.width}
        height={global_constants.size.opennet_logo_brand.normal.height}
      />
      <View style={styles.STopHeader.searchContainer}>
        <TouchableOpacity>
          <CircleButton onPress={() => navigation.navigate("Search")}>
            <FontAwesomeIcon icon={['fas', "magnifying-glass"]} size={20} />
          </CircleButton>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <View style={styles.CircleOutSideIcon.circle}>
          <FontAwesomeIcon icon={['fas', "comment"]} size={20} />
        </View>
      </TouchableOpacity>
    </View>
  )
})

const TestScreen = React.memo((props: MaterialTopTabScreenProps<THomeScreenRoute>) => {
  const { route } = props
  return (<Text>{ route.name }</Text>)
})

export default AuthedScreen;
