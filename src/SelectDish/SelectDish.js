import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import SearchPanel from "../SearchPanel/SearchPanel";
import "./SelectDish.css";

class SelectDish extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="SelectDish">
          <Sidebar id="sidebarView" model={this.props.model}/>
          <div id="searchView">
            <SearchPanel/>
            <Dishes />
          </div>
      </div>
    );
  }
}

export default SelectDish;
