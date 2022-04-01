import React from 'react';
import { Text, View } from 'react-native';
import { useSelectorTyped } from '../Reducer'
import { Button } from '../Components'
import {InputWithUnderline } from '../Components'
import { ScreenLoading } from './Loading'
import { Authentication } from '../Services'
import { SLayout, SLoginPage, SMargin } from '../styles';
import { useVerifyCookie } from '../Hook';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TAppScreensRoute } from '../Constants';

function validate(username: string, passwword: string): { reason: string | undefined } {

  return {
    reason: undefined
  };
}

const LoginPage = React.memo(() => {
  const [state, setState] = React.useState<"verify_cookie"|"unauthenticated"|"authenticated">("verify_cookie")
  const auth = useSelectorTyped(s => s.auth)
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { reason } = validate(username, password);
  const { checking } = useVerifyCookie()

  function login(){
    Authentication.authenticate(username, password)
  }
  
  React.useEffect(() => {
    if(auth.loggedIn) {
      setState("authenticated")
      // navigation.navigate("initialize_app")
    } else {
      setState("unauthenticated")
    }
  }, [auth.loggedIn])

  return (
    checking ? <ScreenLoading message='Verifying cookie' />
    : state == "unauthenticated" ? <View style={SLoginPage.Containter}>
      {/* fixed height */}
      <View style={{height: '25%'}}></View>
      {/* it will consume all remain height */}
      <View style={SLoginPage.Introduction}>
        <Text style={[SLoginPage.Brand, SMargin['bot-20'] ]}>OPENNET</Text>
        <InputWithUnderline 
          autoComplete='email'
          onChangeText={setUsername}
          value={username}
          placeholder="Your email"
          style={[SLoginPage.Input_UserName, SMargin['bot-20']]} />
        <InputWithUnderline 
          autoComplete='password'
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          placeholder="Your password"
          style={[SLoginPage.Input_UserName, SMargin['bot-20']]}
        />
        <Text style={SLoginPage.Message}>
          {auth.loggedIn ? 'Login succes' : auth.message ? auth.message : 'Please login'}
        </Text>
        <Button 
          textStyle={SLoginPage.LoginButtonText} 
          style={SLoginPage.LoginButton} 
          onPress={login}>
            Login
        </Button>
      </View>
      <View style={[SLayout.flex1]}></View>
      {/* fixed height */}
    </View> : null
  );
});

export default LoginPage;
