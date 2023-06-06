import * as datasets from "../../../Config/datasets";
import { SERVER } from '../../../Config/Server.config';

export const onGenerateSignupLink = (email: string, cbSucess: Function, cbFall: Function) => {
  datasets.postData(SERVER.GENERATE_SIGNUP_URL, { email })
  .then(() => {
    cbSucess();
  }).catch((err) => {
    console.log(err);
    cbFall();
  });
}