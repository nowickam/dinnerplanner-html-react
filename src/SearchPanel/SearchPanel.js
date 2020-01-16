import React, { Component } from "react";
import modelInstance from "../data/DinnerModel"
import "./SearchPanel.css";

let foodTypes = ["All", "Breakfast", "Lunch", "Main Course", "Dinner","Dessert"];

class SearchPanel extends Component {
    constructor(props){
        super(props);
        this.state={
            //store the type and query until we click search
            type: "",
            query: ""
        }
    }

    handleEnter(e){
        if(e.key==="Enter"){
            e.preventDefault();
            modelInstance.setNewSearch(this.state.type, this.state.query);
        }
    }

    render(){ 
        return (<div id="dishSearchPanel">
        <h3>FIND A DISH</h3>
        <input id="textSearch" type="text" placeholder="Enter key words" onKeyDown={e=>this.handleEnter(e)} onChange={e => this.setState({query: e.target.value})}/>
        <select id="dropSearch" onKeyDown={e=>this.handleEnter(e)} onChange={e => this.setState({type: e.target.value})}>
            {foodTypes.map((type)=>
            <option key={type}>{type}</option>)}
        </select>
        <button className="button" onClick={(e) => modelInstance.setNewSearch(this.state.type, this.state.query)}>search</button>
    </div>)
     }
}

export default SearchPanel;
