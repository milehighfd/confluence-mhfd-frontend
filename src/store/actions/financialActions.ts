// financialReducer
import * as types from '../types/financialTypes';
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";

export const getFinancialData = (id: number, filters: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.GET_FINANCIAL_BY_ID(id), filters, datasets.getToken()).then(financialInformation => {
      dispatch({ type: types.GET_PROJECT_FINANCIAL_BY_ID, financialInformation });
    });
  }
}

export const setClickOpenPopup = (clickOpenPopup: boolean) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_CLICK_OPEN_POPUP, clickOpenPopup });
  }     
};
