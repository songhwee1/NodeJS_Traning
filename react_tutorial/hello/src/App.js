import React from 'react';
import {Clock} from './components/Clock';
import {Toggle} from './components/Toggle';
//추가
const element = <div>This is JSX</div>;

function Greeting(props) {
  return (
      <div>
        <h1>Hello~~ { props.name }</h1>
      </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello React!

          { element }

          <Greeting name={"송휘"}/>
          <Greeting name={"휘휘"}/>
          <Greeting name={"하휘~"}/>
          <h1>
            <Clock/>
          </h1>
          <Toggle/>
          
      
        </p>
      </header>
    </div>
  );
}

export default App;