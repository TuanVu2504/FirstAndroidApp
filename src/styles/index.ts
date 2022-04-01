import { StyleSheet } from 'react-native';
import { CONSTANT } from './constant';

export { CONSTANT } from './constant';

export const Font = StyleSheet.create({
  poppins:{ fontFamily: CONSTANT.font.Poppins }
})
export const SText = StyleSheet.create({
  SemiBold: { fontWeight: CONSTANT.TEXT_BOLD },
  Regular: { fontWeight: CONSTANT.TEXT_REGU },
  Thin: { fontWeight: CONSTANT.TEXT_THIN },
  Bold: { fontWeight: CONSTANT.TEXT_BOLD },
  XBold: { fontWeight: CONSTANT.TEXT_XBOLD },
  Small: { fontSize: CONSTANT.TEXT_SMALL },
  Medium: { fontSize: CONSTANT.TEXT_MEDIU },
  Large: { fontSize: CONSTANT.TEXT_LARGE },
  XLarge: { fontSize: CONSTANT.TEXT_XLARGE },
  HCenter: { textAlign: 'center' }
});

export const SHeight = StyleSheet.create({
  '40p': { height: 40 },
  '48p': { height: 48 }, 
  '50p': { height: 50 },
  '80p': { height: 80 },
  '100p': { height: 100 },
  50: { height: '50%' },
  100: { height: '100%' }
})


export const SWidth = StyleSheet.create({
  '40p': { width: 40 },
  '50p': { width: 50 },
  '80p': { width: 80 },
  '100p': { width: 100 },
  100: { width: '100%' }
})


export const Border = StyleSheet.create({
  'radius-3': { borderRadius: 3 },
  'radius-5': { borderRadius: 5 },
  'radius-10': { borderRadius: 10 },
  'border-1': { borderWidth: 1 },
  'border-2': { borderWidth: 2 },
  'border-bot-1': { borderBottomWidth: 1 },
  'border-bot-2': { borderBottomWidth: 2 },
  'black': { borderColor: CONSTANT.COLOR.BLACK },
  'white': { borderColor: CONSTANT.COLOR.WHITE },
  'orange': { borderColor: CONSTANT.COLOR.ORANGE },
  'gray-dark': { borderColor: CONSTANT.COLOR.GRAYDARK },
  'green': { borderColor: CONSTANT.COLOR.GREEN },
  'blue': { borderColor: CONSTANT.COLOR.BLUE },
  'top-bot-0.5-gray': {
    borderColor: CONSTANT.COLOR.GRAY,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
  }
});

export const SColor = StyleSheet.create({
  red: { color: CONSTANT.COLOR.RED },
  white: { color: CONSTANT.COLOR.WHITE },
  'gray-dark': { color: CONSTANT.COLOR.GRAYDARK },
  'gray': { color: CONSTANT.COLOR.GRAY },
  'gray-light': { color: CONSTANT.COLOR.GRAY_LIGHT },
  black: { color: CONSTANT.COLOR.BLACK },
  'orange-contrast': { color: CONSTANT.COLOR['ORANGE-CONSTRAST'] },
});

export const Position = StyleSheet.create({
  relative: { position: 'relative' },
  absolute: { position: 'absolute' }
})

export const BackGround = StyleSheet.create({
  'green': { backgroundColor: CONSTANT.COLOR.GREEN }, 
  'orange': {backgroundColor: CONSTANT.COLOR.ORANGE },
  'orange-contrast': { backgroundColor: CONSTANT.COLOR['ORANGE-CONSTRAST'] },
  'blue': { backgroundColor: CONSTANT.COLOR.BLUE, },
  'blue-light': { backgroundColor: CONSTANT.COLOR['BLUE-LIGHT'] },
  'black': { backgroundColor: CONSTANT.COLOR.BLACK },
  'gray': { backgroundColor: CONSTANT.COLOR.GRAY },
  'gray-light': { backgroundColor: CONSTANT.COLOR.GRAY_LIGHT },
  'dark': { backgroundColor: CONSTANT.COLOR.DARK },
  'gray-dark': { backgroundColor: CONSTANT.COLOR.GRAYDARK },
  'white':{ backgroundColor: CONSTANT.COLOR.WHITE },
  'red': { backgroundColor: CONSTANT.COLOR.RED },
});
export const SLayout = StyleSheet.create({
  FullScreen: {
    height: '100%',
    width: '100%'
  },
  selfCenter: {
    alignSelf: 'center',
  },
  centerRow: {
    justifyContent: 'center',
  },
  centerCol: {
    alignItems: 'center',
  },
  centerButtom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  flex1: { flex: 1 },
  'flex-0.5': { flex: 0.5 },
  'flex-horizontal': { flexDirection: 'row' },
  'flex-vertical': { flexDirection: 'column' },
  flex: { display: 'flex' },
  'hei-100': { height: '100%' },
  'hei-240p': { height: 240 },
  'hei-200p': { height: 200 },
  'hei-100p': { height: 100 },
  'hei-160p': { height: 160 },
  'hei-40p': { height: 40 },
  'hei-50p': { height: 50 },
  'line-hei40p': { lineHeight: 40 },
  'line-hei50p': { lineHeight: 50 },
  'line-hei200p': { lineHeight: 200 },
  'line-hei240p': { lineHeight: 240 },
});

