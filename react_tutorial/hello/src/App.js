import React from 'react';

//추가
const element = <div>This is JSX</div>;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello React!
          
          {/*추가*/}
          { element }
          
        </p>
      </header>
    </div>
  );
}

export default App;