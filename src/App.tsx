import React, {Suspense} from 'react';
import {renderRoutes} from "react-router-config";
import {BrowserRouter} from 'react-router-dom';

import {routes} from "./router/config";
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
          <Suspense fallback={<h2 style={{color:'#fff'}}>Загрузка...</h2>}>
              <BrowserRouter>
                {renderRoutes(routes)}
              </BrowserRouter>
          </Suspense>
      </div>
    </div>
  );
}

export default App;
