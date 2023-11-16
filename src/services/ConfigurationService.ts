import * as datasets from '../Config/datasets';
import { SERVER } from '../Config/Server.config';

class ConfigurationService {

  getConfiguration(key: string) {
    return datasets.getData(SERVER.GET_CONFIGURATIONS(key))
  }

  updateConfiguration(key: string, value: string) {
    return datasets.putData(SERVER.GET_CONFIGURATIONS(key), {
      value
    });
  }

  getAllConfigurationsYears() {
    return datasets.postData(SERVER.GET_ALL_CONFIGURATIONS,{},datasets.getToken())
  }

}

export default new ConfigurationService();
