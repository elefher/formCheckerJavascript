window.onload = function() {
    var form = {
        inputs: document.getElementsByTagName("input"),
        selects: document.getElementsByTagName("select"),
        forms: document.getElementsByTagName("form"),
        inputsLength: function() {
            return this.inputs.length;
        },
        selectLength: function() {
            return this.selects.length;
        },
        isEmpty: function(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        },
        ObjectLength: function(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key))
                    size++;
            }
            return size;
        },
        checkFields: function() {
            //put all fields of inputs,selects or something else in array
            var FormElements = [this.inputs, this.selects];
            //put length of fields forms in array
            var FormElementsLengths = [this.inputsLength(), this.selectLength()];
            var error = 0;

            //check whether required fields are empty
            var lengthElements = this.ObjectLength(FormElements);
            for (var y = 0; y < lengthElements; y++) {
                var length = FormElementsLengths[y];
                for (var i = 0; i < length; i++) {
                    if (FormElements[y][i].getAttribute("data-req") == "true") {
                        if (FormElements[y][i].value == "") {
                            var div = document.createElement("div");
                            div.className = "errorNote";
                            div.innerHTML = "You must fill this field!";
                            FormElements[y][i].parentNode.appendChild(div);
                            error++;
                        }
                    }
                }
            }
            return error;
        },
        submitForm: function(url, data, callback) {
            var xmlHttpReq = false;

            var self = this;
            // Mozilla/Safari
            if (window.XMLHttpRequest) {
                self.xmlHttpReq = new XMLHttpRequest();
            }
            // IE
            else if (window.ActiveXObject) {
                self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
            }

            self.xmlHttpReq.open("POST", url, true);
            self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            self.xmlHttpReq.setRequestHeader("Content-length", data.length);
            self.xmlHttpReq.setRequestHeader("Connection", "close");

            self.xmlHttpReq.send(data);
            var response;
            self.xmlHttpReq.onreadystatechange = function() {
                if (self.xmlHttpReq.readyState == 4 && self.xmlHttpReq.status == 200) {
                    if (typeof callback === 'function') {
                        callback(self.xmlHttpReq.responseText);
                    }
                }
            };
        },
        makePostData: function(data) {
            var stringData = "";
            var lengthData = this.ObjectLength(data);
            var lastKey = Object.keys(data)[Object.keys(data).length - 1];
            for (var key in data) {
                stringData += key + "=" + data[key];
                if (key != lastKey)
                    stringData += "&";
            }
            return stringData;
        },
        getFormValues: function() {
            var inputLength=this.forms[0].length;
            var values={};
            for(var i=0;i<inputLength;i++){
                if(this.forms[0][i].value!=""){
                    values[this.forms[0][i].name]=this.forms[0][i].value;
                }
            }
            return values;
        }
    };
    var submiting = document.getElementById("submit");
    submiting.addEventListener("click", function(e) {
        e.preventDefault();
        var emptyFields = form.checkFields();
        if (emptyFields == 0) {
            var data=form.getFormValues();
            data=form.makePostData(data);
            form.submitForm("getForm.php", data, function(response) {
                console.log(response);
            });
        }
    });
};