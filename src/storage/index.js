import { isEmpty } from "lodash";
import Realm from "realm";
import { UserInfoSchema, SCHEMA_NAMES, SCHEMA_VERSION, UPDATE_MODE } from './models';

//=============================== Helper Functions ================================

const createRealm = (schema) => {
  return new Realm({ schema: [schema], schemaVersion: SCHEMA_VERSION });
}

const writeData = (schemeName = '', objData = {}, schema) => {
  try {
    const realm = createRealm(schema);
    if (realm) {
      realm.write(() => realm.create(schemeName, objData));
    }
  } catch (error) {
    console.log('===>writeData: ', error);
  }
}

const readData = (schema, schemaName = '') => {
  try {
    const realm = createRealm(schema);
    if (realm) {
      const data = realm.objects(schemaName);
      return data;
    }
  } catch (error) {
    console.log('===>readData: ', error);
    return [];
  }
}

const readDataWithPrimaryKey = (schema, schemaName = '', key = '') => {
  try {
    const realm = createRealm(schema);
    if (realm) {
      const object = realm.objectForPrimaryKey(schemaName, key);
      return object;
    }
  } catch (error) {
    console.log('===>readDataWithPrimaryKey: ', error);
  }
}

const deleteDataWithPrimaryKey = (objPrimaryKey = '', schema, schemaName) => {
  try {
    const realm = createRealm(schema);
    if (realm) {
      realm.write(() => realm.delete(realm.objectForPrimaryKey(schemaName, objPrimaryKey)));
      closeRealm(realm);
    }
  } catch (error) {
    console.log('===>deleteData: ', error);
  }
}

const upsertWithPrimaryKey = (userInfo = {}, schema, schemaName) => {
  try {
    const realm = createRealm(schema);
    if (realm) {
      realm.write(() => realm.create(schemaName, userInfo, UPDATE_MODE.MODIFIED));
      closeRealm(realm);
    }
  } catch (error) {
    console.log('===>upsertDataError: ', error);
  }
}

const closeRealm = (realm) => {
  !!realm && !realm.isClosed && realm.close();
}

//=================================== Execute Functions ===================================

const saveUserInfo = async (userInfo = {}) => {
  const schemaName = SCHEMA_NAMES.userInfo;
  const resp = readData(UserInfoSchema, schemaName);
  if (!isEmpty(resp)) { // make storage user is unique by delete the exist and add new.
    const { email } = resp[0] || {};
    deleteDataWithPrimaryKey(email, UserInfoSchema, schemaName);
  }
  upsertWithPrimaryKey(userInfo, UserInfoSchema, schemaName);
}

const getUserInfo = () => {
  const resp = readData(UserInfoSchema, SCHEMA_NAMES.userInfo);
  return resp;
}

const deleteUserInfo = async (email = '') => {
  deleteDataWithPrimaryKey(email, UserInfoSchema, SCHEMA_NAMES.userInfo);
}

export {
  closeRealm,
  saveUserInfo,
  getUserInfo,
  deleteUserInfo,
  UserInfoSchema,
  SCHEMA_NAMES
}

