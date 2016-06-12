var Observables = {
	cards  : [],
	topics : {},
	//code to add cards to the private card array
	addCard : function(userData){
		var subscribers = this.topics.add,
			hbObject = {},
			i;
		
		//push the user data to array of cards
		this.cards.push(userData);

		//create hb object for the newly pushed user data
		hbObject = this.createHbObjectForHandlebar(userData);
		//for the add topic notify all the watchers
		for(i=0; i<subscribers.length; i++){
			subscribers[i](hbObject);
		}
	},
	//code to add subscribers based on topic
	addSubscriber : function(topic, subscriber){
		if(this.topics[topic]){
			this.topics[topic].push(subscriber);
		}else{
			this.topics[topic] = [];
			this.topics[topic].push(subscriber);
		}
	},

	//function to sort the existing cards by name 
	sortByName : function(){
		var subscribers = this.topics.sort,
			hbObjectsArr = [],
			i,
			hbObject={};

		this.cards.sort(function(obj1, obj2){
			return obj1.name>obj2.name ? 1 : -1;
		});

		for(i=0; i<this.cards.length; i++){
			hbObject = this.createHbObjectForHandlebar(this.cards[i]);
			hbObjectsArr.push(hbObject);
		}

		//for the add topic notify all the watchers
		for(i=0; i<subscribers.length; i++){
			subscribers[i](hbObjectsArr);
		}
	},
	//function to sort the existing cards by location
	sortByLocation : function(){
		var subscribers = this.topics.sort,
			hbObjectsArr = [],
			i,
			hbObject={};

		this.cards.sort(function(obj1, obj2){
			return obj1.location>obj2.location ? 1 : -1;
		});

		for(i=0; i<this.cards.length; i++){
			hbObject = this.createHbObjectForHandlebar(this.cards[i]);
			hbObjectsArr.push(hbObject);
		}

		//for the add topic notify all the watchers
		for(i=0; i<subscribers.length; i++){
			subscribers[i](hbObjectsArr);
		}
	},

	//function to sort the existing cards by followers
	sortByFollowers : function(){
		var subscribers = this.topics.sort,
			hbObjectsArr = [],
			i,
			hbObject={};

		this.cards.sort(function(obj1, obj2){
			return obj1.followers>obj2.followers ? 1 : -1;
		});

		for(i=0; i<this.cards.length; i++){
			hbObject = this.createHbObjectForHandlebar(this.cards[i]);
			hbObjectsArr.push(hbObject);
		}

		//for the add topic notify all the watchers
		for(i=0; i<subscribers.length; i++){
			subscribers[i](hbObjectsArr);
		}
	},
	deleteCard : function(event){
		var elem = event.currentTarget,
			loginId = $(elem).data('id'),
			subscribers = this.topics.delete,
			index = null,
			i;
		
		this.cards.forEach(function(userData, pos){
			if(loginId === userData.login){
				index = pos;
			}
		});

		if(index !== null){
			this.cards.splice(index, 1);
			//for the add topic notify all the watchers
			for(i=0; i<subscribers.length; i++){
				subscribers[i](loginId);
			}
		}

	},

	createHbObjectForHandlebar : function(userData){
		var hbObject = {
				'name' : userData.name,
				'location' : userData.location,
				'followers' : userData.followers,
				'imgSrc' : userData.avatar_url,
				'login' : userData.login,
				'href' : userData.url
			};
		return hbObject;
	},

	_checkIfUserIsAlreadyNotPresent : function(loginId){
		return this.cards.some(function(userData){
			return loginId===userData.login;	
		});
	}
};

function addGitHubIdAsCard(event){
	var elem = event.currentTarget,
		inputBoxId = $(elem).data('id'),
		inputBox = $(inputBoxId),
		inputBoxValue = $(inputBox).val(),
		userData = {},
		self = this;
	if(Observables._checkIfUserIsAlreadyNotPresent(inputBoxValue)){
		$('#duplicate-id').css('display', 'block');
		return;
	}
	//set the display of loading to block to indicate the user
	//data is being fetched
	$('#loading').css('display', 'block');
	//send ajax request to fetch user data
	$.ajax({
        cache : false,
        url : 'https://api.github.com/users/' + inputBoxValue,
        type : 'GET',
        crossDomain: true,
        contentType : 'application/json',
        timeout : 20000,
        success : function(resp){
        	userData = resp;
        	Observables.addCard(userData);
        	$('#loading').css('display', 'none');
        	//on success clear the login button
        	$('#github-login').val('');
        }.bind(this),
        error : function(){
        	$('#loading').css('display', 'none');
        	//on error also clear the login button
        	$('#github-login').val('');
        	//display a generic error method if error occurs
        	$('#geenric-error').css('display', 'block');
        }
    });
}


Observables.addSubscriber('add', function(hbObject){
	var cardTemplate = Handlebars.templates['card'],
		htmlString = cardTemplate(hbObject);
	$('#user-cards').append(htmlString);
});	

Observables.addSubscriber('delete', function(loginId){
	$('#user-'+loginId).remove();
});

Observables.addSubscriber('sort', function(hbObjectsArr){
	debugger;
	var cardTemplate = Handlebars.templates['card'],
		htmlString="";
	hbObjectsArr.forEach(function(obj){
		htmlString+=cardTemplate(obj);
	});
	//adding html string to user cards element
	$('#user-cards').html(htmlString);
});	





$('#github-login').on('focus', function(){
	//code to remove error as soon as user starts typing in input box
	$('#geenric-error').css('display', 'none');
	$('#duplicate-id').css('display', 'none');
});

//bind function for sorting functionality
$('body').delegate('#sort-by-name', 'click', Observables.sortByName.bind(Observables));
$('body').delegate('#sort-by-followers', 'click', Observables.sortByFollowers.bind(Observables));
$('body').delegate('#sort-by-location', 'click', Observables.sortByLocation.bind(Observables));

//on click of close icon delete the card
$('body').delegate('.close-icon', 'click', Observables.deleteCard.bind(Observables));
//on click of button functionality
$('#github-login-button').on('click', this.addGitHubIdAsCard);