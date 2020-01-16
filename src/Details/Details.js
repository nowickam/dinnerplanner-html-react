import React, { Component } from "react";
import "./Details.css";
import DishDetails from "../DishDetails/DishDetails";
import Sidebar from "../Sidebar/Sidebar";

class Details extends Component{
    constructor(props){
        super(props);
        this.state={
            id:""
        }
    }

    render(){
        return <div className="Details">
            <Sidebar id="sidebarView" model={this.props.model} />
            <DishDetails />
        </div>
    }
}

export default Details;