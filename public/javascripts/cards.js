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

	},
	//function to sort the existing cards by location
	sortByLocation : function(){

	},
	//function to sort the existing cards by followers
	sortByFollowers : function(){

	},
	deleteCard : function(){

	},
	createHbObjectForHandlebar : function(userData){
		var hbObject = {
				'name' : userData.name,
				'location' : userData.location,
				'followers' : userData.followers,
				'imgSrc' : userData.avatar_url
			};
		return hbObject;
	}
};

function addGitHubIdAsCard(event){
	debugger;
	var elem = event.currentTarget,
		inputBoxId = $(elem).data('id'),
		inputBox = $(inputBoxId),
		inputBoxValue = $(inputBox).val(),
		userData = {},
		self = this;
	//send ajax request to fetch user data
	$.ajax({
        cache : false,
        url : 'https://api.github.com/users/' + inputBoxValue,
        type : 'GET',
        crossDomain: true,
        contentType : 'application/json',
        timeout : 20000,
        success : function(resp){
        	debugger;
        	userData = resp;
        	Observables.addCard(userData);
        }.bind(this),
        error : function(){
        	//code for handling error cases
        }
    });
}


Observables.addSubscriber('add', function(hbObject){
	debugger;
	var cardTemplate = Handlebars.templates['card'],
		htmlString = cardTemplate(hbObject);
	$('#user-cards').append(htmlString);
});	



function createHandlebarData(){

}

function sortCardsByName(){

}

function sortCardsByLocation(){

}

function sortCardsByFollowers(){

}


function deleteCards(){

}

$('#github-login-button').on('click', this.addGitHubIdAsCard);