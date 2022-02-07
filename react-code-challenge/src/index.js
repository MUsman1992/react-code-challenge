import React from 'react';
// import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import jobsReducer from './reducers/appstate'
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";

// ReactDOM.render(<App />, document.getElementById('root'));

const store = createStore(jobsReducer);

render(
  <Provider store={store}>
     <BrowserRouter  >
        
        <App />
     </BrowserRouter>
   
  </Provider>,
  document.getElementById('root')
)


serviceWorker.unregister();
