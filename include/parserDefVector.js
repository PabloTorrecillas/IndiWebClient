function parserDefTextVector(node){
    var deviceName = node.getAttribute("device");
    var propertyName = node.getAttribute("name");
    var groupName = node.getAttribute("group"); 

    var windowId = getWindowId(deviceName);    
    var antiguaVentana = getVentana(deviceName);

    var exist = document.getElementById(getPropertyId(deviceName,propertyName) + "_bombilla");

    if(exist){
        return;
    }

    var html = "";

    html += '<div class="deviceInfo">';
        html += '<div class="propertyBox">'+
        '<div>' + 
        getBombillita(node.getAttribute("state"), getPropertyId(deviceName,propertyName) + "_bombilla") + node.getAttribute("name") + '</div>';
         html += '</div>';

        var nodes = node.getElementsByTagName('defText');

        if(nodes.length > 0){
            html += '<div class="elementBoxContainer">';
            for (var i=0; i < nodes.length; i++) {
                var elementName = nodes[i].getAttribute("name");
                html += 
                '<div class = "elementBox">' + nodes[i].getAttribute("label") + ":" + 
                    '<div id="' + getElementId(deviceName,propertyName,elementName) + "_value" + '">' + 
                        nodes[i].innerHTML + 
                    '</div>' +
                    getInputText(node.getAttribute("perm")) + 
                '</div>';                   
            }

           html += '</div>';

       }

        if(node.getAttribute("perm") != 'ro'){
            html +=  '<button id="updateButton" class="btn btn-default" style="float:right">Actualizar</button>';
        }

    html += '</div>';

    addDeviceToTab(deviceName, groupName, html);           
}

function parserDefNumberVector(node){
    var deviceName = node.getAttribute("device");
    var propertyName = node.getAttribute("name"); 
    var groupName = node.getAttribute("group");        

    var windowId = getWindowId(deviceName);
    var antiguaVentana = getVentana(deviceName);

    var exist = document.getElementById(getPropertyId(deviceName,propertyName) + "_bombilla");

    if(exist){
        return;
    }

    var html = "";
    
    html += '<div class="deviceInfo">';
        html += '<div class="propertyBox">'+
        '<div>' + 
        getBombillita(node.getAttribute("state"), getPropertyId(deviceName,propertyName) + "_bombilla") + node.getAttribute("name") + '</div>';
         html += '</div>';

        var nodes = node.getElementsByTagName('defNumber');

        if(nodes.length > 0){
            html += '<div class = "elementBoxContainer">';
                for(var i = 0; i < nodes.length; i++){  
                    var elementName = nodes[i].getAttribute("name");
                    html += 
                    '<div class = "elementBox">' + nodes[i].getAttribute("label") + ":" + 
                        '<div id="' + getElementId(deviceName,propertyName,elementName) + "_value" + '">' + 
                        nodes[i].innerHTML + 
                    '</div>' +
                        getInputNumber(node.getAttribute("perm"), nodes[i]) + 
                    '</div>';  
                }

            html += '</div>';

            if(node.getAttribute("perm") != 'ro'){
                html +=  '<button id="updateButton" class="btn btn-default" style="float:right">Actualizar</button>';
            }
        }
    html += '</div>';

    addDeviceToTab(deviceName, groupName, html);
    
}

