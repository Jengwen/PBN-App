//import the components we will need
import React, { Component } from "react";
import RecipeMgr from "../../modules/RecipeMgr";
import { Button } from "react-bootstrap";
import Microlink from "@microlink/react";

class RecipeCard extends Component {

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <h3>
            Title:{" "}
            <span className="card-recipe">{this.props.recipeProp.title}</span>
          </h3>
          <Microlink url={this.props.recipeProp.url} size="normal"/>
          {/* add delete button */}
          <Button
            variant="light"
            type="submit"
            size="lg"
            onClick={()=>{this.props.deleteRecipe(this.props.recipeProp.id)}}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  }
}
export default RecipeCard;
