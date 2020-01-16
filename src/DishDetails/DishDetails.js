import React, { Component } from "react";
import modelInstance from "../data/DinnerModel"
import { Link } from "react-router-dom";
import "./DishDetails.css";

class DishDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING",
      currentId: modelInstance.getCurrentId(),
      change: false
    }
  }

  componentDidMount() {
    modelInstance.addObserver(this);

    modelInstance
      .getDish(this.state.currentId)
      .then(dish => {
        this.setState({
          status: "LOADED",
          dish: dish,
          inMenu: modelInstance.menuContains(this.state.currentId)
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  componentDidUpdate() {
    if (this.state.change === true) {
      modelInstance
        .getDish(this.state.currentId)
        .then(dish => {
          this.setState({
            status: "LOADED",
            dish: dish,
            inMenu: modelInstance.menuContains(this.state.currentId),
            change: false
          });
        })
        .catch(() => {
          this.setState({
            status: "ERROR"
          });
        });
    }
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this);
  }

  update(model, changeDetails) {
    if (changeDetails.type === "guest-number-change") {
      this.setState({
        guestsNumber: model.getNumberOfGuests()
      })
    }
    if (changeDetails.type === "new-dish" || changeDetails.type === "removed-dish") {
      this.setState({
        inMenu: modelInstance.menuContains(this.state.currentId)
      })
    }
    if (changeDetails.type === "id-change") {
      this.setState({
        change: true,
        currentId: modelInstance.getCurrentId(),
        status: "LOADING"
      })
    }
  }

  handleAdd(e) {
    modelInstance.addDishToMenu(this.state.dish);
    let currentMenu = "";
    if (localStorage !== undefined) currentMenu = localStorage.getItem('menu');
    if (currentMenu !== null && currentMenu != "") currentMenu += "," + modelInstance.getCurrentId();
    else currentMenu = modelInstance.getCurrentId();
    localStorage.menu = currentMenu;
  }

  handleRemove(e) {
    modelInstance.removeDishFromMenu(this.state.dish.id);
    let oldMenu = "";
    if(localStorage!==undefined)oldMenu=localStorage.getItem('menu');
    let oldMenuArr = oldMenu.split(",");
    let newMenuArr = oldMenuArr.filter(d => d !== modelInstance.getCurrentId().toString());
    localStorage.menu = newMenuArr.toString();
  }

  render() {
    let dishDetails = null;
    let tableContent = null;
    let prep = null;
    let totalCost = null;
    let tableContainer = null;
    let addClass = null;
    let removeClass = null;

    switch (this.state.status) {
      case "LOADING":
        dishDetails = <em>Loading...</em>;
        break;
      case "LOADED":
        dishDetails =
          <div id="dishDetails">
            <h2>{this.state.dish.title}</h2>
            <img id="descrImg" src={this.state.dish.image} alt={this.state.dish.id} />
            <p id="descrText">{"Type: " + this.state.dish.dishTypes + "\nDiets: " + this.state.dish.diets + "\nPreparation time(min): " + this.state.dish.readyInMinutes +
              "\nPrice per serving: " + this.state.dish.pricePerServing + "\nHealth score: " + this.state.dish.healthScore}</p>
          </div>;
        prep =
          <div id="preparation">
            {this.state.dish.instructions && <div><h2>PREPARATION</h2>
              <p>{this.state.dish.instructions}</p></div>}
            <Link to="/search"><button className="button">back to search</button></Link>
          </div>;

        tableContent = <tbody>{this.state.dish.extendedIngredients.map(ing => (
          <tr key={this.state.dish.id + ing.id}>
            <td> {(ing.measures.metric.amount * (modelInstance.getNumberOfGuests() / this.state.dish.servings)).toFixed(1)
              + " " + ing.measures.metric.unitShort}</td>
            <td>{ing.name}</td>
          </tr>
        ))}</tbody>;

        if (this.state.inMenu === true) { addClass = "inactiveButton"; removeClass = "button"; }
        else { addClass = "button"; removeClass = "inactiveButton"; }

        tableContainer = <div id="tableContainer">
          <h3>INGREDIENTS FOR {modelInstance.getNumberOfGuests()} PEOPLE</h3>
          <table id="table">{tableContent}</table>
          <div id="lastLine">
            <button className={addClass} id="addBtn" onClick={e => (this.handleAdd(e))}>Add to menu</button>
            <button className={removeClass} id="removeBtn" onClick={e => this.handleRemove(e)}>Remove from menu</button>
            <p id="totalCost">{totalCost}</p>
          </div>
        </div>

        totalCost = "SEK " + (this.state.dish.pricePerServing * modelInstance.getNumberOfGuests()).toFixed(2);
        break;
    }

    return <div id="details">
      <div id="detailsTop">
        {dishDetails}
        {tableContainer}
      </div>
      {prep}
    </div>
  }
}

export default DishDetails;