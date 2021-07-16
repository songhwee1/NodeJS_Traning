import React from 'react';

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
          
          {/*추가*/}
          { element }

          <Greeting name={"송휘"}/>
          <Greeting name={"휘휘"}/>
          <Greeting name={"하휘~"}/>

          
        </p>
      </header>
    </div>
  );
}

export default App;