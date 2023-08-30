import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import * as serviceWorker from './serviceWorker';
import { history } from "./store/configureStore";
import getStore from './store';
import '@mdi/font/scss/materialdesignicons.scss';
import 'antd/dist/antd.min.css';
import './index.scss';
import App from './App';
import { NotificationsProvider } from 'Components/Shared/Notifications/NotificationsProvider';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';

const init = async () => {
  let yearConfiguration;
  try {
    yearConfiguration = await datasets.getData(SERVER.GET_CONFIGURATIONS('BOARD_YEAR'))
  } catch (error) {
    console.error(error);
  }

  ReactDOM.render(
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_CAPTCHA}>
      <Provider store={getStore({
        year: +yearConfiguration.value
      })}>
        <ConnectedRouter history={history}>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </ConnectedRouter>
      </Provider>
    </GoogleReCaptchaProvider>,
    document.getElementById('root')
  );
}
init();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
