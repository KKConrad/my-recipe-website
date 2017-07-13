$(document).ready(function() {
  console.log("document loaded")
  var form = $('#add-recipe');

  // Add recipe event handler
  form.submit(function(event) {
    event.preventDefault();
    var elements = this.elements;
    var ingredients = elements.ingredients.value;
    var directions = elements.directions.value;
    var recipeTitle = elements.recipeTitle.value;
    var recipeForm = {name: recipeTitle, ingredients: ingredients, directions: directions}

    if (localStorage.getItem('userRecipes') == null) {
      storedRecipes = [];
    } else {
      storedRecipes = JSON.parse(localStorage.getItem('userRecipes'));
    }
    storedRecipes.push(recipeForm);
    localStorage.setItem('userRecipes', JSON.stringify(storedRecipes));

    window.location.replace("/recipe-index.html");
  });
});

function getRecipes() {
  var userRecipes = JSON.parse(localStorage.getItem('userRecipes'));
  var templatePanel = $('.panel')
  var i = 1;
  userRecipes.forEach(function(recipe) {
    var recipePanel = templatePanel.clone();
    //Start with panel collapsed
    recipePanel.find('.panel-collapse').attr("id", i).addClass('collapse').removeClass("in");
    recipePanel.find('.collapse').removeClass('in');
    recipePanel.find('.recipe-title').text(recipe.name).attr('href', '#' + i);
    //Add recipe content to each panel
    recipePanel.find('.recipe-ingredients').html(recipe.ingredients);
    recipePanel.find('.recipe-directions').html(recipe.directions);
    $('#accordion').append(recipePanel);
    i++;
    console.log("Recipe panel " + recipePanel);
  });
  templatePanel.remove();
};
