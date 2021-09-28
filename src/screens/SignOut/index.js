import { redirect_comp } from '../../navigation/helper';
import { stacks, screens } from "../../navigation/screens";
import { onSignOut as SignOutAuth } from '../../api';
import { deleteUserInfo } from '../../storage';

const SignOut = (navigation, state) => {

  const deleteUserInfoRealm = async () => {
    const { userInfo = {} } = state;
    await deleteUserInfo(userInfo?.email);
  }

  const onSignOut = async () => {
    await SignOutAuth();
    redirect_comp(stacks.authen.name, navigation, screens.dashboard.name);
  }

  return {
    onSignOut
  }
}

export default SignOut