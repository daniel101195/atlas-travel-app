import { useCallback, useEffect, useState } from "react";
import { redirect, REDIRECT_TYPE } from '../../navigation/helper';
import { screens } from "../../navigation/screens";
import { yupResolver } from '@hookform/resolvers/yup';
import { LocalizeString } from '../../localize';
import * as yup from "yup";
import { onSignUp, onUpdateUserProfile } from '../../api';

const schema = yup.object().shape({
  Username: yup.string().required(LocalizeString.errorRequireField).min(6).max(12),
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
  const [shouldPassInfo, setPassInfo] = useState(false);

  const onChangeAgree = useCallback((onChange = () => { }) => {
    setAgreeTerm(!isAgreeTerm);
    onChange(!isAgreeTerm)
  }, [isAgreeTerm])

  const onNavigateSignIn = useCallback(() => {
    if (shouldPassInfo) {
      const username = control?.fieldsRef?.current?.Email?._f?.value;
      const password = control?.fieldsRef?.current?.Password?._f?.value;
      redirect(props?.navigation, screens.signIn.name, REDIRECT_TYPE.replace, { username, password });
    } else {
      redirect(props?.navigation, screens.signIn.name, REDIRECT_TYPE.replace);
    }
  }, [props])

  const onNavigateEmail = useCallback(() => {
    redirect(props?.navigation, screens.email.name, REDIRECT_TYPE.navigate)
  }, [props])

  const onSubmit = useCallback(async (data) => {
    if (data) {
      try {
        setLoading(true);
        const result = await onSignUp({ username: data.Email, password: data.Password });
        if (result) {
          setPassInfo(true);
          const profile = {
            displayName: data.Username,
            photoURL: 'https://hungrygen.com/wp-content/uploads/2019/11/placeholder-male-square.png',
          };
          const resp = await onUpdateUserProfile({ updateProfile: profile });
          resp && onNavigateSignIn();
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  }, [isAgreeTerm])

  const onValidateError = useCallback(() => {
    if (Object.keys(errors).length > 0) return;
    onSubmit();
  }, [errors])

  const onGetDefaultValue = (type) => {
    switch (type) {
      case inputs[0]: return 'Daniel';
      case inputs[1]: return 'Viet@123';
      case inputs[2]: return 'Viet@123';
      case inputs[3]: return 'daniel@gmail.com';
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