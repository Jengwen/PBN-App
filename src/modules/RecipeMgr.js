const remoteURL = "http://localhost:5001";

export default {
  //  get all of the recipe options back in an array
  getAllRecipes() {
    return fetch(`${remoteURL}/recipes`).then(result => result.json());
  },
  //   bring back a single recipe
  getOneRecipe(id) {
    return fetch(`${remoteURL}/recipes/${id}`).then(result => result.json());
  },
// get all recipes by a specific logged in user
getAllMyRecipes() {
  return fetch(`${remoteURL}/recipes/?userId=${sessionStorage.getItem('credentials')}`).then(result => result.json());
},

  // save a recipe to the json server
  post(newRecipe) {
    return fetch(`${remoteURL}/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newRecipe)
    }).then(data => data.json());
  },
  // method to post recipe-nutrients for a recipe
  postNutrients(nutrientRecipe) {
    return fetch(`${remoteURL}/recipe_nutrients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nutrientRecipe)
    }).then(data => data.json);
  },
  // soft delete a recipe from JSON
  softDelete(id) {
    return fetch(`${remoteURL}/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ archived: true })
    }).then(result => result.json());
  }
};
