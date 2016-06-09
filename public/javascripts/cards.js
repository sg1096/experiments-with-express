window.onload = function(){
	var cardData = [];

	function addGitHubIdAsCard(event){
		
		var elem = event.currentTarget,
			inputBoxId = $(elem).data('id'),
			inputBox = $(inputBoxId),
			inputBoxValue = $(inputBox).val(),
			userData = {};
		//send ajax request to fetch user data
		$.ajax({
            cache : false,
            url : 'https://api.github.com/users/' + inputBoxValue,
            type : 'GET',
            crossDomain: true,
            contentType : 'application/json',
            data : 'json',
            timeout : 20000,
            success : function(resp){
            	userData = resp;
            	cardData.push(userData);
            },
            error : function(){
            	//code for handling error cases
            }
        });
	}



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

	$('#github-login-button').on('click', addGitHubIdAsCard);

};