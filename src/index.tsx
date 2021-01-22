import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createContext} from "react";
import * as stores from './stores';

// Подключение сторов
export const StoreContext = createContext<typeof stores>({} as typeof stores);

ReactDOM.render(
  <React.StrictMode>
      <StoreContext.Provider value={{...stores}}>
          <App />
      </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
