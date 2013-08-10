FORM CHECKER

example:
var submiting = document.getElementById("submit");

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
