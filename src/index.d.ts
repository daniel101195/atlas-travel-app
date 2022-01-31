import { JSXElementConstructor, ReactChildren } from "react";
import { StyleProp, ViewProps } from "react-native";

export declare type ConversationType = 'text' | 'image' | 'video';
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
  params: { roomInfo: MessageProps }
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
  email: string
  item: MessageProps,
  onNavigateConversation: (item) => void
}

export interface MessageProps {
  imageUrl: string,
  roomName: string,
  lastMessage: string,
  lastSeenBy: Array<string>,
  lastSender: string,
  participants: Array<MemberProps>,
  updatedAt: TimeInterface,
  createdAt: TimeInterface,
  id?: string
}
export interface MemberProps {
  avatar: string,
  displayName: string,
  email: string
}
export interface ConversationProps {
  content: string,
  createdAt: string,
  sender: string,
  type: ConversationType,
  updatedAt: any
}
export interface UserProps {
  avatar: string,
  createdAt: string,
  displayName: string,
  email: string,
  isAgreeTerms: boolean,
  updatedAt: string,
  userName: string
}
export interface TimeInterface {
  seconds: number
}
export interface BubbleConversationProps {
  email: string,
  item: ConversationProps
}
export interface MessageInputProps {
  onSend: (message: String) => void
}
export interface AlertPopupProps {
  onPress: () => void,
  children: JSXElementConstructor
}
export interface ConversationScreenProps {

}
export interface GroupConversationProps {
  title: string,
  data: Array<ConversationProps>
}