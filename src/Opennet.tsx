import React from 'react';
import { Provider } from 'react-redux';
import { store, useDispatchTyped, useSelectorTyped } from './Reducer'
import { View } from 'react-native';
import { SApp } from './styles'
import LoginPage from './Screen/LoginPage';
import AuthDashboard from './Screen/AuthenDashBoard'
import Modal from './Screen/Modal'
import { TAppScreensRoute } from './Constants'
import { ErrorBoard, ScreenLoading } from './Screen'
import { NavigationContainer, CommonActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { useConnectModal } from './Hook'
import { initializeApp } from './Services'

const Stack = createNativeStackNavigator<TAppScreensRoute>();

const OpennetApp = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </NavigationContainer>
  )
};

const App = React.memo(() => {
  const { auth } = useSelectorTyped(s => s)
  const navigation = useNavigation<NativeStackNavigationProp<TAppScreensRoute>>()
  React.useEffect(() => {
    if(!auth.loggedIn){
      const newState = CommonActions.reset({
        index: 0, routes: [{ name: "Login" }]
      })
      navigation.dispatch(newState)
      return 
    }
    navigation.navigate("initialize_app")
  }, [auth.loggedIn])

  return (<>
    <Modal />
    <View style={SApp.Body}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='initialize_app' component={InitializeAppScreen} /> 
        <Stack.Screen name='Login' component={LoginPage}/> 
        <Stack.Screen name='auth_dashboard' component={AuthDashboard} />
        <Stack.Screen name='error_board' component={ErrorBoard} />
      </Stack.Navigator>
    </View>
  </>)
})

const InitializeAppScreen = React.memo((props: NativeStackScreenProps<TAppScreensRoute>) => {
  const { navigation } = props
  const {auth , appState} = useSelectorTyped(s => s)
  const { closeModal } = useConnectModal()
  const dispatch = useDispatchTyped()

  React.useEffect(() => {
    if(!auth.loggedIn) return
    if(appState.appState == "READY") {
      const newState = CommonActions.reset({
        index: 0, routes: [{ name: "auth_dashboard" }]
      })
      navigation.dispatch(newState)
    } 

    dispatch({ type: "UPDATE_APP_STATE", payload: "INITIALIZING" })
    initializeApp().then(() => dispatch({ type: "UPDATE_APP_STATE", payload: "READY" }))
    .catch(err =>{
      navigation.navigate('error_board', {
        error: err.message
      })
    })
    .finally(() => closeModal())
  }, [auth.loggedIn, appState.appState])
  return appState.appState == "INITIALIZING" 
    ? <ScreenLoading message="Initializing app" /> 
    : <ScreenLoading message="Please wait" />
})

export default OpennetApp;
