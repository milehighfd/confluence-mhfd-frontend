// financialReducer
import * as types from '../types/financialTypes';
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";

export const getFinancialData = ( id: any) => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GET_FINANCIAL_BY_ID(id), datasets.getToken()).then(res => {
      if(res?.data) {
        dispatch({ type: types.GET_PROJECT_FINANCIAL_BY_ID, res });
      }
    });
  }
}


