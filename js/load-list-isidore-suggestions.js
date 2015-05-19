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
  					limit: limit,
  					page: 1
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
  	
  	jQuery(".isidore-suggestions-list").on('click', '.isidore-suggestions-showmore', function(event){

  		var rootElement = event.delegateTarget;
  		var showmoreButton = event.currentTarget;
  		var showmorePage = jQuery(showmoreButton).attr("nextpage");
  		var query = jQuery(rootElement).attr("data-isidore-suggestions-query");
		var limit = jQuery(rootElement).attr("data-isidore-suggestions-limit");
  		
  		jQuery('ul', rootElement).empty();
  		jQuery('span.isidore-loader', rootElement).show();
  		
		if(query != '' && limit != '' && showmorePage!=''){
  			jQuery.ajax({
  				url: LoadListIsidoreSuggestions.url,
  				type : 'POST',
  				data: {
  					action: LoadListIsidoreSuggestions.action,
  					nonce: LoadListIsidoreSuggestions.nonce,
  					query: query,
  					limit: limit,
  					page: showmorePage
  				},
  				dataType: 'html',
  				success : function(li, statut){
  					jQuery('span.isidore-loader', rootElement).hide();
  					jQuery('ul', rootElement).append(li);
  				},
  				error : function(resultat, statut, erreur){
  					jQuery(rootElement).append(erreur);;
  				}
  			});
  		}
  		
  	});
  	
});