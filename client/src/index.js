import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import { AppProvider } from './state';

import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <AppProvider>
        <App />
      </AppProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
