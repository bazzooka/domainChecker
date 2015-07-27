var testDomain = function(val){
	if(!val){
		return true;
	}

	var request = new XMLHttpRequest();
	request.open('GET', '/availability/'+val, true);
	document.getElementById('icon-check').classList.add('hidden');
	document.getElementById('spinner').classList.remove('hidden');

	request.onload = function() {
  		if (request.status >= 200 && request.status < 400) {
    		// Success!
    		var resp = request.responseText;
    		document.getElementById('icon-check').classList.remove('hidden');
    		document.getElementById('spinner').classList.add('hidden');
    		if(resp == "true"){
    			document.getElementById('icon-check').classList.remove("cancel");
    			document.getElementById('icon-check').classList.add("check");
    		} else {
    			document.getElementById('icon-check').classList.remove("check");
    			document.getElementById('icon-check').classList.add("cancel");
    		}
  		} else {
    		// We reached our target server, but it returned an error

  		}
	};

	request.onerror = function() {
  		// There was a connection error of some sort
	};

	request.send();
}

var preProcessValue = function(){
	var val = document.getElementById('input_domain').value;
	if(!val || val === ''){
		alert("Please enter a value."); 
	} else {
		testDomain(val);
	}
}

document.getElementById("btn_tester").addEventListener("click", function(){
	preProcessValue();
});

document.getElementsByTagName('form')[0].addEventListener("submit", function(e){
	preProcessValue();
	e.preventDefault();
});
