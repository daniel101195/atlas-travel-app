import { StyleProp, ViewProps } from "react-native";

export interface MessagingProps {
  
}

export interface HeaderProps {
  onToggleDrawer: Function,
  title: String,
  haveRightIcons?: Boolean,
  isDarkStyle?: Boolean,
  childTab?: Object,
  isShowLine?: Boolean
}

export interface ScreenProps {
  navigation: NavigationProps
}

export interface NavigationProps {
  toggleDrawer: Function,
  setOptions: Function,
  canGoBack: Function,
  goBack: Function
}

export interface FloatingButtonProps {
  customStyle?: Object,
  onPress: () => null
}

export interface ItemMessageProps {
  email: String
  item: MessageProps,
  onNavigateConversation: () => void
}

export interface MessageProps {
  imageUrl: String,
  roomName: String,
  lastMessage: String,
  lastSeenBy: String,
  updatedAt: TimeInterface
}
export interface TimeInterface {
  seconds: number
}
export interface ConversationProps {

}