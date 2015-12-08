var ws;  
    /**
    * Desconectar el WebSocket
    *
    */   
    function disconnect() {
      if (ws != null) {
        console.log("Desconectando");
        ws.close();
        ws = null;
      }
    }
    
    /**
    * Conectar el WebSocket
    *
    */    
    function connect() {
        disconnect();
       
        ws = new Websock();
       
         ws.on('message', funcionLectura);
       
        ws.on('open', function(e) {
            console.log(">> WebSockets.onopen");
            ws.send_string("<getProperties version=\"1.7\"/>");
            console.log("<< WebSockets.onopen");
        });
       
        ws.on('close', function(e) {
            console.log(">> WebSockets.onclose");
            console.log("<< WebSockets.onclose");
        });
       
        ws.on('error', function(e) {
            console.log(">> WebSockets.onerror");
            console.log(e);
            console.log("<< WebSockets.onerror");
        });
       
        console.log("Conectando...");
        ws.open("ws://localhost:4000");
    }
        
    /**
    * Obtener el mensaje del servidor para parsear.
    *
    */    
    function funcionLectura() {
        var length = ws.rQlen();
        var cadena = ws.rQshiftStr(length);
      
        //Descomentar para ver lo que envía el servidor por la consola.
        //console.log("---" + cadena + "---");
        

        parserXML("<a>" + cadena + "</a>");
    }

    /**
    * Envio de mensajes de tipo Text al servidor.
    *
    * @param {var}  deviceName  Nombre del dispositivo desde el que se hace el envío.
    * @param {var}  propertyName  Nombre de la propiedad desde la que se hace el envío.
    */
    function writeText(deviceName, propertyName){
        var boxId = getPropertyId(deviceName,propertyName) + "_box";

        var box = document.getElementById(boxId);

        var children = box.childNodes; 
        var elementNames = new Array();
        var values = new Array();

        for(var i = 0; i < children.length; i++){
            var hijo = children[i];
            var elementName = hijo.getAttribute("data_elementname");

            elementNames[i] = elementName;

            var inputId = getElementId(deviceName,propertyName,elementName) + "_input";
            var input = document.getElementById(inputId);

            values[i] = input.value;
        }

        var cadena = '<newTextVector device="' + deviceName + '" name="' + propertyName + '">';

        for(var i = 0; i < elementNames.length; i++){
            cadena += '<oneText name="'+ elementNames[i] +'">'+ values[i] +'</oneText>';
        }

        cadena += '</newTextVector>';

        ws.send_string(cadena);
        ws.flush();
    }

    /**
    * Envio de mensajes de tipo Number al servidor.
    *
    * @param {var}  deviceName  Nombre del dispositivo desde el que se hace el envío.
    * @param {var}  propertyName  Nombre de la propiedad desde la que se hace el envío.
    */
    function writeNumber(deviceName, propertyName){
        var boxId = getPropertyId(deviceName,propertyName) + "_box";
       
        var box = document.getElementById(boxId);
        var children = box.childNodes; 
        var elementNames = new Array();
        var values = new Array();

        for(var i = 0; i < children.length; i++){
            var hijo = children[i];
            var elementName = hijo.getAttribute("data_elementname");

            elementNames[i] = elementName;

            var inputId = getElementId(deviceName,propertyName,elementName) + "_input";
            var input = document.getElementById(inputId);

            values[i] = input.value;
        }

        var cadena = '<newNumberVector device="' + deviceName + '" name="' + propertyName + '">';

        for(var i = 0; i < elementNames.length; i++){
            cadena += '<oneNumber name="'+ elementNames[i] +'">'+ values[i] +'</oneNumber>';
        }

        cadena += '</newNumberVector>';
        
        ws.send_string(cadena);
        ws.flush();
    }

    /**
    * Envio de mensajes de tipo Switch y a su vez de tipo Select al servidor. (Desplegables)
    *
    * @param {var}  deviceName  Nombre del dispositivo desde el que se hace el envío.
    * @param {var}  propertyName  Nombre de la propiedad desde la que se hace el envío.
    */
    function writeSwitchSelect(deviceName, propertyName){
        var selectId = getPropertyId(deviceName,propertyName) + "_select";

        var select = document.getElementById(selectId);
        var children = select.childNodes;

        var cadena = '<newSwitchVector device="' + deviceName + '" name="' + propertyName + '">';

        for(var i = 0; i < children.length; i++){
            if(children[i].innerHTML.trim().length > 0){
                var value = children[i].getAttribute("value");
                var switchValue = 'Off';
                if(value == select.value){
                    switchValue = 'On';
                }
                cadena += '<oneSwitch name="'+ value +'">'+ switchValue +'</oneSwitch>';
            }
        }

        cadena += '</newSwitchVector>';

        ws.send_string(cadena);
        ws.flush();
    }

    /**
    * Envio de mensajes de tipo Switch y a su vez de tipo Check al servidor. (Checkbox)
    *
    * @param {var}  deviceName  Nombre del dispositivo desde el que se hace el envío.
    * @param {var}  propertyName  Nombre de la propiedad desde la que se hace el envío.
    */
    function writeSwitchCheckboxes(deviceName, propertyName){
        var boxId = getPropertyId(deviceName,propertyName) + "_box";

        var box = document.getElementById(boxId);
        var children = box.childNodes;

        var cadena = '<newSwitchVector device="' + deviceName + '" name="' + propertyName + '">';

        for(var i = 0; i < children.length; i++){
            var data_elementname = children[i].getAttribute("data_elementname");

            if(data_elementname != null){
                var inputId = getPropertyId(deviceName,propertyName) + "_"+ data_elementname +"_value";
            
                var input = document.getElementById(inputId);
                var switchValue = 'Off';

                if(input.checked){
                    switchValue = 'On';
                }

                cadena += '<oneSwitch name="'+ data_elementname +'">'+ switchValue +'</oneSwitch>';
            }
        }

        cadena += '</newSwitchVector>';
        
        ws.send_string(cadena);
        ws.flush();
    }

        