import React from 'react';
import MainLayoutController from "./components/Header/MainLayoutController";

function App(props) {
  return (
    <div>
      <MainLayoutController />
        { props.children }
    </div>
  );
}

export default App;
