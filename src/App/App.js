import React from "react";
import "./App.css";
import Todos from "./components/Todos/Todos";

export default class App extends React.Component {
render(){ 
  return(
    <div className="App">
   <Todos/>
    </div>
  );
}
  }


