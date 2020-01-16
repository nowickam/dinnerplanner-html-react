import React, { Component } from "react";
import { Route,Link } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import Details from "./Details/Details";
import Overview from "./Overview/Overview";
import Printout from "./Printout/Printout";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner",
    };
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/"><h1 className="App-title">{this.state.title}</h1></Link>
		</header>
          <Route exact path="/"
            render={() => <Welcome />}
          />
          <Route
            path="/search"
            render={() => <SelectDish model={modelInstance} />}
          />
          <Route
            path="/dish"
            render={() => <Details model={modelInstance}/>}
          />
          <Route
            path="/overview"
            render={() => <Overview model={modelInstance}/>}
          />
          <Route
            path="/printout"
            render={() => <Printout model={modelInstance}/>}
          />

      </div>
    );
  }
}

export default App;
