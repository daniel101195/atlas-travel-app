
const SCHEMA_VERSION = 1;

const UPDATE_MODE = {
  MODIFIED: 'modified'
}

const SCHEMA_NAMES = {
  userInfo: "UserInfo"
}

const UserInfoSchema = {
  name: SCHEMA_NAMES.userInfo,
  properties: {
    username: "string",
    password: "string",
    email: "string",
    avatar: "string",
  },
  primaryKey: "email",
};

export {
  UserInfoSchema,
  SCHEMA_NAMES,
  SCHEMA_VERSION,
  UPDATE_MODE
}