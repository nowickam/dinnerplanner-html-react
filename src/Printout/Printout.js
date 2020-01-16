import React, { Component } from "react";
import "./Printout.css";
//import DishDetails from "../DishDetails/DishDetails";
import LowerHeader from "../LowerHeader/LowerHeader";
import PrintoutMenu from "../PrintoutMenu/PrintoutMenu";
import modelInstance from "../data/DinnerModel.js";

class Printout extends Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            numberOfGuests: modelInstance.getNumberOfGuests(),
            menu: modelInstance.getFullMenu()
        }
    }

    componentDidMount() {
        modelInstance.addObserver(this);

        if (localStorage !== undefined && localStorage.getItem("guests-number") !== modelInstance.getNumberOfGuests()) {
			modelInstance.setNumberOfGuests(localStorage.getItem("guests-number"));
		}

		if (localStorage !== undefined && localStorage.getItem("menu") !== null && localStorage.getItem("refresh") === "true") {
			console.log("change dishes");
			let dishes = localStorage.getItem('menu').split(",");
			for (const d of dishes) {
				modelInstance.getDish(d)
					.then(result => modelInstance.addDishToMenu(result))
					.catch(console.error);
			}
			localStorage.setItem("refresh", "false");
      }
    }
    
      componentWillUnmount() {
        modelInstance.removeObserver(this);
      }
    
      update(model,changeDetails) {
        if(changeDetails.type==="guest-number-change")
        {this.setState({
          numberOfGuests: model.getNumberOfGuests()
        });}
    
        if(changeDetails.type==="new-dish" || changeDetails.type==="removed-dish"){
          console.log(modelInstance.getFullMenu());
          this.setState({
            menu: modelInstance.getFullMenu()
          })
        }
      }

    render(){
        return <div className="Printout">
        	<LowerHeader id="lowerHeaderView" />
        	<PrintoutMenu id="printoutMenu" menu={this.state.menu} />
        </div>
    }
}

export default Printout;