function initializeSearch() {
    var recipes = $('.panel');
    var search = $('#search-bar');
    var cache = [];

    recipes.each(function() {
      cache.push({
        element: this,
        text: $(this).find('.recipe-title').text().toLowerCase()
      })
    });

    function filter() {
      var query = this.value.trim().toLowerCase();
      cache.forEach(function(recipe) {
        var index = 0;
        if (query) {
          index = recipe.text.indexOf(query);
        }
        recipe.element.style.display = index === -1 ? 'none' : '';
      });
    }

    if ('oninput' in search[0]) {
      search.on('input', filter);
    } else {
      search.on('keyup', filter);
    }
};
