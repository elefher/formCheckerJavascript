FORM CHECKER

example:
    
    var submiting = document.getElementById("submit");
    //settings
    form.classNameErrorInput = "inputError";
    form.classNameErrorRadio = "radioError";
    //end settings

    //checking password
    var getAllForm = form.inputs;//get all inputs of form
    var pass = getAllForm.pass;//get input with name pass
    var passCon = getAllForm.con_pass;//get input with name con_pass
    
    form.classNameErrorPass="pass-error";//optional attribute
    
    //set text to display
    //if you want the default text then leave blank the values
    setDisplayTrue="good!";
    setDisplayFalse="wrong!";
    //end optional display
    
    passCon.addEventListener("keyup", function() {
        form.inputsMatch(this, pass,{"true":setDisplayTrue,"false":setDisplayFalse});
        
        //example with blank values for default output echo
        //  form.inputsMatch(this, pass,{"true":"","false":""});
    });
    //end check password

    form.forms[0].addEventListener("keyup", function(e) {
        //get real node
        //get this input
        var target = e.target;
        form.realTimeAutoCorrect(target);
    });
    submiting.addEventListener("click", function(e) {
        e.preventDefault();
        var emptyFields = form.checkFields();
        if (emptyFields == 0) {
            var data = form.getFormValues();
            data = form.makePostData(data);
            form.submitForm("getForm.php", data, function(response) {
                console.log(response);
            });
        }
    });