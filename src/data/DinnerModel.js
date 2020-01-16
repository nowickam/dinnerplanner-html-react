import ObservableModel from "./ObservableModel";
import {BASE_URL,httpOptions} from "./apiConfig";

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 4;
    this.getNumberOfGuests();
    this.type="";
    this.query="";
    this.menu=[];
    this.currentId="1";
  }

  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  getType(){
    return this.type;
  }

  getQuery(){
    return this.query;
  }

  getFullMenu() {
    return this.menu;
  }

  getCurrentId(){
    return this.currentId;
  }

  setCurrentId(id){
    this.currentId=id;
    this.notifyObservers({type:"id-change"});
  }

  setNumberOfGuests(num) {
    if(num<1)num=1;
    this._numberOfGuests = num;
    this.notifyObservers({type:"guest-number-change"});
  }

  setNewSearch(type,query){
    this.type=type;
    this.query=query;
    this.notifyObservers({type:"search-change", searchType:type, searchQuery: query});
  }

  menuContains(id) {
	  let x = false;
	  this.menu.map(dish=>{
		  if(dish.id===id){
			  x= true;
		  }
	  });
	  return x;
  }

  addDishToMenu(dish){
    this.menu.push(dish);
    this.notifyObservers({type:"new-dish", index:this.menu.length-1});
  }

  removeDishFromMenu(id) {
    let dishIndex=-1;
    this.menu=this.menu.filter(dish=>{
      if(dish.id!==id)
        return true;
      else{
        dishIndex=this.menu.indexOf(dish);
        return false;
      }
    });
    if(dishIndex!==-1) this.notifyObservers({type:"removed-dish", index: dishIndex, dishId: id});
  }

  getTotalMenuPrice() {
    return this.menu.reduce((acc,x)=>acc+x.pricePerServing*this.getNumberOfGuests(),0).toFixed(2);
  }

  // API methods

  getAllDishes(type,query) {
    const url = `${BASE_URL}/recipes/search?type=${type}&query=${query}`;
    return fetch(url, httpOptions).then(this.processResponse);
  }

  getDish(id){
    const url=`${BASE_URL}/recipes/${id}/information`;
    return fetch(url,httpOptions).then(this.processResponse);
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
