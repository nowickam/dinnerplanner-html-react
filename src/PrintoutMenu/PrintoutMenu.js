import React, { Component } from "react";
import modelInstance from "../data/DinnerModel";
import { Link } from "react-router-dom";
//import "./Menu.css";
import "../DishDetails/DishDetails.css";

function PrintoutMenuList(props) {
  return <div id="dishDetails">
    <div key={props.dish.id}>
      <h2>{props.dish.title}</h2>
      <div id="topPrintout"><div id="dishDetails" >
      <img id="descrImg" src={props.dish.image} alt={props.dish.id} />
      <p id="descrText">{"Type: " + props.dish.dishTypes + "\nDiets: " + props.dish.diets + "\nPreparation time(min): " + props.dish.readyInMinutes +
        "\nPrice per serving: " + props.dish.pricePerServing + "\nHealth score: " + props.dish.healthScore}</p></div>
        <div id="tableContainer"><h3>INGREDIENTS FOR {modelInstance.getNumberOfGuests()} PEOPLE</h3>
      <table ><tbody>{props.dish.extendedIngredients.map(ing => (
        <tr key={props.dish.id + ing.id}>
          <td> {(ing.measures.metric.amount * (modelInstance.getNumberOfGuests() / props.dish.servings)).toFixed(1)
            + " " + ing.measures.metric.unitShort}</td>
          <td>{ing.name}</td>
        </tr>
      ))}</tbody></table></div></div>
      <div id="preparation">
        {props.dish.instructions && <div><h2>PREPARATION</h2>
          <p>{props.dish.instructions}</p></div>}
      </div>
    </div>
  </div>
}

class PrintoutMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfGuests: modelInstance.getNumberOfGuests(),
      menu: this.props.menu
    };
  }

  render() {

    return (
      <div className="PrintoutMenu">
        {this.state.menu.map(dish => (
          <PrintoutMenuList key={dish.id} dish={dish} model={modelInstance} />
        ))}
      </div>
    );
  }
}
export default PrintoutMenu;