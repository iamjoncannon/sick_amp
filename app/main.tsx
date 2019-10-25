import React from 'react';
const Suspense = (React as any).Suspense;
const lazy = (React as any).lazy;
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux' 
import store from '../store/store'

const App = lazy(() => import("./components/app"))

ReactDOM.render(    
  <Provider store={store}>
    <Router>
      <Suspense fallback="Loading...">
          <App />
      </Suspense>
    </Router>
  </Provider>,
  document.getElementById("app") || document.createElement('app')
);