export const SFlex = StyleSheet.create({
  flex: { display: 'flex' },
  dirRow: { flexDirection: 'row' },
  'dirRowEnd': { 
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  dirCol: { flexDirection: 'column' },
  justifyCenter: { justifyContent: 'center' },

  alignCenter: { alignItems: 'center' },
  '1': { flex: 1 },

  center:  {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export const Padding = StyleSheet.create({
  'top-10': { paddingTop: 10 },
  'top-20': { paddingTop: 20 },
  'bottom-14': { paddingBottom: 14 },
  '3': { padding: 3 },
  '5': { padding: 5 },
  '10': { padding: 10 },
  '15': { padding: 15 },
  '30': { padding: 30 },
  'left-5': { paddingLeft: 5 },
  'left-10': { paddingLeft: 10 },
  'left-20': { paddingLeft: 20 },

  'right-5': { paddingRight: 5 },
  'right-10': { paddingRight: 10 },
  'right-20': { paddingRight: 20 },

  'bot-10': { paddingBottom: 10 },
  'bot-20': { paddingBottom: 20 },

  'top-bot-5': {
    paddingTop: 5, paddingBottom: 5,
  },
  'top-bot-10': {
    paddingTop: 10, paddingBottom:10,
  },
  'top-bot-20': {
    paddingVertical: 20,
    // paddingTop: 20, paddingBottom: 20
  },
  'top-bot-24': {
    paddingTop:24,
    paddingBottom: 24
  },

  'left-right-15': { 
    // paddingLeft: 15, paddingRight: 15 
    paddingHorizontal: 15,
  },
  'left-right-25': { paddingLeft: 25, paddingRight: 25 }
});

export const SMargin = StyleSheet.create({
  'left-10': { marginLeft: 10 },
  'left-20': { marginLeft: 20 },

  'right-5': { marginRight: 5 },
  'right-8': { marginRight: 8 }, 
  'right-10': { marginRight: 10, },
  'right-15': { marginRight: 15 },
  'right-20': { marginRight: 20 },

  'bot-3': { margin: 3 },
  'bot-5':  { marginBottom: 5 },
  'bot-10': { marginBottom: 10 },
  'bot-20': { marginBottom: 20 },

  'top-10': { marginTop:10 },
  'top-20': { marginTop:20 },
})

export const SHorizontalPageing = StyleSheet.create({
  container: {
    ...SLayout['flex-horizontal'],
    ...SLayout['hei-40p'],
    ...BackGround.white,
  },
  active: {
    ...BackGround.orange
  },
  itemContainer: {
    ...Padding[5],
    ...SFlex[1],
    ...SFlex.flex,
  },
  item: {
    overflow: 'hidden',
    ...SLayout.flex1,
    ...SLayout.flex,
    ...SFlex.center,
    ...Border['radius-5'],
  }
})

export const FlexInline = StyleSheet.create({
  container: {
    ...SLayout.flex,
    ...SLayout['flex-horizontal'],
    flexWrap: 'wrap'
  }
})
export const SUserList = StyleSheet.create({
  itemContainer: {
    ...SLayout.flex,
    ...SLayout['flex-horizontal'],
  },
  UserInfoSummaryTxt: {
    ...SText.Small,
    ...SColor.white,
  },
  UserInfoSummaryCtn: {
    opacity: 0.8,
    paddingLeft: 3, paddingRight: 3, 
    borderRadius: 3, marginBottom: 3,
    marginRight: 3,
    ...BackGround.blue,
  },
  InfoContainer: {
    height: 80,
    ...Padding[5],
    ...SFlex.flex,
    ...SFlex.justifyCenter,
  },
  username :{
    ...Font.poppins,
    ...SText.Medium,
    fontWeight: '600',
    ...SColor['gray-dark'],
    
  }
})

export const SImage = StyleSheet.create({
  container: {
    overflow: 'hidden',
    ...SLayout.flex,
    ...SFlex.center,
  },
  loading: {
    top: 0, left: 0, width: '100%', height: '100%',
    ...Position.absolute,
    ...SLayout.flex,
    ...SFlex.center,
  }
})

export const ScreenTitle = StyleSheet.create({
  title: {
    color: CONSTANT.COLOR.BLACK,
    ...SText.XLarge,
    ...SText.XBold
  }
})

export const SModal = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '100%', width: '100%', top:0, left:0,
  },
  titleContainer: {
    ...SMargin['bot-20'],
    ...SFlex.flex,
    ...SFlex.dirRow,
    ...SFlex.justifyCenter,
    ...Padding['left-right-25'],
  },
  title: {
    ...SFlex[1],
    ...SFlex.justifyCenter,
  },
  titleText: {
    ...SText.Large,
  },
  body: {
    flex: 1,
  },
  show: {
    elevation: 3,
    zIndex: 2, opacity: 0.8
  },
  messageContainer: {
    ...SFlex[1],
  },
  message: {
    ...Padding['left-right-25']
  },
  buttonContainer: {
    marginTop: 25,
    ...Padding['left-right-25'],
    ...SFlex.flex,
    flexDirection: 'row-reverse'
  },
  button: {
    ...SHeight['48p'], 
    ...SFlex.flex, 
    ...SFlex.center,
    ...SWidth['100p'],
    ...Border['radius-5'],
  },
  cancleButton: {
    ...SColor.black,
    ...BackGround.white
  },
  okButton: {
    ...BackGround.green,
  },
  modal: {
    position: 'absolute',
    elevation: 1, zIndex: 1,
    ...Padding['top-20'],
    ...Padding['bot-20'],
    height: '33%',
    top: '33%',
    width: '90%',
    left: '5%',
    ...BackGround['dark'],
    ...Border['radius-5'],
  }
})

export const SLoginPage = StyleSheet.create({
  Containter: {
    ...Padding[30],
    ...SLayout.flex,
    ...SLayout.flex1,
  },
  Logo: {
    ...SLayout.flex1,
    ...SLayout.flex,
    ...SFlex.center,
  },
  Brand: {
    fontSize: 48,
    ...Padding['bottom-14'],
  },
  Introduction: {
    ...SLayout.flex1,
    ...SLayout.flex
  },
  Input_UserName: {
    ...SText.Medium,
    ...SLayout['hei-40p'],
    ...Border['black'],
    ...Border['border-bot-1'],
    ...Border['radius-3'],
    ...Padding['left-5'],
    ...Padding['right-20'],
  },
  Message : {
    ...SColor.red,
    ...SText.HCenter,
    ...SMargin['bot-20'],
  },
  IntroductionTitle: {
    ...SColor.white,
    ...SText.SemiBold,
    ...SText.Medium,
  },
  IntroductionMessage : {
    ...SColor.white,
    ...SText.Regular,
    ...SText.Small,
  },
  LoginButton: {
    ...SLayout['hei-50p'],
    ...BackGround.dark,
    ...Border['radius-10'],
  },
  LoginButtonText: {
    ...SColor.white,
    ...SText.Large,
    ...SText.SemiBold,
    ...SLayout.selfCenter,
    ...SLayout['hei-50p'],
    ...SLayout['line-hei50p'],
  },
});

export const SButtonDefault = StyleSheet.create({
  container: {
    ...SFlex.flex,
    ...SFlex.center,
    height: '100%',
    width: '100%',
    ...Border['radius-5'],
    ...BackGround.dark,
  },
  text: {
    ...SColor.white
  }
})

export const SApp = StyleSheet.create({
  Body: {
    fontFamily: 'Poppins',
    ...SLayout.flex,
    ...SLayout.flex1,
  }
})

export const SLoading = StyleSheet.create({
  Container :{
    ...SLayout.FullScreen,
    ...SFlex.center,
  }
})

export const SDashboard = StyleSheet.create({
  message: {
    ...SLayout.flex,
    ...SLayout.flex1,
    ...SFlex.center,
  },
})

export const SUserStatus = StyleSheet.create({
  container: {
    ...SFlex.flex,
    ...BackGround.orange,
  }
})

export const STopSubMenu = StyleSheet.create({
  container: {
    ...SLayout.flex,
    ...SLayout['flex-horizontal'],
  },
  selected: {
    opacity: 1
  },
  horizontalItems: {
    ...SLayout.flex1,
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    ...SMargin['top-20'],
    ...BackGround.orange,
    height: 3,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    opacity: 0,
  },
  icon: {
    ...SFlex.flex,
    ...SFlex.center,
    height: 40,
    width: '70%',
  }
})

export const STopHeader = StyleSheet.create({
  container: {
    height: 60,
    ...SFlex.flex,
    ...SFlex.dirRow,
    ...Padding[10],
    ...BackGround.white,
  },
  searchContainer: {
    marginRight: 10,
    ...SFlex[1],
    ...SFlex.flex,
    ...SFlex.dirRowEnd,
    alignItems: 'center'
  },
})

export const CircleOutSideIcon = StyleSheet.create({
  circle: {
    ...BackGround['gray-light'],
    borderRadius: 40/2,
    height: 40,
    width: 40,
    ...SFlex.flex,
    ...SFlex.center,
  },
})