import React from 'react';
import ReactDOM from 'react-dom/client';
import DashboardLayout from './DashboarLayout';
import FinalPage1 from './Components/LogDash/Page1/FinalPage1';
import FinalPage2 from './Components/LogDash/Page2/FinalPage2';
import FinalPage3 from './Components/LogDash/Page3/FinalPage3';
import AiAssistance from './Components/AI/AiAssistance.js';
import ViewTransaction from './Components/ViewTransaction/ViewTransaction.js';
import { GlobalProvider } from './context/globalContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoutesFromElements, Route } from 'react-router-dom';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import './index.css';

const msalConfig = {
  auth: {
    clientId: '7d1ba265-cf81-4031-a405-257038e7ed8c', 
    authority: 'https://connectionet.b2clogin.com/connectionet.onmicrosoft.com/B2C_1_siso',
    redirectUri: 'http://localhost:3000', 
    knownAuthorities: ['connectionet.b2clogin.com'],
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

const pca = new PublicClientApplication(msalConfig);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element = {<DashboardLayout/>}>
      <Route path = '' element = {<FinalPage1/>}/>
      <Route path='/add-income' element = {<FinalPage2/>}/>
      <Route path = '/add-expense' element = {<FinalPage3/>}/>
      <Route path = '/view-transactions' element = {<ViewTransaction/>} />
      <Route path='/ai-assistance' element ={<AiAssistance/>}/>
      {/* <Route path = "/dashboard" element = {<App/>}></Route> */}
    </Route>
  )
)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MsalProvider instance = {pca}>
    <GlobalProvider>      
        <RouterProvider router={router}></RouterProvider>      
    </GlobalProvider>
    </MsalProvider>
  </React.StrictMode>
);

