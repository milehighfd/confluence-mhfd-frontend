import * as datasets from "../../../Config/datasets";
import { SERVER } from '../../../Config/Server.config';

export const onGenerateSignupLink = (email: string, cbSucess: Function, cbFall: Function) => {
  console.log('onGenerateSignupLink');
  datasets.postData(SERVER.GENERATE_SIGNUP_URL, { email })
  .then((res) => {
    console.log(res);
    cbSucess();
  }).catch((err) => {
    console.log(err);
    cbFall();
  });
}