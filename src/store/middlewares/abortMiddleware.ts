import { Middleware } from 'redux';
import { isAbortableRequest, abortRequest } from './abortHelpers';

const mapAbortableRequests = new Map();

const abortMiddleware: Middleware = () => (next) => (action) => {
  const abortableRequest = isAbortableRequest(action);
  if (abortableRequest) {
    const alreadyInMap = mapAbortableRequests.has(abortableRequest.key);
    if (alreadyInMap) {
      const previousController = mapAbortableRequests.get(abortableRequest.key);
      abortRequest(previousController);
    }
    mapAbortableRequests.set(abortableRequest.key, abortableRequest.controller);
  }
  const result = next(action);
  return result;
};

export default abortMiddleware;
