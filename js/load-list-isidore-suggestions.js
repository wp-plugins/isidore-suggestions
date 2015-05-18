jQuery(document).ready(function(){
	
	jQuery(".isidore-suggestions-list").each(function( index ) {
		
		var element = this;
		var query = jQuery(element).attr("data-isidore-suggestions-query");
		var limit = jQuery(element).attr("data-isidore-suggestions-limit");
		
		if(query != '' && limit != ''){
  			jQuery.ajax({
  				url: LoadListIsidoreSuggestions.url,
  				type : 'POST',
  				data: {
  					action: LoadListIsidoreSuggestions.action,
  					nonce: LoadListIsidoreSuggestions.nonce,
  					query: query,
  					limit: limit
  				},
  				dataType: 'html',
  				success : function(li, statut){
  					jQuery('span.isidore-loader', element).hide();
  					jQuery('ul', element).append(li);
  				},
  				error : function(resultat, statut, erreur){
  					jQuery(element).append(erreur);;
  				}
  			});
  		}
  	});
});