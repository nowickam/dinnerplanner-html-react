import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import { Link } from "react-router-dom";
import "./Dishes.css";

function DishItem(props){
  return <Link to={"/dish/"+props.dish.id} onClick={e=>{props.model.setCurrentId(props.dish.id);localStorage.setItem("current-id",props.dish.id)}}>
    <li className="dishItems">
      <div>
        <img src={props.baseUri + props.dish.imageUrls} alt={props.dish.id} />
        <div>{props.dish.title}</div>
      </div>
    </li>
  </Link>
}

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADING",
      type: "",
      query: "",
      change: false
    };
  }


  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.addObserver(this);
    modelInstance
      .getAllDishes(this.state.type,this.state.query)
      .then(dishes => {
        this.setState({
          status: "LOADED",
          dishes: dishes.results,
          dishesResponse: dishes
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  componentDidUpdate(){
    if(this.state.change=== true){
      modelInstance
      .getAllDishes(this.state.type,this.state.query)
      .then(dishes => {
        this.setState({
          status: "LOADED",
          dishes: dishes.results,
          dishesResponse: dishes,
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

  update(model,changeDetails){
    if(changeDetails.type==="search-change"){
      this.setState({
        change: true,
        type: model.getType(),
        query: model.getQuery(),
        status: "LOADING",
        dishes: undefined,
        dishesResponse: undefined
      });
    }
  }

  render() {
    let dishesList = null;

    switch (this.state.status) {
      case "LOADING":
        dishesList = <em>Loading...</em>;
        break;
      case "LOADED":
        dishesList = this.state.dishes.map(dish => (
            <DishItem key={dish.id} dish={dish} baseUri={this.state.dishesResponse.baseUri} model={modelInstance}/>
        ));
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Dishes">
        <ul id="dishList">{dishesList}</ul>
      </div>
    );
  }
}

export default Dishes;
