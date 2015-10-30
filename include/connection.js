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