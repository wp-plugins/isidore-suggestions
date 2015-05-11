jQuery.widget( "custom.catcomplete", jQuery.ui.autocomplete, {
    _create: function() {
      this._super();
      this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
    },
    _renderMenu: function( ul, items ) {
      var that = this,
        currentCategory = "";
      jQuery.each( items, function( index, item ) {
        var li;
        if ( item.category != currentCategory ) {
          ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
          currentCategory = item.category;
        }
        li = that._renderItemData( ul, item );
        if ( item.category ) {
          li.attr( "aria-label", item.category + " : " + item.label );
        }
      });
    }
  });

  jQuery(function() {
    var data = function(request, response){
			// ajout des variables action et nonce
			request.action = IsidoreSuggestionsAutocomplete.action;
			request.nonce = IsidoreSuggestionsAutocomplete.nonce;
			jQuery.ajax({
				url : IsidoreSuggestionsAutocomplete.url,
				type : 'POST',
				data : request,
				dataType : 'json',
				success : response
			});
			};
 
    jQuery( 'input[id^="isidore-search-input-"]' ).catcomplete({
    	delay: 400,
    	source: data,
    	minLength: 3,
		select: function (event, ui) {
			//lors de la selection d'une proposition
			window.open(ui.item.link, '_blank');
		}
    }).each(function(){
		//pour chaque instance, on ajoute une class isidore-suggestion-search (cf. css)
		jQuery(this).catcomplete("widget").addClass("isidore-suggestions-search");
	});
  });
  
  // on n'affiche pas l'autosuggestion lorsqu'on redimensionne la page (evite bug d'affichage)
	jQuery(window).resize(function() {
    	jQuery(".ui-autocomplete").css('display', 'none');
	});