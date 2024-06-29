import apiConfig from "../../config/apiConfig";
import { nodeFetchRestApi } from "../../helpers/apiHelpers";


// base url assign
const COMMON_BASE_URL = apiConfig.commonBaseUrl;
const EXPENSE_MANAGER__URL = apiConfig.expenseManagerUrl;


// =======================================  Common api's

export const LoginAccountByUserNameApi = async (body) => {
    try {
      return await nodeFetchRestApi(`${COMMON_BASE_URL}/auth/v1/user/account/login`,`POST`,{ "Content-Type": "application/json" },body); // prettier-ignore
    } catch (error) {
      console.error(error);
    }
};


export const FindUserByPhoneNumberApi = async (appid, phoneno) => {

  try {
    return await nodeFetchRestApi(`${COMMON_BASE_URL}/auth/v1/user/find/phone/${appid}/${phoneno}`,`GET`,{ "Content-Type": "application/json" },{}); // prettier-ignore
  } catch (error) {
    console.error(error);
  }
};


export const CreateAccountByUserNameApi = async body => {
  try {
    return await nodeFetchRestApi(`${COMMON_BASE_URL}/auth/v1/user/create/account`,`POST`,{ "Content-Type": "application/json" },body); // prettier-ignore
  } catch (error) {
    console.error(error);
  }
};


export const CreatePassbookApi = async body => {
  try {
    return await nodeFetchRestApi(`${EXPENSE_MANAGER__URL}/api/v1/cash/passbooks`,`POST`,{ "Content-Type": "application/json" },body); // prettier-ignore
  } catch (error) {
    console.error(error);
  }
};


export const getAllPassbookApi = async userId => {
  try {
    return await nodeFetchRestApi(`${EXPENSE_MANAGER__URL}/api/v1/cash/passbooks/${userId}`,`GET`,{ "Content-Type": "application/json" },{}); // prettier-ignore
  } catch (error) {
    console.error(error);
  }
};


export const deleteMultiplePassbooksApi = async body => {
  try {
    return await nodeFetchRestApi(`${EXPENSE_MANAGER__URL}/api/v1/cash/passbooks/delete`,`DELETE`,{ "Content-Type": "application/json" },body); // prettier-ignore
  } catch (error) {
    console.error(error);
  }
};


export const getAllCashbookApi = async cashBookId => {
  try {
    return await nodeFetchRestApi(`${EXPENSE_MANAGER__URL}/api/v1/cash/cash/${cashBookId}`,`GET`,{ "Content-Type": "application/json" },{}); // prettier-ignore
  } catch (error) {
    console.error(error);
  }
};




export const createcashApi = async cashBookId => {
  try {
    return await nodeFetchRestApi(`${EXPENSE_MANAGER__URL}/api/v1/cash/cash/${cashBookId}`,`GET`,{ "Content-Type": "application/json" },{}); // prettier-ignore
  } catch (error) {
    console.error(error);
  }
};
// =======================================