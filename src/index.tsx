import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import '@mdi/font/scss/materialdesignicons.scss';
import 'antd/dist/antd.min.css';
import './index.scss';
import ErrorBoundary from 'Components/MainPage/ErrorBoundary';
import Application from 'Components/MainPage/Application';

const init = async () => {
  ReactDOM.render(
    <ErrorBoundary fallback={
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
        <img
          style={{ height: "80%" }}
          src="Error_Message.jpg"
          alt="Error"
        />
      </div>
    }>
      <Application />
    </ErrorBoundary>,
    document.getElementById('root')
  );
}
init();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