function parserDefSwitchVector(node){
    var deviceName = node.getAttribute("device");
    var propertyName = node.getAttribute("name"); 
    var groupName = node.getAttribute("group");        

    var windowId = getWindowId(deviceName);
    var antiguaVentana = getVentana(deviceName);

    var exist = document.getElementById(getPropertyId(deviceName,propertyName) + "_bombilla");

    if(exist){
        return;
    }

    var html = "";

    html += '<div class="deviceInfo">';
        html += '<div class="propertyBox">'+
        '<div>' + 
        getBombillita(node.getAttribute("state"), getPropertyId(deviceName,propertyName) + "_bombilla") + node.getAttribute("name") + '</div>';
         html += '</div>';

        var nodes = node.getElementsByTagName('defSwitch');

        html += '<div id="' + getPropertyId(deviceName,propertyName) + "_value" + '">'+ 


                 '</div>';


        if(nodes.length > 0 && node.getAttribute("perm") != 'ro'){
            html += '<div class = "elementBoxContainer">';

                if(node.getAttribute("rule") == 'OneOfMany'){      
                    html += '<select>';        
                        for(var i = 0; i < nodes.length; i++){  
                            var elementName = nodes[i].getAttribute("name");
                            html += 
                            '<div class = "elementBox" id="' + getElementId(deviceName,propertyName,elementName) + "_value" + '">' + 
                                getInputSwitch(node.getAttribute("rule"), nodes[i], deviceName, propertyName, elementName) + 
                            '</div>';
                        }
                    html += '</select>';
                }

                if(node.getAttribute("rule") == 'AtMostOne'){
                    html += '<select>' +
                             '<option> </option>';
                
                    for(var i = 0; i < nodes.length; i++){ 
                        var elementName = nodes[i].getAttribute("name"); 
                        html += 
                        '<div class = "elementBox" id="' + getElementId(deviceName,propertyName,elementName) + "_value" + '">' +
                            getInputSwitch(node.getAttribute("rule"), nodes[i], deviceName, propertyName, elementName) + 
                        '</div>';
                    }

                    html += '</select>';
                }                

                if(node.getAttribute("rule") == 'AnyOfMany'){
                    html += '<div class = "elementBoxContainer">';
                        for(var i = 0; i < nodes.length; i++){  
                            var elementName = nodes[i].getAttribute("name");
                            html += 
                            '<div class = "elementBox">' + 
                                getInputSwitch(node.getAttribute("rule"), nodes[i], deviceName, propertyName, elementName) + 
                            '</div>';
                        }
                        html += '<button id="updateButton" class="btn btn-default">Actualizar</button>';

                    html += '</div>';
                }

            html += '</div>';
        }
    html += '</div>';

    addDeviceToTab(deviceName, groupName, html);

    var propertyValue = document.getElementById(getPropertyId(deviceName,propertyName) + "_value");

                 for(var i = 0; i < nodes.length; i++){
                    if(nodes[i].innerHTML.trim() == 'On'){
                        propertyValue.innerHTML += ' ' + nodes[i].getAttribute("label");
                    }
                 }
}

function parserDefBLOBVector(node){
    var deviceName = node.getAttribute("device");
    var propertyName = node.getAttribute("name"); 
    var groupName = node.getAttribute("group");        

    var windowId = getWindowId(deviceName);
    var antiguaVentana = getVentana(deviceName);

    var exist = document.getElementById(getPropertyId(deviceName,propertyName) + "_bombilla");

    if(exist){
        return;
    }

    var html = "";
    
    html += '<div class="deviceInfo">';
        html += '<div class="propertyBox">'+
        '<div>' + 
        getBombillita(node.getAttribute("state"), getPropertyId(deviceName,propertyName) + "_bombilla") + node.getAttribute("name") + '</div>';
         html += '</div>';

        var nodes = node.getElementsByTagName('defBLOB');

        if(nodes.length > 0){
            html += '<div class = "elementBoxContainer">';
                for(var i = 0; i < nodes.length; i++){
                    var elementName = nodes[i].getAttribute("name");  
                    html += 
                    '<div class = "elementBox">'+ nodes[i].getAttribute("label")   + ': ' + 
                        '<div id="' + getElementId(deviceName,propertyName,elementName) + '_value' + '">' + 
                            '<div id="' + getElementId(deviceName,propertyName,elementName) + '_value_Size' + '">' + 'Size: ' + '</div>' +
                            '<div id="' + getElementId(deviceName,propertyName,elementName) + '_value_Format' + '">' + 'Format: ' + '</div>' +
                        '</div>' + 
                    '</div>';
                }

            html += '</div>';

            if(node.getAttribute("perm") != 'ro'){
                html +=  '<button id="updateButton" class="btn btn-default" style="float:right">Actualizar</button>';
            }
        }
    html += '</div>';

    addDeviceToTab(deviceName, groupName, html);
}

function parserDefLightVector(node){
    var deviceName = node.getAttribute("device");
    var propertyName = node.getAttribute("name"); 
    var groupName = node.getAttribute("group");        

    var windowId = getWindowId(deviceName);
    var antiguaVentana = getVentana(deviceName);

    var exist = document.getElementById(getPropertyId(deviceName,propertyName) + "_bombilla");

    if(exist){
        return;
    }

    var html = "";
    
    html += '<div class="deviceInfo">';
        html += '<div class="propertyBox">'+
        '<div>' + 
        getBombillita(node.getAttribute("state"), getPropertyId(deviceName,propertyName) + "_bombilla") + node.getAttribute("name") + '</div>';
        html += '</div>';

        var nodes = node.getElementsByTagName('defLight');

        if(nodes.length > 0){
            html += '<div class = "elementBoxContainer">';
                for(var i = 0; i < nodes.length; i++){  
                    var elementName = nodes[i].getAttribute("name"); 
                    html += 
                    '<div class = "elementBox">'+ nodes[i].getAttribute("label")   + ': ' + 
                            getBombillita(nodes[i].innerHTML, getElementId(deviceName,propertyName,elementName) + "_bombilla") + 
                    '</div>';
                }

            html += '</div>';
        }
    html += '</div>';

    addDeviceToTab(deviceName, groupName, html);    
}