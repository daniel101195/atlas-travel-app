import { StackActions, CommonActions } from '@react-navigation/native';
import { Spacing } from '~/metrics';
import colors from '~/utils/colors';

const getStackAction = (type, screenName, params, popOffset) => {
  switch (type) {
    case REDIRECT_TYPE.pop:
      return StackActions.pop(popOffset);
    case REDIRECT_TYPE.popToTop:
      return StackActions.popToTop();
    case REDIRECT_TYPE.replace:
      return StackActions.replace(screenName, params);
    case REDIRECT_TYPE.push:
      return StackActions.push(screenName, params);
    case REDIRECT_TYPE.goBack:
      return CommonActions.goBack();
    case REDIRECT_TYPE.navigate:
      return CommonActions.navigate({
        name: screenName,
        params,
      });
    default:
      return null;
  }
}

export const REDIRECT_TYPE = {
  pop: 'pop',
  popToTop: 'popToTop',
  replace: 'replace',
  push: 'push',
  goBack: 'goBack',
  navigate: 'navigate'
}

export const redirect = (navigation, screenName = '', type = REDIRECT_TYPE.navigate, params = {}, popOffset = 1) => {
  navigation?.dispatch?.(
    getStackAction(type, screenName, params, popOffset)
  );
}

export const redirect_comp = (comp, navigation, screenName = '', params = {}) => {
  navigation.navigate(comp, { screen: screenName, params });
}

export const screenOptions = ({ navigation }, otherOpts) => ({
  headerTitleStyle: {
    fontFamily: 'Montserrat-Medium',
    letterSpacing: Spacing.XXS,
    color: colors.black
  },
  headerTransparent: true,
  // headerLeft: () => renderCloseIcon(navigation),
  headerTitleAlign: 'center',
  ...otherOpts
})