import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'


/* 
const clientID = import.meta.env.VITE_APP_AUTH0_DOMAIN;
const domainKey = import.meta.env.VITE_APP_AUTH0_CLIENT_ID; */

createRoot(document.getElementById('root')).render(
  <Auth0Provider 
    domain={"dev-ac8slf4xd68xnlk8.us.auth0.com"} 
    clientId={"1BUXKQuaSQMNwCCKtQ6soRVMfU2UJ71d"} 
    authorizationParams={{
    redirect_uri: window.location.origin
    }} 
  >
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Auth0Provider>
)
