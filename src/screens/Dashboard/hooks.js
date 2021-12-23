import { useCallback, useContext, useEffect, useState } from "react";
import { screens } from '~/navigation/screens';
import { redirect, REDIRECT_TYPE } from '~/navigation/helper';
import { useNavigation } from '@react-navigation/native';
import { onChangeLang, getCurrentLang, LANGUAGE } from '~/localize';
import { GlobalContext } from '~/context';
import { changeLanguage } from '~/context/actions';
import { onAuthStateChanged } from '~/api';
import { getUserInfo } from '~/storage';

const useDashboardHooks = (props) => {
  const { dispatch } = useContext(GlobalContext);
  const navigation = useNavigation();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  const onNavigateLogin = useCallback(() => {
    redirect(navigation, screens.signIn.name, REDIRECT_TYPE.navigate);
  }, [props])

  const onNavigateSignUp = useCallback(() => {
    redirect(navigation, screens.signUp.name, REDIRECT_TYPE.navigate);
  }, [props])

  const onChangeLanguage = useCallback(() => {
    onChangeLang(getCurrentLang() === LANGUAGE.en ? LANGUAGE.es : LANGUAGE.en);
    dispatch(changeLanguage(getCurrentLang()));
  }, [props])

  // Handle user state changes
  const onAuthStateChange = (user) => {
    initializing && setInitializing(false);
  }

  const onGetUserInfo = async () => {
    const data = await getUserInfo();
  }

  //----------------------------- Side Effects -----------------------------

  useEffect(() => {
    onGetUserInfo();
    const subscriber = onAuthStateChanged(onAuthStateChange);
    return subscriber; // unsubscribe on unmount
  }, []);

  return {
    onNavigateLogin,
    onNavigateSignUp,
    onChangeLanguage
  }
}

export default useDashboardHooks