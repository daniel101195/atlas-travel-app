import { useCallback, useEffect, useState } from "react";
import { redirect, REDIRECT_TYPE } from '../../navigation/helper';
import { screens } from "../../navigation/screens";
import { yupResolver } from '@hookform/resolvers/yup';
import { LocalizeString } from '../../localize';
import * as yup from "yup";
import { onSignUp, onUpdateUserProfile, onSetUserInfo } from '~/api';
import firestore from "@react-native-firebase/firestore";

const schema = yup.object().shape({
  Username: yup.string().required(LocalizeString.errorRequireField).min(6).max(15),
  Password: yup.string().required(LocalizeString.errorRequireField).matches(/(?=.*\d)(?=.*[A-Z])(?=.*\W)/, LocalizeString.errorPasswordNotValid),
  confirmPassword: yup.string().required(LocalizeString.errorRequireField)
    .oneOf([yup.ref('Password'), null], LocalizeString.errorConfirmPassNotMatch),
  Email: yup.string().matches(/^[a-zA-Z0-9]+@[a-zA-z0-9]{1,}(.[a-zA-Z]{1,}){1,}$/,
    LocalizeString.errorEmailNotValid).required(LocalizeString.errorRequireField),
  Terms: yup.bool().oneOf([true], LocalizeString.errorConfirmTerm)
});

const useSignUpHooks = (props, useForm) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });;
  const inputs = ['Username', 'Password', 'confirmPassword', 'Email'];
  const [isAgreeTerm, setAgreeTerm] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onChangeAgree = useCallback((onChange = () => { }) => {
    setAgreeTerm(!isAgreeTerm);
    onChange(!isAgreeTerm)
  }, [isAgreeTerm])

  const onNavigateSignIn = useCallback((userInfo = {}) => {
    redirect(props?.navigation, screens.signIn.name, REDIRECT_TYPE.replace, userInfo);
  }, [props])

  const onUpdateUserInfo = (data = {}) => {
    const timestamp = firestore.FieldValue.serverTimestamp();
    const userInfo = {
      email: data?.Email,
      userName: data?.Username,
      displayName: data?.Username,
      isAgreeTerms: data?.Terms,
      avatar: '',
      createdAt: timestamp,
      updatedAt: timestamp
    }
    onSetUserInfo({ userInfo });
  }

  const onSubmit = useCallback(async (data) => {
    try {
      if (!data) return;
      setLoading(true);
      const result = await onSignUp({ username: data.Email, password: data.Password });
      if (result) {
        onUpdateUserInfo(data);
        const resp = await onUpdateProfile(data);
        resp && onNavigateSignIn({
          email: data.Email,
          password: data.Password
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [isAgreeTerm])

  const onUpdateProfile = async (data) => {
    const profile = {
      displayName: data.Username,
      photoURL: 'https://hungrygen.com/wp-content/uploads/2019/11/placeholder-male-square.png',
    };
    return await onUpdateUserProfile({ updateProfile: profile });;
  }

  const onValidateError = useCallback(() => {
    if (Object.keys(errors).length > 0) return;
    onSubmit();
  }, [errors])

  const onGetDefaultValue = (type) => {
    switch (type) {
      case inputs[0]: return '';
      case inputs[1]: return '';
      case inputs[2]: return '';
      case inputs[3]: return '';
      default: return '';
    }
  }

  const onValidTerms = useCallback(() => {

  }, [isAgreeTerm])

  useEffect(() => {
    onValidateError();
  }, [errors])

  useEffect(() => {
    onValidTerms();
  }, [isAgreeTerm])

  return {
    inputs,
    control,
    handleSubmit,
    errors,
    isLoading,
    onChangeAgree,
    onNavigateSignIn,
    onSubmit,
    onGetDefaultValue
  }
}

export default useSignUpHooks