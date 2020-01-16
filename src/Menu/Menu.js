import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import { Link } from "react-router-dom";
import "./Menu.css";
import "../Dishes/Dishes.css";

function MenuList(props){
  return <Link to={"/dish/"+props.dish.id} onClick={e=>props.model.setCurrentId(props.dish.id)}>
        <div key={props.dish.id} className="dishItems">
        <img src={props.dish.image} alt={props.dish.id} />
        <div>{props.dish.title}</div>
        <div>SEK {(props.dish.pricePerServing*props.model.getNumberOfGuests()).toFixed(2)}</div>
      </div>
      </Link>
}

class Menu extends Component{
  constructor(props) {
    super(props);
    this.state = {
      numberOfGuests: modelInstance.getNumberOfGuests(),
      menu:this.props.menu,
      change: false
    };
  }
  
  render() {
    console.log("render overview");
    return (
      <div className="Menu">
          {this.state.menu.map(dish=>(
            <MenuList key={dish.id} dish={dish} model={modelInstance}/>
          ))}
      </div>
    );
  }
}
export default Menu;