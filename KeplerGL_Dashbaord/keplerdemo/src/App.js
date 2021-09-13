import React from 'react';
import keplerGlReducer from 'kepler.gl/reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { taskMiddleware } from 'react-palm/tasks';
import { Provider } from "react-redux";
import  KeplerMap    from "./Components/KeplerMap";
import  Banner  from "./Components/Banner";

const reducer = combineReducers({
  // <-- mount kepler.gl reducer in your app
  keplerGl: keplerGlReducer
});

// create store
const store = createStore(reducer, {}, applyMiddleware(taskMiddleware));



function App() {
  return (
   
    <Provider store={store}>
      <Banner />
      <KeplerMap  />
     
    
    </Provider>
   
  )
}

export default App




