import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { TAuthedRoute, THomeScreenRoute } from '../Constants';
import { MyImage, BlackText } from '../Components'
import { global_constants } from '/project/globalConstants'
import { useSelectorTyped } from '../Reducer';
import * as styles from '../styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Authentication } from '../Services';
import { useConnectModal } from '../Hook';

const AppMenuScreen = React.memo((props: NativeStackScreenProps<TAuthedRoute>) => {
  const { navigation } = props
  const { auth } = useSelectorTyped(s => s)
  const { requireConfirm } = useConnectModal({ onConfirm:  Authentication.logout })

  const onLogoutClick = React.useCallback(() => { 
    requireConfirm(["Logout request, are you sure?"])
  }, [])
  return (
    <View style={[styles.SFlex.flex, styles.SHeight[100]]}>
      <View style={[styles.Padding[15]]}>
        <Text style={[styles.ScreenTitle.title]}>Menu</Text>
      </View>
      {/* user line */}
      <TouchableHighlight 
        onPress={() => navigation.navigate("UserDetails", { user: auth })}
        underlayColor={styles.CONSTANT.COLOR.GRAY_LIGHT}>
        <View 
          style={
            [
              styles.Padding['left-right-15'],
              styles.Padding['top-bot-5'],
              styles.SFlex.flex,
              styles.SFlex.dirRow, 
              styles.SFlex.alignCenter
            ]}>
          <MyImage 
            circle={true}
            style={styles.SMargin['right-15']} 
            height={38} 
            width={38} 
            url={global_constants.url.userAvatar(auth.code_staff)}
          />
          <View>
            <BlackText style={[styles.SText.XBold, styles.SText.Medium]}>{auth.name}</BlackText>
            <Text style={[styles.SColor.gray]}>Click to see your personal profile</Text>
          </View>
        </View>
      </TouchableHighlight>
      {/* end user line */}

      {/* som middle stuff */}
      <View style={[
        styles.SFlex[1], 
        styles.Padding['left-right-15']
      ]}>
        <BlackText>some stuff</BlackText>
        <BlackText>some stuff</BlackText>
        <BlackText>some stuff</BlackText>
      </View>
      {/* end some middle stuff */}
      <TouchableHighlight
        underlayColor={styles.CONSTANT.COLOR.GRAY_LIGHT}
        onPress={onLogoutClick}
      >
        <View style={[
          styles.Padding['left-right-15'],
          styles.SHeight['50p'], 
          styles.SFlex.flex, 
          styles.SFlex.dirRow,
          styles.SFlex.alignCenter, 
          styles.Border['top-bot-0.5-gray'],
        ]}>
          <View style={styles.SMargin['right-15']}>
            <FontAwesomeIcon 
              color={styles.CONSTANT.COLOR.AppMenuScreenIcon} 
              size={38} 
              icon={["fas", "door-open"]} 
            />
          </View>
          <BlackText style={[styles.SText.Medium, styles.SText.Bold]}>
            Logout
          </BlackText>
        </View>
      </TouchableHighlight>
      <View style={[
        styles.SFlex.dirRow,
        styles.SFlex.alignCenter,
        styles.SHeight['80p'], 
        styles.Padding['left-right-15'], 
        styles.SFlex.flex,
      ]}>
        <Text style={styles.SMargin['right-8']}>from</Text>
        <MyImage 
          align="bottom"
          url={global_constants.url.opennet_loglo_brand} 
          height={global_constants.size.opennet_logo_brand.small.height}
          width={global_constants.size.opennet_logo_brand.small.width}
        />
      </View>
    </View>
  )
})

export default AppMenuScreen