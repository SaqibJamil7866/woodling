 
export const ValidationHelper = {
   LoginValidation    
}; 
function LoginValidation(email,password) { 
  	var validation = false;

  	if(email != '' && password != ''){
  		validation = true;
  	}

  	return validation;
}
function registerValidation(email,password) { 
  	var validation = false;

  	if(email != '' && password != ''){
  		validation = true;
  	}

  	return validation;
}
 