(function() {
    tinymce.create('tinymce.plugins.IsidoreSuggestions', {
        init : function(ed, url) {
            ed.addButton('addIsidoreSpan', {
                title : 'Span isidore',
                cmd : 'addIsidoreSpan',
                image : url + '/isidore-suggestions.png'
            });
            
            ed.addCommand('addIsidoreSpan', function() {
                
                var selected_text = ed.selection.getContent();
                var starting_element = ed.selection.getStart();
                var ending_element = ed.selection.getEnd();
                
                //si le contenu textuel de la selection n'est pas nulle
               if(selected_text != ''){
               		//si la selection commence en dehors d'une span isidore et se fini dans une span isidore
               		if(starting_element.getAttribute("class") != 'isidore' && ending_element.getAttribute("class") == 'isidore'){
               			
               			//recuperation de la position de depart
               			var selRng = ed.selection.getRng();
               			var startOffset = selRng.startOffset;
               			var startContainer = selRng.startContainer;
               			
               			//recuperation de la position de fin
               			ed.selection.select(ending_element);
               			var selRng = ed.selection.getRng();
               			var endOffset = selRng.endOffset;
               			var endContainer = selRng.endContainer;
               			
               			//suppression des anciennes balises span
                		ed.dom.remove(ending_element, true);
               			
               			//creation d'un nouvel interval
               			var range = document.createRange();
               			range.setStart(startContainer, startOffset);
               			range.setEnd(endContainer, endOffset);
               			
               			//selection du nouvel interval
               			ed.selection.setRng(range);
               			
               			//ajout des nouvelles balises span
               			selected_text = ed.selection.getContent();
               			return_text = ' <span class="isidore">' + selected_text + '</span>';
                		ed.execCommand('mceInsertContent', 0, return_text); //on insere de balise span
               			
						//ancien comportement (simple suppression des balises)
               			//ed.dom.remove(ending_element, true); //supprime les balises span dans l'editeur
               		}
               		//si la selection commence dans d'une span isidore et se fini en dehors une span isidore
               		else if(starting_element.getAttribute("class") == 'isidore' && ending_element.getAttribute("class") != 'isidore'){
               			
               			//recuperation de la position de fin
               			var selRng = ed.selection.getRng();
               			var endOffset = selRng.endOffset;
               			var endContainer = selRng.endContainer;
               			
               			//recuperation de la position de depart
               			ed.selection.select(starting_element);
               			var selRng = ed.selection.getRng();
               			var startOffset = selRng.startOffset;
               			var startContainer = selRng.startContainer;
               			
               			//suppression des anciennes balises span
                		ed.dom.remove(starting_element, true);
               			
               			//creation d'un nouvel interval
               			var range = document.createRange();
               			range.setStart(startContainer, startOffset);
               			range.setEnd(endContainer, endOffset);
               			
               			//selection du nouvel interval
               			ed.selection.setRng(range);
               			
               			//ajout des nouvelles balises span
               			selected_text = ed.selection.getContent();
               			return_text = ' <span class="isidore">' + selected_text + '</span>';
                		ed.execCommand('mceInsertContent', 0, return_text); //on insere de balise span
               		
               			//ancien comportement
               			//ed.dom.remove(starting_element, true); //supprime les balises span dans l'editeur
               		}
               		//si la selection commence et se termine dans une span isidore
               		else if(starting_element.getAttribute("class") == 'isidore' && ending_element.getAttribute("class") == 'isidore'){
               			//on ne fait rien !
               		}
               		//si la selection contient une span isidore
               		else if(selected_text.match(/<span class="isidore">/)){
               			//on ne fait rien !
               		}
               		else{
                		return_text = ' <span class="isidore">' + selected_text + '</span>';
                		ed.execCommand('mceInsertContent', 0, return_text); //on insere de balise span
                	}
                }else{
                	/*si on se trouve dans une span isidore*/
                	if(starting_element.nodeName == 'SPAN' && starting_element.getAttribute("class") == 'isidore' ){
                		ed.dom.remove(ed.selection.getNode(), true); //supprime les balises span dans l'editeur
                	}
                	else{
                		var selRng = ed.selection.getRng();
    					selRng.expand("word"); //expands the DOM range to the current word
    					ed.selection.setRng(selRng);
    					selected_text = ed.selection.getContent();
    					return_text = ' <span class="isidore">' + selected_text + '</span>';
                		ed.execCommand('mceInsertContent', 0, return_text);
                	}
                }
            });         
        },
       
       createControl : function(n, cm) {
            return null;
        },
        
        getInfo : function() {
            return {
                longname : 'Isidore Suggestions Button',
                author : 'HUMA-NUM',
                authorurl : 'http://www.huma-num.fr',
                infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/example',
                version : "0.1"
            };
        }
       
    });
    // Register plugin
    tinymce.PluginManager.add( 'isidoreSuggestions', tinymce.plugins.IsidoreSuggestions );
})();