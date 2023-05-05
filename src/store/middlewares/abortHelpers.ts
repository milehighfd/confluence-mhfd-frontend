import { Action } from 'redux';

export interface AbortableAction extends Action {
  payload: {
    abortableRequest?: any;
    signal?: AbortSignal;
  };
}

export const isAbortableRequest = (action: any): any => {
  const { payload } = action;
  if (payload && payload.abortableController && payload.abortableKey) {
    return {
      controller: payload.abortableController,
      key: payload.abortableKey
    };
  }
  return null;
};

export const abortRequest = (controller: AbortController) => {
  try {
    controller.abort();
  } catch (e) {
    console.log(e);
  }
};
