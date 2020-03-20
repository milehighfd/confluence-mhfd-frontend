
import * as Yup from "yup";

export const VALIDATION_PROJECT_CAPITAL = Yup.object().shape({ 
  projectType: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
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
      .required('Required')
      .min(0)
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
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  city: Yup.string()
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
      .required('Required')
});
export const VALIDATION_PROJECT_ACQUISITION = Yup.object().shape({
  projectType: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  requestName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  localDollarsContributed: Yup.number()
    .required('Required')
    .min(0)
    .integer(),
  mhfdDollarRequest: Yup.number()
    .required('Required')
    .min(0)
    .integer()
});

export const VALIDATION_PROJECT_SPECIAL = Yup.object().shape({
  projectType: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
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
      .min(2, 'Too Short!')
      .max(4, 'Too Long!')
      .required('Required')
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
    .max(50, 'Too Long!')
    .required('Required'),
  mhfdDollarRequest: Yup.number()
    .required('Required')
    .min(0)
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
    .max(50, 'Too Long!')
    .required('Required'),
  mhfdDollarRequest: Yup.number()
    .required('Required')
    .min(0)
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
    .max(50, 'Too Long!')
    .required('Required'),
  mhfdDollarRequest: Yup.number()
    .required('Required')
    .min(0)
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
    .max(50, 'Too Long!')
    .required('Required'),
  mhfdDollarRequest: Yup.number()
    .required('Required')
    .min(0)
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
    .max(50, 'Too Long!')
    .required('Required'),
  mhfdDollarRequest: Yup.number()
    .required('Required')
    .min(0)
    .integer(),
  publicAccess: Yup.boolean()
    .required('Required'),
  maintenanceEligility: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});
