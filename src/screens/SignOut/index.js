import { redirect_comp } from '../../navigation/helper';
import { stacks, screens } from "../../navigation/screens";
import { onSignOut } from '../../api';
import { deleteUserInfo } from '../../storage';

const SignOut = (props, userInfo) => {

  const deleteUserInfoRealm = async () => {
    await deleteUserInfo(userInfo?.email);
  }

  onSignOut().then(() => {
    deleteUserInfoRealm();
    redirect_comp(stacks.authen.name, props?.navigation, screens.dashboard.name);
  });
}

export default SignOut