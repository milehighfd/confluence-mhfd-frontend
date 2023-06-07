import * as datasets from "../../../Config/datasets";
import { SERVER } from '../../../Config/Server.config';

const makeCall = (url: string, data: any, cbSucess: Function, cbFall: Function) => {
  datasets.postData(url, data)
  .then(() => {
    cbSucess();
  }).catch((err) => {
    console.log(err);
    cbFall();
  });
};

export const onGenerateSignupLink = (email: string, cbSucess: Function, cbFall: Function) => {
  makeCall(SERVER.GENERATE_SIGNUP_URL, { email }, cbSucess, cbFall);
}

export const onGenerateResetAndConfirm = (email: string, cbSucess: Function, cbFall: Function) => {
  makeCall(SERVER.GET_RESET_AND_CONFIRM, { email }, cbSucess, cbFall);
};