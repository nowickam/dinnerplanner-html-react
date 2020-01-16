import React, { Component } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import modelInstance from "../data/DinnerModel";

function DishesList(props){
  return <Link to={"/dish/"+props.dish.id} onClick={e=>props.model.setCurrentId(props.dish.id)}>
        <div key={props.dish.id} className="item">
        <div className="itemName">{props.dish.title}</div>
        <div className="itemPrice">{(props.dish.pricePerServing*props.model.getNumberOfGuests()).toFixed(2)}</div>
      </div>
      </Link>
}

class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu:modelInstance.getFullMenu(),
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this);
    if(localStorage!==undefined && localStorage.getItem("guests-number")!==modelInstance.getNumberOfGuests())
      {console.log("change people");
      this.props.model.setNumberOfGuests(localStorage.getItem("guests-number"));}

    if(localStorage!==undefined && localStorage.getItem("menu")!==null && localStorage.getItem("refresh")==="true"){
      let dishes=localStorage.getItem('menu').split(",");
      for(const d of dishes){
        modelInstance.getDish(d)
        .then(result=>modelInstance.addDishToMenu(result))
        .catch(console.error);
     }
     localStorage.setItem("refresh","false");
    }
  }


  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update(model,changeDetails) {
    if(changeDetails.type==="guest-number-change")
    {this.setState({
      numberOfGuests: model.getNumberOfGuests()
    });}

    if(changeDetails.type==="new-dish" || changeDetails.type==="removed-dish"){
      this.setState({
        menu: modelInstance.getFullMenu()
      })
    }
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    localStorage.setItem("guests-number",e.target.value);
    this.props.model.setNumberOfGuests(e.target.value);
  };


  render() {
    return (
      <div className="Sidebar">
        <h3>My Dinner</h3>
        <p id="guestsChanger">
          People:
          <input
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.onNumberOfGuestsChanged}
          />
          <br />
          {/* Total number of guests: {this.state.numberOfGuests} */}
        </p>
        <div id="searchIndex">
          <div>Dish name</div>
          <div>Cost</div>
        </div>
        <div id="menuContainer">
          {this.state.menu.map(dish=>(
            <DishesList key={dish.id} dish={dish} model={modelInstance}/>
          ))}
          <p id="totalCost">{"SEK "+modelInstance.getTotalMenuPrice()} </p>
          <Link to="/overview">
            <button id="confirmBtn" className="button">Confirm Dinner</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Sidebar;
