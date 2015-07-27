var testDomain = function(val){
	if(!val){
		return true;
	}

	var request = new XMLHttpRequest();
	request.open('GET', '/availability/'+val, true);

	request.onload = function() {
  		if (request.status >= 200 && request.status < 400) {
    		// Success!
    		var resp = request.responseText;
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

document.getElementById("btn_tester").addEventListener("click", function(){
	var val = document.getElementById('input_domain').value;
	if(!val || val === ''){
		alert("Please enter a value.");
	} else {
		testDomain(val);
	}
	testDomain()
})