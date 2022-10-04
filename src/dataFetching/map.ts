import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';

export const getComponentCounter = (id: number, type: string, setCountComponents: Function) => {
  datasets.postData(
    SERVER.COMPONENT_COUNTER,
    {
      value: id,
      column: type
    },
    datasets.getToken()
  ).then(components => {
    setCountComponents(components);
  });
};
