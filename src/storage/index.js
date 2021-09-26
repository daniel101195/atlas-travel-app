import { isEmpty } from "lodash";
import Realm from "realm";
import { UserInfoSchema, SCHEMA_NAMES, SCHEMA_VERSION, UPDATE_MODE } from './models';

//=============================== Helper Functions ================================

const createRealm = async (schema) => {
  return await Realm.open({
    schema: [schema],
    schemaVersion: SCHEMA_VERSION
  });
}

const writeData = async (schemeName = '', objData = {}, schema, primaryKey) => {
  try {
    const realm = await createRealm(schema);
    if (realm) {
      const object = await readDataWithPrimaryKey(schema, schemeName, primaryKey);
      // check if Object with same primary key is existed or not
      !object && realm.write(() => realm.create(schemeName, objData));
      closeRealm(realm);
    }
  } catch (error) {
    console.log('===>writeData: ', error);
  }
}

const readData = async (schema, schemaName = '') => {
  try {
    const realm = await createRealm(schema);
    if (realm) {
      const resp = realm.objects(schemaName);
      return { resp };
    }
  } catch (error) {
    console.log('===>readData: ', error);
  }
}

const readDataWithPrimaryKey = async (schema, schemaName = '', key = '') => {
  try {
    const realm = await createRealm(schema);
    if (realm) {
      const object = realm.objectForPrimaryKey(schemaName, key);
      return object;
    }
  } catch (error) {
    console.log('===>readDataWithPrimaryKey: ', error);
  }
}

const deleteDataWithPrimaryKey = async (objPrimaryKey = '', schema, schemaName) => {
  try {
    const realm = await createRealm(schema);
    if (realm) {
      realm.write(() => realm.delete(realm.objectForPrimaryKey(schemaName, objPrimaryKey)));
      closeRealm(realm);
    }
  } catch (error) {
    console.log('===>deleteData: ', error);
  }
}

const upsertWithPrimaryKey = async (userInfo = {}, schema, schemaName) => {
  try {
    const realm = await createRealm(schema);
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
  const { resp } = await readData(UserInfoSchema,schemaName);
  if (!isEmpty(resp)) { // make storage user is unique by delete the exist and add new.
    const { email } = resp[0] || {};
    await deleteDataWithPrimaryKey(email, UserInfoSchema, schemaName);
  }
  await upsertWithPrimaryKey(userInfo, UserInfoSchema, schemaName);
}

const getUserInfo = async () => {
  const data = await readData(UserInfoSchema, SCHEMA_NAMES.userInfo);
  return data?.resp;
}

const deleteUserInfo = async (email = '') => {
  await deleteDataWithPrimaryKey(email, UserInfoSchema, SCHEMA_NAMES.userInfo);
}

export {
  closeRealm,
  saveUserInfo,
  getUserInfo,
  deleteUserInfo,
  UserInfoSchema,
  SCHEMA_NAMES
}

