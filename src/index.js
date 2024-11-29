import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'effector-react';
import { scope } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider value={scope}>        {/* таким образом у Арр есть доступ к scope */}
    <App />
  </Provider>
);
