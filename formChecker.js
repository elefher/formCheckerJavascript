window.onload = function() {
    var form = {
        inputs: document.getElementsByTagName("input"),
        selects: document.getElementsByTagName("select"),
        forms: document.getElementsByTagName("form"),
        classNameErrorInput: null, //user can set class name for error(inputs)
        classNameErrorRadio: null, //user can set class name for error(Radio button)
        inputsLength: function() {
            return this.inputs.length;
        },
        selectLength: function() {
            return this.selects.length;
        },
        isEmpty: function(obj) {//check if an object is empty
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        },
        ObjectLength: function(obj) {// return length of any object
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
            var inputErrorClassName = this.classNameErrorInput == null ? "errorNote" : this.classNameErrorInput;
            var radioBoxes = {}, radioCount = 0;//var for radio inputs

            var error = 0;

            //check whether required fields are empty
            var lengthElements = this.ObjectLength(FormElements);
            for (var y = 0; y < lengthElements; y++) {
                var length = FormElementsLengths[y];
                for (var i = 0; i < length; i++) {
                    if (FormElements[y][i].getAttribute("data-req") == "true" && FormElements[y][i].type != "radio") {
                        //check if required input elements have values
                        //otherwise display an error msg
                        if (FormElements[y][i].value == "") {
                            if (FormElements[y][i].parentNode.lastChild.className != inputErrorClassName) {
                                this.createDiv(FormElements[y][i].parentNode, "div", inputErrorClassName, "You must fill this field!");
                            }
                            error++;
                        } else {
                            if (FormElements[y][i].parentNode.lastChild.className == inputErrorClassName) {
                                var errorChild = FormElements[y][i].parentNode.lastChild;
                                errorChild.parentNode.removeChild(errorChild);
                            }
                        }
                    } else if (FormElements[y][i].getAttribute("data-req") == "true" && FormElements[y][i].type == "radio") {
                        //put data of all required radios in objects
                        //get all same name of radio buttons and check if any of all are checked
                        if (!radioBoxes.hasOwnProperty(FormElements[y][i].name)) {
                            radioBoxes[FormElements[y][i].name] = FormElements[y][i].checked;
                        } else if (radioBoxes[FormElements[y][i].name] == false) {
                            radioBoxes[FormElements[y][i].name] = FormElements[y][i].checked;
                        }
                        radioCount++;
                    }
                }
            }
            //entrain if exists radio button which is required
            if (radioCount != 0) {
                var className = this.classNameErrorRadio == null ? "errorNote" : this.classNameErrorRadio;//get class name of user or default
                for (var key in radioBoxes) {
                    var node = document.getElementsByName(key)[0].parentNode;//get parent of element which is unchecked
                    var nodeLastChild = node.lastChild;//get last child
                    if (radioBoxes[key] == false) {
                        //create error msg if doesn't exist
                        if (nodeLastChild.className != className) {
                            this.createDiv(node, "div", className, "You must choose a checkbox!");//create error msg
                        }
                    } else {
                        //if exists child with error class
                        if (nodeLastChild.className == className) {
                            nodeLastChild.parentNode.removeChild(nodeLastChild);//remove error class
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
            var inputLength = this.forms[0].length;
            var values = {};
            for (var i = 0; i < inputLength; i++) {
                if (this.forms[0][i].value != "") {
                    values[this.forms[0][i].name] = this.forms[0][i].value;
                }
            }
            return values;
        },
        createDiv: function(that, element, className, note) {
            var div = document.createElement(element);
            div.className = className;
            div.innerHTML = note;
            that.appendChild(div);
        },
        realTimeAutoCorrect: function(node) {
            var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                    emailRegExp = new RegExp(emailPattern);
            if (node.type == "email") {
                emailNode = emailRegExp.test(node.value);

                var nodeLength = node.parentNode.childNodes.length;
                var nodeChild = node.parentNode.lastChild;
                if (nodeChild.className == "true" || nodeChild.className == "false") {
                    nodeChild.parentNode.removeChild(nodeChild);
                }

                if (emailNode) {
                    this.createDiv(node.parentNode, "div", "true", "");
                } else {
                    this.createDiv(node.parentNode, "div", "false", "");
                }
            }
        }
    };

    var submiting = document.getElementById("submit");
    //settings
    form.classNameErrorInput = "inputError";
    form.classNameErrorRadio = "radioError";
    //end settings
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
};