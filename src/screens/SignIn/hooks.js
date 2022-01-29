import { useCallback, useEffect, useState, useContext } from "react";
import { validateEmail, checkStringEmpty } from '../../utils/string';
import { LocalizeString } from '../../localize';
import { screens, stacks } from "../../navigation/screens";
import { redirect, redirect_comp, REDIRECT_TYPE } from "../../navigation/helper";
import { saveUserInfo, getUserInfo, deleteUserInfo } from '../../storage';
import { updateUserInfo } from '../../context/actions';
import { GlobalContext } from '../../context';
import { onSignIn, onGetUserInfo as onGetUserInfoFirestore } from '../../api';
import isEmpty from 'lodash/isEmpty';
import { lowercaseLetter } from '../../utils/string';

const useLoginHooks = (props) => {
  const { dispatch } = useContext(GlobalContext);
  const [isRemember, setRemember] = useState(false);
  const [isShowPass, setShowPass] = useState(false);
  const [isValidate, setValidate] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const onChangeRememberLogin = useCallback(() => {
    setRemember(!isRemember)
  }, [isRemember])

  const onChangeUsername = useCallback((email) => {
    setLoginData({ ...loginData, username: lowercaseLetter(email) });
    onChangeValidation();
  }, [loginData])

  const onChangePassword = useCallback((pass) => {
    setLoginData({ ...loginData, password: pass });
  }, [loginData])

  const onDispatchUserInfo = (userInfo) => {
    dispatch(updateUserInfo(userInfo));
  }

  const onSubmit = useCallback(async () => {
    try {
      onChangeLoading(true);
      if (onValidateInput()) {
        const userInfo = {
          username: loginData?.username,
          password: loginData?.password,
          email: loginData?.username,
          avatar: 'https://hungrygen.com/wp-content/uploads/2019/11/placeholder-male-square.png',
        }
        await onSubmitCompleted(await onSignIn({
          username: loginData?.username,
          password: loginData?.password
        }), userInfo);
      }
    } catch (error) {
      console.log('===>signInError: ', error);
    }
    onChangeLoading(false);
  }, [loginData, isRemember])

  const onSubmitCompleted = async (result, userInfo = {}) => {
    if (result) {
      isRemember ? saveUserInfo(userInfo) : onClearOldData(); // Save data user to local storage
      onDispatchUserInfo(await onGetUserInfoFirestore({ email: userInfo?.email })); // Dispatch data to Context Store.
      redirect_comp(stacks.home.name, props?.navigation, screens.discover.name); // Navigate to Dashboard.
    }
  }

  const onClearOldData = async () => {
    const oldData = await getUserInfo();
    !isEmpty(oldData) && deleteUserInfo(oldData[0].email);
  }

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
    const { username, password } = loginData;
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
  }, [loginData])

  const onGetUserInfo = async () => {
    setLoading(true);
    const { email, password } = props?.route?.params;
    if (!!email && !!password) {
      setLoginData({ username: lowercaseLetter(email), password });
    } else {
      const data = await getUserInfo();
      if (!isEmpty(data)) {
        setLoginData({
          username: lowercaseLetter(data[data.length - 1].email),
          password: data[data.length - 1].password
        });
        onChangeRememberLogin();
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
      if (!validateEmail(loginData?.username.toLowerCase())) {
        errorMessage !== LocalizeString.titleInvalidFormatEmail &&
          setErrorMessage(LocalizeString.titleInvalidFormatEmail)
      } else {
        setErrorMessage('')
      }
    }
  }, [loginData?.username])

  return {
    isRemember,
    isShowPass,
    errorMessage,
    isLoading,
    loginData,
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