import React, { Component } from "react";
import "./LowerHeader.css";
import { Link } from "react-router-dom";
import modelInstance from "../data/DinnerModel";

class LowerHeader extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: modelInstance.getNumberOfGuests()
    };
  }

  componentDidMount() {
		modelInstance.addObserver(this);

		if (localStorage !== undefined && localStorage.getItem("guests-number") !== modelInstance.getNumberOfGuests()) {
			modelInstance.setNumberOfGuests(localStorage.getItem("guests-number"));
    }
  }

  update(model,changeDetails) {
    if(changeDetails.type==="guest-number-change")
    {this.setState({
      numberOfGuests: model.getNumberOfGuests()
    });}
  }


  render() {
    return (
      <div className="LowerHeader">
        <h2>Number of people: {this.state.numberOfGuests}</h2>
          <Link to="/search">
            <button id="backBtn" className="button">Go back and edit dinner</button>
          </Link>
      </div>
    );
  }
}

export default LowerHeader;
