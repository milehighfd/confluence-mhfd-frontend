
import * as Yup from "yup";

export const VALIDATION_PROJECT_CAPITAL = Yup.object().shape({
    description: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    requestName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    mhfdFundingRequest: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    goal: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    localDollarsContributed: Yup.number()
      .required('Required'),
    requestFundingYear: Yup.number()
      .required('Required'),
  });