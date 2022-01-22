import { JSXElementConstructor, ReactChildren } from "react";
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
  navigation: NavigationProps,
  route: RouteProps
}
export interface RouteProps {
  params: ParamsRouteProps
}
export interface ParamsRouteProps {
  roomId: String
}
export interface NavigationProps {
  toggleDrawer: Function,
  setOptions: Function,
  canGoBack: Function,
  goBack: Function
}

export interface FloatingButtonProps {
  customStyle?: Object,
  onPress: () => void
}

export interface ItemMessageProps {
  email: String
  item: MessageProps,
  onNavigateConversation: (item) => void
}

export interface MessageProps {
  imageUrl: String,
  roomName: String,
  lastMessage: String,
  lastSeenBy: String,
  lastSender: String,
  participants: Array<String>,
  updatedAt: TimeInterface,
  createdAt: TimeInterface,
  id?: String
}
export interface TimeInterface {
  seconds: number
}
export interface ConversationProps {

}
export interface MessageInputProps {
  onSend: (message: String) => void
}
export interface AlertPopupProps {
  onPress: () => void,
  children: JSXElementConstructor
}