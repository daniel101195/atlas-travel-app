import { redirect, REDIRECT_TYPE } from "../../navigation/helper";

const useEmailHooks = (props) => {

  const onConfirm = () => {
    redirect(props.navigation, screens.signUp.name, REDIRECT_TYPE.replace)
  }

  return {
    onConfirm
  }
}

export default useEmailHooks