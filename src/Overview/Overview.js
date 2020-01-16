import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Overview.css";
import modelInstance from "../data/DinnerModel";
//import DishDetails from "../DishDetails/DishDetails";
//import Sidebar from "../Sidebar/Sidebar";
import LowerHeader from "../LowerHeader/LowerHeader";
import Menu from "../Menu/Menu";

class Overview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			menu: modelInstance.getFullMenu(),
			totalPrice: modelInstance.getTotalMenuPrice(),
			numberOfGuests: modelInstance.getNumberOfGuests()
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

	update(model, changeDetails) {
		if (changeDetails.type === "guest-number-change") {
			this.setState({
				numberOfGuests: model.getNumberOfGuests(),
				totalPrice: modelInstance.getTotalMenuPrice()
			});
		}

		if (changeDetails.type === "new-dish" || changeDetails.type === "removed-dish") {
			this.setState({
				menu: modelInstance.getFullMenu(),
				totalPrice: modelInstance.getTotalMenuPrice()
			})
		}
	}


	render() {
		let menuContainer = null;
		if (this.state.menu.length === 0) {
			menuContainer =
				<div id="menuContainer">
					<div id="emptyMenu"><h3>Your menu is currently empty. Go back to the search page to add dishes.</h3></div>
				</div>
		}
		else {
			menuContainer =
				<div id="menuContainer">
					<div id="overview-menu">
						<Menu id="menu" menu={this.state.menu}/>
						<div id="total-price">
							<h3>Total:</h3>
							SEK {this.state.totalPrice}
						</div>
					</div>
					<Link to="/printout">
						<button id="printBtn" className="button">Print full recipe</button>
					</Link>
				</div>
		}
		return <div className="Overview">
			<LowerHeader id="lowerHeaderView"/>
			{menuContainer}
		</div>
	}
}

export default Overview;