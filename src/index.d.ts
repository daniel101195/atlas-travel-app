import { JSXElementConstructor, ReactChildren } from "react";
import { StyleProp, ViewProps } from "react-native";

export declare type ConversationType = 'TEXT' | 'IMAGE' | 'VIDEO';
export interface MessagingProps {
  
}

export interface HeaderProps {
  title: String,
  haveRightIcons?: Boolean,
  isDarkStyle?: Boolean,
  childTab?: Object,
  isShowLine?: Boolean,
  navigation?: any,
  isBasicHeader?: boolean
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
  id: string,
  content: string | ImageProps,
  createdAt: any,
  sender: string,
  type: ConversationType,
  updatedAt: any,
  isShowTimestamp?: boolean,
  timestamp?: any,
  timeStamp?: any
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
  item: ConversationProps,
  onPressImage?: () => void
}
export interface MessageInputProps {
  onSend: (message: string | ImageProps, messageType: string) => void
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
export interface ImageProps {
  fileName?: string,
  fileSize?: string,
  type?: string,
  uri?: string
}