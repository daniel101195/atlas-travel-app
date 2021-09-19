import { useCallback, useEffect, useState, useContext } from "react";
import { validateEmail, checkStringEmpty } from '../../utils/string';
import { LocalizeString } from '../../localize';
import { screens, stacks } from "../../navigation/screens";
import { redirect, redirect_comp, REDIRECT_TYPE } from "../../navigation/helper";
import { saveUserInfo, getUserInfo } from '../../storage';
import { updateUserInfo } from '../../context/actions';
import { GlobalContext } from '../../context';
import { onSignIn } from '../../api';
import isEmpty from 'lodash/isEmpty';

const useLoginHooks = (props) => {
  const { dispatch } = useContext(GlobalContext);
  const [isRemember, setRemember] = useState(false);
  const [isShowPass, setShowPass] = useState(false);
  const [isValidate, setValidate] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const onChangeRememberLogin = useCallback(() => {
    setRemember(!isRemember)
  }, [isRemember])

  const onChangeUsername = useCallback((email) => {
    setUsername(email);
    onChangeValidation();
  }, [username])

  const onChangePassword = useCallback((pass) => {
    setPassword(pass)
  }, [password])

  const onDispatchUserInfo = (userInfo) => {
    dispatch(updateUserInfo(userInfo));
  }

  const onSubmit = useCallback(async () => {
    try {
      onChangeLoading(true);
      if (onValidateInput()) {
        const userInfo = {
          userName: username,
          password,
          email: username,
          avatar: 'https://hungrygen.com/wp-content/uploads/2019/11/placeholder-male-square.png',
        }
        onDispatchUserInfo(userInfo);
        const result = await onSignIn({ username, password });
        if (result) {
          isRemember && saveUserInfo(userInfo);
          redirect_comp(stacks.home.name, props?.navigation, screens.discover.name);
        }
      }
    } catch (error) {

    }
    onChangeLoading(false);
  }, [username, password])

  const onHidePass = useCallback(() => {
    setShowPass(false);
  }, [isShowPass])

  const onShowPass = useCallback(() => {
    setShowPass(true);
  }, [isShowPass])

  const onChangeValidation = useCallback(() => {
    setValidate(!isValidate);
  }, [isValidate])

  const onChangeLoading = useCallback((value) => {
    setLoading(value)
  }, [isLoading])

  const onNavigateSignUp = () => {
    redirect(props.navigation, screens.signUp.name, REDIRECT_TYPE.replace)
  }

  const onValidateInput = useCallback(() => {
    if (checkStringEmpty(username)) {
      setErrorMessage(LocalizeString.stringIsEmpty.replace('{FIELDS}', 'Username'));
      checkStringEmpty(password) && setErrorMessage(LocalizeString.stringIsEmpty.replace('{FIELDS}', 'Password'));
      return false;
    }
    if (checkStringEmpty(password)) {
      setErrorMessage(LocalizeString.stringIsEmpty.replace('{FIELDS}', 'Password'));
      return false;
    }
    if (!validateEmail(username?.toLowerCase())) {
      setErrorMessage(LocalizeString.titleInvalidFormatEmail);
      return false;
    }
    return true;
  }, [username, password])

  const onGetUserInfo = async () => {
    setLoading(true);
    const { username, password } = props?.route?.params;
    if (!!username && !!password) {
      setUsername(username);
      setPassword(password);
    } else {
      const data = await getUserInfo();
      if (!isEmpty(data)) {
        setUsername(data[data.length - 1].userName);
        setPassword(data[data.length - 1].password);
      }
    }
    setLoading(false);
  }

  //----------------------------- Side Effects -----------------------------

  useEffect(() => {
    onGetUserInfo();
  }, [])

  useEffect(() => {
    if (isValidate) {
      if (!validateEmail(username.toLowerCase())) {
        errorMessage !== LocalizeString.titleInvalidFormatEmail &&
          setErrorMessage(LocalizeString.titleInvalidFormatEmail)
      } else {
        setErrorMessage('')
      }
    }
  }, [username])

  return {
    isRemember,
    username,
    password,
    isShowPass,
    errorMessage,
    isLoading,
    onChangeUsername,
    onChangePassword,
    onChangeRememberLogin,
    onSubmit,
    onHidePass,
    onShowPass,
    onNavigateSignUp
  }
}

export default useLoginHooks