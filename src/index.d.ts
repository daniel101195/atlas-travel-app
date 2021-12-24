import { StyleProp, ViewProps } from "react-native";

export interface MessagingProps {
  
}

export interface HeaderProps {
  onToggleDrawer: Function,
  title: String,
  haveRightIcons?: Boolean
}

export interface ScreenProps {
  navigation: NavigationProps
}

export interface NavigationProps {
  toggleDrawer: Function
}

export interface FloatingButtonProps {
  customStyle?: Object,
  onPress: () => null
}