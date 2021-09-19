
const SCHEMA_NAMES = {
  userInfo: "UserInfo"
}

const UserInfoSchema = {
  name: SCHEMA_NAMES.userInfo,
  properties: {
    userName: "string",
    password: "string",
    email: "string",
    avatar: "string",
  },
  primaryKey: "email",
};

export {
  UserInfoSchema,
  SCHEMA_NAMES
}