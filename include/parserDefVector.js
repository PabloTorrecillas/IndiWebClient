function parserDefTextVector(node){
    var deviceName = node.getAttribute("device").trim();
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
            var boxId = getPropertyId(deviceName,propertyName) + "_box";

            html += '<div class="elementBoxContainer" id="' +  boxId +'">';
            for (var i=0; i < nodes.length; i++) {
                var elementName = nodes[i].getAttribute("name");
                html += 
                '<div class = "elementBox" data_elementname = "'+ elementName +'">' + nodes[i].getAttribute("label") + ":" + 
                    '<div id="' + getElementId(deviceName,propertyName,elementName) + "_value" + '">' + 
                        nodes[i].innerHTML + 
                    '</div>' +
                    getInputText(getElementId(deviceName,propertyName,elementName) + "_input", node.getAttribute("perm")) + 
                '</div>';                   
            }

           html += '</div>';

       }

       var buttonId = getPropertyId(deviceName,propertyName) + "_updateButton";

        if(node.getAttribute("perm") != 'ro'){
            html +=  '<button id="' +  buttonId +'" class="btn btn-default" onclick="funcionEscritura(\'' + deviceName + '\', \'' + propertyName + '\');">Actualizar</button>';

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
            var boxId = getPropertyId(deviceName,propertyName) + "_box";

            html += '<div class = "elementBoxContainer" id = "'+ boxId +'">';
                for(var i = 0; i < nodes.length; i++){  
                    var elementName = nodes[i].getAttribute("name");
                    html += 
                    '<div class = "elementBox" data_elementname = "'+ elementName +'">' + nodes[i].getAttribute("label") + ":" + 
                        '<div id="' + getElementId(deviceName,propertyName,elementName) + "_value" + '">' + 
                        nodes[i].innerHTML + 
                    '</div>' +
                        getInputNumber(getElementId(deviceName,propertyName,elementName) + "_input", node.getAttribute("perm"), nodes[i]) + 
                    '</div>';  
                }

            html += '</div>';   
        }

        var buttonId = getPropertyId(deviceName,propertyName) + "_updateButton";

        if(node.getAttribute("perm") != 'ro'){
                html +=  '<button id="'+ buttonId +'" class="btn btn-default" onclick="writeNumber(\'' + deviceName + '\', \'' + propertyName + '\');">Actualizar</button>';
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
            var boxId = getPropertyId(deviceName, propertyName) + "_box";
            var selectId = getPropertyId(deviceName, propertyName) + "_select";

            html += '<div class = "elementBoxContainer" id = "'+ boxId +'" data_elementname = "'+ elementName +'">';

                if(node.getAttribute("rule") == 'OneOfMany'){      
                    html += '<select id = "'+ selectId +'" onchange="writeSwitchSelect(\'' + deviceName + '\', \'' + propertyName + '\');">';        
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
                    html += '<select id = "'+ selectId +'" onchange="writeSwitchSelect(\'' + deviceName + '\', \'' + propertyName + '\');">' +
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
                        for(var i = 0; i < nodes.length; i++){  
                            var elementName = nodes[i].getAttribute("name");
                            html += 
                            '<div class = "elementBox" data_elementname = "'+ elementName +'">' + 
                                getInputSwitch(node.getAttribute("rule"), nodes[i], deviceName, propertyName, elementName) + 
                            '</div>';
                        }
                        html += '<button id="updateButton" class="btn btn-default" onclick="writeSwitchCheckboxes(\'' + deviceName + '\', \'' + propertyName + '\');">Actualizar</button>';
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

function getVentana(deviceName){
    var windowId = getWindowId(deviceName);
    var antiguaVentana = document.getElementById(windowId);

    if(antiguaVentana == null){
        //Añadimos la nueva ventana al body
        $('body').append('<div class="deviceWindow" id="' + windowId + '"><div><span>Enable BLOBS<input type="checkbox" data-toggle="toggle"></span></div><div id="'+ windowId +'_tabs" class="windowTabs"><ul></ul></div>' + '</div>');

        $( "#" + windowId + '_tabs' ).tabs();
        //Inicializacíon de la nueva ventana
        var dialog = $('#' + windowId).dialog({
            title: deviceName,
            width: '500px',
        }); 
        antiguaVentana = document.getElementById(windowId);
    }

    return antiguaVentana;
}

function getInputText(id, perm){
    if(perm != 'ro'){
        return '<input id ="'+ id +'"type="text" placeholder="Modificar" class = "updateBox">';
    }
    else{
        return "";
    }
}

function getInputNumber(id, perm, node){
    if(perm != 'ro'){
            return '<input id = "'+ id +'" type="number" id="numerics" min=' + node.getAttribute("min") + ' max = ' + node.getAttribute("max") + ' title="Format: [format: ' + node.getAttribute("format") + ", " + node.getAttribute("min") + ", " + node.getAttribute("max") + ", "  + node.getAttribute("step") +' ]">';               
    }
    else{
        return "";
    }
}

function getInputSwitch(rule, node, deviceName, propertyName, elementName){
    switch(rule){
        /*Combo con las opciones que vayan saliendo.*/
        case 'OneOfMany':
           // return '<option value="'+ node.getAttribute("name") +'">' + node.getAttribute("label") + '</option>';
        
        /*Combo pero que la primera opción sea en blanco para que así se pueda dejar vacía.*/
        case 'AtMostOne':
            var aux = '<option id="'+ getElementId(deviceName,propertyName,elementName) +'_value" value="'+ node.getAttribute("name") +'"';

            if(node.innerHTML.trim() == 'On'){
                aux += 'selected="selected"';
            }

            var label=node.getAttribute("label");

            if(label == null){
                label = node.getAttribute("name");
            }
            else{
                label = label.trim();
            }

            if(label == ''){
                label = node.getAttribute("name");
            }

            aux += '>' + label + '</option>';

            return aux; 
        
        /*Poner todos los checkbox y seleccionar todos los que se quieran de todos ellos.*/
        case 'AnyOfMany':
            var aux = '<label><input id="'+ getElementId(deviceName,propertyName,elementName) +'_value" type="checkbox" value ='+ node.getAttribute("name"); 

            if(node.innerHTML.trim() == 'On'){
                aux += ' checked="checked"';
            }

            var label=node.getAttribute("label");

            if(label == null){
                label = node.getAttribute("name");
            }
            else{
                label = label.trim();
            }

            if(label == ''){
                label = node.getAttribute("name");
            }

            aux +='/><span>'+ label +'</span>' + '</label>';

            return aux;
    }            
}

function getTabId(deviceName, groupName){
    var concat = deviceName + "_" + groupName;
    return concat.replace(/[\W_]/g,"_");
}

function getTab(deviceName, groupName){
    var tabId = getTabId(deviceName, groupName);
    var windowId = getWindowId(deviceName);

    var antiguoTab = document.getElementById(tabId);

    if(antiguoTab == null){

        var windowTabs = $( "#" + windowId + '_tabs' );

        var html = '<div id="' + tabId + '" class="tabGroup">' + '</div>';

        windowTabs.append(html);

        var html2 = "<li><a href='#"+ tabId +"'>" + groupName + "</a></li>";

        windowTabs.find( ".ui-tabs-nav" ).append( html2);

        antiguoTab = document.getElementById(tabId);

        windowTabs.tabs( "refresh" );
    }
    return antiguoTab;
}

function addDeviceToTab(deviceName, groupName, html) {
    var antiguoTab = getTab(deviceName, groupName);
    var windowId = getWindowId(deviceName);
    antiguoTab.innerHTML += html;

    var active = $( "#" + windowId + "_tabs" ).tabs( "option", "active" );

    if (!active) {
        $( "#" + windowId + "_tabs" ).tabs({
          active: 0
         });
    }
}