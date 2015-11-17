var ws;  
            
        function disconnect() {
          if (ws != null) {
            console.log("Desconectando");
            ws.close();
            ws = null;
          }
        }
            
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
            
        function funcionLectura() {
            var length = ws.rQlen();
            var cadena = ws.rQshiftStr(length);
          
            //console.log("---" + cadena + "---");
            
            

            parserXML("<a>" + cadena + "</a>");
        }

        function funcionEscritura(deviceName, propertyName){
            debug(deviceName);
            debug(propertyName);

            var boxId = getPropertyId(deviceName,propertyName) + "_box";

            var box = document.getElementById(boxId);

            var children = box.childNodes; 
            var elementNames = new Array();
            var values = new Array();

            for(var i = 0; i < children.length; i++){
                var hijo = children[i];
                var elementName = hijo.getAttribute("data_elementname");

                debug(elementName);

                elementNames[i] = elementName;

                var inputId = getElementId(deviceName,propertyName,elementName) + "_input";
                var input = document.getElementById(inputId);

                values[i] = input.value;

                debug(values[i]);
            }

            var cadena = '<newTextVector device="' + deviceName + '" name="' + propertyName + '">';

            for(var i = 0; i < elementNames.length; i++){
                cadena += '<oneText name="'+ elementNames[i] +'">'+ values[i] +'</oneText>';
            }

            cadena += '</newTextVector>';

            ws.send_string(cadena);
            ws.flush();
        }

        function writeNumber(deviceName, propertyName, elementNames, values){
            debug(deviceName);
            debug(propertyName);
            var cadena = '<newNumberVector device="' + deviceName + '" name="' + propertyName + '">';

            for(var i = 0; i < elementNames.length; i++){
                cadena += '<oneNumber name="'+ elementNames[i] +'">'+ values[i] +'</oneNumber>';
            }

            cadena += '</newNumberVector>';
            
            ws.send_string(cadena);
            ws.flush();
        }


        /*
            PAra cada uno de los dispositivos (ventanas), crear el botón de enableBLOB y enviar en el ON el Also y en el off el Never

            <enableBLOB device="NOMBREDELDISPOSITIVO">Also/Never</enableBLOB>
        */
        