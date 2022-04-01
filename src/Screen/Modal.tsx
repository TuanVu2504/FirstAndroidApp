import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { View, Text, Modal, ActivityIndicator, TouchableHighlight } from 'react-native'
import { WhiteText } from '../Components'
import { useSelectorTyped, useDispatchTyped } from '../Reducer'
import * as styles from '../styles'

const MyModal = () => {
  const modalState = useSelectorTyped(s => s.modal)
  const dispatch = useDispatchTyped()
  const { open, message, title, buttons, type } = modalState

  const ok = (actionID: string) => {
    dispatch({ "type": "Confirmed", actionID: actionID })
  }

  const modalClose = () => {
    dispatch({ type: "CloseModal" })
  }
  return (
    <Modal animationType='fade' visible={open} transparent={true}>
      <View style={styles.SModal.container}>
        <View style={styles.SModal.modal}>
          { 
            type != "NonUserInteraction" && 
            (
              <View style={styles.SModal.titleContainer}>
                <View style={styles.SModal.title}>
                  <WhiteText style={styles.SModal.titleText}>{title}</WhiteText>
                </View>
                <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <TouchableHighlight onPress={ modalClose }>
                    <FontAwesomeIcon color={styles.CONSTANT.COLOR.WHITE} icon={["fas","xmark"]}  />
                  </TouchableHighlight> 
                </View>
              </View> 
            )
          }
          <View style={styles.SModal.body}>
            {
              type == "NonUserInteraction" 
                ? <View style={{ height: 100, ...styles.SFlex.flex, ...styles.SFlex.center }}>
                    <ActivityIndicator size={styles.CONSTANT.ActivityIndicator.size.XLarge} /> 
                  </View>
                : undefined
            }
            <View style={[styles.SModal.messageContainer, type == "NonUserInteraction" && { ...styles.SFlex.center, ...styles.SFlex.flex }]}>
            {
              message.type == "string" ? <WhiteText style={styles.SModal.message}>{message.content}</WhiteText> : 
              message.type == 'stringarray' ? message.content.map((message, i) => <WhiteText style={styles.SModal.message} key={i}>{message}</WhiteText>) :
              <WhiteText>Please instruct me how to render object array</WhiteText>
            }
            </View>
            {
              type != "NonUserInteraction" ?
              <View style={styles.SModal.buttonContainer}>
              {
                buttons.map((button, i) => {
                  return (
                    <TouchableHighlight 
                      key={button.type} 
                      onPress={button.type == "cancel" ? modalClose : () => ok(button.actionid) }
                    >
                      <View style={[
                        i == 1 ? styles.SMargin['right-10']: {},
                        styles.SModal.button,
                        button.type == "confirm" ? styles.SModal.okButton : styles.SModal.cancleButton
                      ]}>
                        <Text style={button.type == "cancel" ? styles.SColor.black : styles.SColor.white}>
                        {
                          button.text
                        }
                        </Text>
                      </View>
                    </TouchableHighlight>
                  )
                })
              }
              </View>
              : null
            }
          </View>
          
        </View>
      </View>
    </Modal>
  )
}

export default MyModal;