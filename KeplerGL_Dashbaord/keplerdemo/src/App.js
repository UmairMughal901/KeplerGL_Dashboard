import React from 'react';
import keplerGlReducer from 'kepler.gl/reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { taskMiddleware } from 'react-palm/tasks';
import { Provider, useDispatch } from "react-redux";
import { KeplerGl } from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import useSwr from "swr";

const reducer = combineReducers({
  // <-- mount kepler.gl reducer in your app
  keplerGl: keplerGlReducer
});

// create store
const store = createStore(reducer, {}, applyMiddleware(taskMiddleware));


function App() {
  return (
    <Provider store={store}>
      <Map />
    </Provider>
  )
}

export default App


function Map(params) {
  // Create a variable
  const dispatch = useDispatch();
  //Add data by using hook

  // Declare one variable
  const { data } = useSwr('covid', async () => {
    // ek or variable declare karo jis main response karwao
    // Formate : fetch(input: RequestInfo, init?: RequestInit): Promise<Response>
    const response = await fetch(
      "https://gist.githubusercontent.com/leighhalliday/a994915d8050e90d413515e97babd3b3/raw/a3eaaadcc784168e3845a98931780bd60afb362f/covid19.json"
    );
    // ek or variable declare karo  jis main response ka data savve karwao
    const data = await response.json();
    // ab value return karrwao 
    return data;



  });


  // this is a way to check is data is comming in consol 
  // console.log(data);
  // Main yeh chahta hun k jo bhe {data} main Data 
  // change ho to yahan bhe data change to us k lye main useEffect function from redux se use karun ga 

  // React.useEffect(() => {
  //     if(data){
  //       dispatch(addDataToMap())
  //     }

  // }, [dispatch, data])


  return (
    //Here we will show map - Kepler GL will show map
    <KeplerGl id="covid" mapboxApiAccessToken='pk.eyJ1IjoidW1haXI5MDEiLCJhIjoiY2txdzR0NXA3MDQ3cDJybnhjdHBnandqeiJ9.zmKxFLnZtE1WZ9SHV-K6rQ'
      width={window.innerWidth} height={window.innerHeight} />

  )
}

