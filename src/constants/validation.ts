
import * as Yup from "yup";

export const VALIDATION_PROJECT_CAPITAL = Yup.object().shape({ 
  projectType: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  description: Yup.string()
      .min(2, 'Too Short!')
      .max(200, 'Too Long!')
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
      .required('Required')
      .min(1)
      .integer(),
  requestFundingYear: Yup.string()
    .min(2, 'Too Short!')
    .max(4, 'Too Long!')
    .required('Required')
});
export const VALIDATION_SIGN_UP = Yup.object().shape({
  firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  email: Yup.string()
      .email()
      .required('Required'),
  organization: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  designation: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  recaptcha: Yup.string()
      .min(5)
      .required('Required')
});
export const VALIDATION_PROJECT_ACQUISITION = Yup.object().shape({
  projectType: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Required'),
  requestName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  localDollarsContributed: Yup.number()
    .required('Required')
    .min(1)
    .integer(),
  mhfdDollarRequest: Yup.number()
    .required('Required')
    .min(1)
    .integer()
});

export const VALIDATION_PROJECT_SPECIAL = Yup.object().shape({
  projectType: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Required'),
  requestName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});

export const VALIDATION_PROJECT_STUDY_MASTER = Yup.object().shape({
  projectType: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),  
  requestName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  sponsor: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  coSponsor: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  goal: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  requestedStartyear: Yup.number()
      .required('Required')
      .min(1)
      .integer()
});

export const VALIDATION_PROJECT_DEBRIS = Yup.object().shape({
  projectType: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),  
  projectSubtype: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  requestName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Required'),
  mhfdDollarRequest: Yup.number()
    .required('Required')
    .min(1)
    .integer(),
  publicAccess: Yup.boolean()
    .required('Required'),
  frecuency: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  maintenanceEligility: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});
export const VALIDATION_PROJECT_VEGETATION = Yup.object().shape({
  projectType: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),  
  projectSubtype: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  requestName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Required'),
  mhfdDollarRequest: Yup.number()
    .required('Required')
    .min(1)
    .integer(),
  publicAccess: Yup.boolean()
    .required('Required'),
  recurrence: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  frecuency: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  maintenanceEligility: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});
export const VALIDATION_PROJECT_SEDIMENT = Yup.object().shape({
  projectType: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),  
  projectSubtype: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  requestName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Required'),
  mhfdDollarRequest: Yup.number()
    .required('Required')
    .min(1)
    .integer(),
  publicAccess: Yup.boolean()
    .required('Required'),
  recurrence: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  frecuency: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  maintenanceEligility: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});
export const VALIDATION_PROJECT_MINOR_REPAIR = Yup.object().shape({
  projectType: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),  
  projectSubtype: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  requestName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Required'),
  mhfdDollarRequest: Yup.number()
    .required('Required')
    .min(1)
    .integer(),
  publicAccess: Yup.boolean()
    .required('Required'),
  maintenanceEligility: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});
export const VALIDATION_PROJECT_RESTORATION = Yup.object().shape({
  projectType: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),  
  projectSubtype: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  requestName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Required'),
  mhfdDollarRequest: Yup.number()
    .required('Required')
    .min(1)
    .integer(),
  publicAccess: Yup.boolean()
    .required('Required'),
  maintenanceEligility: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export const VALIDATION_PROJECT_MASTER_PLAN_ONLY = Yup.object().shape({
  projectType: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),  
  projectSubtype: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  requestName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  sponsor: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  coSponsor: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  requestedStartyear: Yup.string()
    .min(2, 'Too Short!')
    .max(5, 'Too Long!')
    .required('Required'),
  goal: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});

export const VALIDATION_PROJECT_FHAD = Yup.object().shape({
  projectType: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),  
  projectSubtype: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  requestName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  sponsor: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  coSponsor: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  requestedStartyear: Yup.string()
    .min(2, 'Too Short!')
    .max(5, 'Too Long!')
    .required('Required')
});

export const VALIDATION_USER = Yup.object().shape({
  _id: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),  
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email()
    .required('Required')
});

export const VALIDATION_USER_PROFILE = Yup.object().shape({
  _id: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),  
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),  
  email: Yup.string()
    .email()
    .required('Required'),
});
