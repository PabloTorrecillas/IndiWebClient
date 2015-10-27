function parserDefTextVector(node){
    var deviceName = node.getAttribute("device");
    var propertyName = node.getAttribute("name");
    var groupName = node.getAttribute("group"); 

    var windowId = getWindowId(deviceName);    
    var antiguaVentana = getVentana(deviceName);

    var exist = document.getElementById(getPropertyId(deviceName,propertyName) + "_bombilla");

    if(exist){
        debug(exist);
        return;
    }

    var html = "";

    html += '<div class="deviceInfo">';
        html += '<div class="propertyBox">'+
        '<div>' + 
        getBombillita(node.getAttribute("state"), getPropertyId(deviceName,propertyName) + "_bombilla") + node.getAttribute("name") + '</div>';
         html += '</div>';

        //var nodes = node.childNodes;
        var nodes = node.getElementsByTagName('defText');

        if(nodes.length > 0){
            html += '<div class="elementBoxContainer">';
            for (var i=0; i < nodes.length; i++) {
                var elementName = nodes[i].getAttribute("name");
                html += 
                '<div class = "elementBox">' + nodes[i].getAttribute("label") + "-&gt;" + 
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
        debug(exist);
        return;
    }

    var html = "";
    
    html += '<div class="deviceInfo">';
        html += '<div class="propertyBox">'+
        '<div>' + 
        getBombillita(node.getAttribute("state"), getPropertyId(deviceName,propertyName) + "_bombilla") + node.getAttribute("name") + '</div>';
         html += '</div>';

        //var nodes = node.childNodes;
        var nodes = node.getElementsByTagName('defNumber');

        if(nodes.length > 0){
            html += '<div class = "elementBoxContainer">';
                for(var i = 0; i < nodes.length; i++){  
                    var elementName = nodes[i].getAttribute("name");
                    html += 
                    '<div class = "elementBox">' + nodes[i].getAttribute("label") + "-&gt;" + 
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
        debug(exist);
        return;
    }

    var html = "";

    html += '<div class="deviceInfo">';
        html += '<div class="propertyBox">'+
        '<div>' + 
        getBombillita(node.getAttribute("state"), getPropertyId(deviceName,propertyName) + "_bombilla") + node.getAttribute("name") + '</div>';
         html += '</div>';

       // var nodes = node.childNodes;
        var nodes = node.getElementsByTagName('defSwitch');

        if(nodes.length > 0){
            html += '<div class = "elementBoxContainer">';
                for(var i = 0; i < nodes.length; i++){  
               // debug(nodes[i]);
                    html += 
                    '<div class = "elementBox">'+ nodes[i].getAttribute("label") + 
                        getInputSwitch(node.getAttribute("rule"), nodes[i], node.getAttribute("perm"), node.getAttribute("name")) + 
                    '</div>';
                }

                if(node.getAttribute("rule") == 'AnyOfMany'){
                    html += '<button id="updateButton" class="btn btn-default">Actualizar</button>';
                }

            html += '</div>';
        }
    html += '</div>';

    addDeviceToTab(deviceName, groupName, html);
}

function parserDefBLOBVector(node){
    var deviceName = node.getAttribute("device");
    var propertyName = node.getAttribute("name"); 
    var groupName = node.getAttribute("group");        

    var windowId = getWindowId(deviceName);
    var antiguaVentana = getVentana(deviceName);

    var exist = document.getElementById(getPropertyId(deviceName,propertyName) + "_bombilla");

    if(exist){
        debug(exist);
        return;
    }

    var html = "";
    
    html += '<div class="deviceInfo">';
        html += '<div class="propertyBox">'+
        '<div>' + 
        getBombillita(node.getAttribute("state"), getPropertyId(deviceName,propertyName) + "_bombilla") + node.getAttribute("name") + '</div>';
         html += '</div>';

        //var nodes = node.childNodes;
        var nodes = node.getElementsByTagName('defBLOB');

        if(nodes.length > 0){
            html += '<div class = "elementBoxContainer">';
                for(var i = 0; i < nodes.length; i++){
                    var elementName = nodes[i].getAttribute("name");  
                    html += 
                    '<div class = "elementBox">'+ nodes[i].getAttribute("label")   + '-&gt; ' + 
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
        debug(exist);
        return;
    }

    var html = "";
    
    html += '<div class="deviceInfo">';
        html += '<div class="propertyBox">'+
        '<div>' + 
        getBombillita(node.getAttribute("state"), getPropertyId(deviceName,propertyName) + "_bombilla") + node.getAttribute("name") + '</div>';
         html += '</div>';

        //var nodes = node.childNodes;
        var nodes = node.getElementsByTagName('defLight');

        if(nodes.length > 0){
            html += '<div class = "elementBoxContainer">';
                for(var i = 0; i < nodes.length; i++){  
                    var elementName = nodes[i].getAttribute("name"); 
                    html += 
                    '<div class = "elementBox">'+ nodes[i].getAttribute("label")   + '-&gt; ' + 
                            getBombillita(nodes[i].innerHTML, getElementId(deviceName,propertyName,elementName) + "_bombilla") + 
                    '</div>';
                }

            html += '</div>';
        }
    html += '</div>';

    addDeviceToTab(deviceName, groupName, html);    
}