import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { NotificationsProvider } from 'Components/Shared/Notifications/NotificationsProvider';
import getStore from 'store';
import App from 'App';
import { history } from 'store/configureStore';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';

const Application = () => {  
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getBoardYear = async () => {
      try {
        const response = await datasets.getData(SERVER.GET_CONFIGURATIONS('BOARD_YEAR'));
        console.log('response', response);
      } catch (err) {
        console.log('err', err);
        setError(err);
      }
    }
    getBoardYear();
  }, []);

  if (error) {
    throw error;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_CAPTCHA}>
      <Provider store={getStore({})}>
        <ConnectedRouter history={history}>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </ConnectedRouter>
      </Provider>
    </GoogleReCaptchaProvider>
  );
};

export default Application;