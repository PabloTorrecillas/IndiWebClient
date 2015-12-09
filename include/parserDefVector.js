/**
* Parseo de la propiedad Text que proviene de un mensaje del servidor.
*
* @param {var}  node  Variable Text para parsear.
*
*/
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
        getLight(node.getAttribute("state"), getPropertyId(deviceName,propertyName) + "_bombilla") + node.getAttribute("name") + '</div>';
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
            html +=  '<button id="' +  buttonId +'" class="btn btn-default" onclick="writeText(\'' + deviceName + '\', \'' + propertyName + '\');">Actualizar</button>';

        }

    html += '</div>';

    addDeviceToTab(deviceName, groupName, html);      
}

/**
* Parseo de la propiedad Number que proviene de un mensaje del servidor.
*
* @param {var}  node  Variable Number para parsear.
*
*/
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
        getLight(node.getAttribute("state"), getPropertyId(deviceName,propertyName) + "_bombilla") + node.getAttribute("name") + '</div>';
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
                        parseFloat(nodes[i].innerHTML).toFixed(3) + 
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

/**
* Parseo de la propiedad Switch que proviene de un mensaje del servidor.
*
* @param {var}  node  Variable Switch para parsear.
*
*/
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
        getLight(node.getAttribute("state"), getPropertyId(deviceName,propertyName) + "_bombilla") + node.getAttribute("name") + '</div>';
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

/**
* Parseo de la propiedad BLOB que proviene de un mensaje del servidor.
*
* @param {var}  node  Variable BLOB para parsear.
*
*/
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
        getLight(node.getAttribute("state"), getPropertyId(deviceName,propertyName) + "_bombilla") + node.getAttribute("name") + '</div>';
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

/**
* Parseo de la propiedad Light que proviene de un mensaje del servidor.
*
* @param {var}  node  Variable Light para parsear.
*
*/
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
        getLight(node.getAttribute("state"), getPropertyId(deviceName,propertyName) + "_bombilla") + node.getAttribute("name") + '</div>';
        html += '</div>';

        var nodes = node.getElementsByTagName('defLight');

        if(nodes.length > 0){
            html += '<div class = "elementBoxContainer">';
                for(var i = 0; i < nodes.length; i++){  
                    var elementName = nodes[i].getAttribute("name"); 
                    html += 
                    '<div class = "elementBox">'+ nodes[i].getAttribute("label")   + ': ' + 
                            getLight(nodes[i].innerHTML, getElementId(deviceName,propertyName,elementName) + "_bombilla") + 
                    '</div>';
                }

            html += '</div>';
        }
    html += '</div>';

    addDeviceToTab(deviceName, groupName, html);    
}

/**
* Creación de una nueva ventana para un dispositivo del servidor en caso de que no exista su ventana.
*
* @param {var}  deviceName  Nombre del dispositivo para el que se crea la ventana.
* @return {var}  antiguaVentana  Nueva ventana para el dispositivo que se ha pasado por parametro.
*/
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

/**
* Creación de un cuadro de texto para las propiedades de tipo Text que se permitan modificar.
*
* @param {var}  id  Identificador para el cuadro de texto.
* @param {var}  perm  Tipo de permiso de la propiedad Text.
* @return Cuadro de texto si perm != 'ro' o cadena vacía en caso contrario.
*/
function getInputText(id, perm){
    if(perm != 'ro'){
        return '<input id ="'+ id +'"type="text" placeholder="Modificar" class = "updateBox">';
    }
    else{
        return "";
    }
}

/**
* Creación de un cuadro numérico para las propiedades de tipo Number que se permitan modificar.
*
* @param {var}  id  Identificador para el cuadro numérico.
* @param {var}  perm  Tipo de permiso de la propiedad Number.
* @param {var}  node  Conjunto de todas los numbers correspondientes a una propiedad concreta.
* @return Cuadro numérico si perm != 'ro' o cadena vacía en caso contrario.
*/
function getInputNumber(id, perm, node){
    if(perm != 'ro'){
            return '<input id = "'+ id +'" type="number" id="numerics" min=' + node.getAttribute("min") + ' max = ' + node.getAttribute("max") + ' title="Format: [format: ' + node.getAttribute("format") + ", " + node.getAttribute("min") + ", " + node.getAttribute("max") + ", "  + node.getAttribute("step") +' ]">';               
    }
    else{
        return "";
    }
}

/**
* Creación de un desplegable o checkbox para las propiedad de tipo Switch
*
* @param {var}  rule  Tipo de regla para crear un cuadro de texto u otro.
* @param {var}  node  Conjunto de todos los switchs correspondientes a una propiedad concreta.
* @param {var}  deviceName  Nombre del dispositivo sobre el que se va a crear el desplegable o checkbox
* @param {var}  propertyName  Nombre de la propiedad sobre la que se va a crear el desplegable o checkbox.
* @param {var}  elementName  Nombre del elemento sobre el que se va a crear el desplegable o checkbox.
* @return {var} aux Desplegable o checkbox según corresponda a un tipo de regla u otro.
*/
function getInputSwitch(rule, node, deviceName, propertyName, elementName){
    switch(rule){
        /*Combo con las opciones que salgan.*/
        case 'OneOfMany':
            //No hace falta crearlo ya que hace lo mismo que el siguiente case solo que sin dejar un hueco del desplegable en blanco.
        
        /*Combo con la primera opción sea en blanco.*/
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
        
        /*Checkbox y seleccionar todos los que se quieran de todos ellos.*/
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

/**
* Obtener el identificador de una pestaña.
*
* @param {var}  deviceName  Nombre del dispositivo para el que se obtiene el identificador de la pestaña.
* @param {var}  groupName  Nombre del grupo y a su vez de la pestaña de la propiedad.
* @return {var} concat  Unión de ambos parámetros con los espacios reemplazados por guión bajo que dan el identificador de la pestaña.
*/
function getTabId(deviceName, groupName){
    var concat = deviceName + "_" + groupName;
    return concat.replace(/[\W_]/g,"_");
}

/**
* Crear una nueva pestaña
*
* @param {var}  deviceName  Nombre del dispositivo para el que se obtiene la pestaña.
* @param {var}  groupName  Nombre del grupo y a su vez de la pestaña de la propiedad.
* @return {var} antiguoTab  Nueva pestaña creada debidamente inicializada. 
*/
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

/**
* Añadir una nueva pestaña al conjunto de pestañas
*
* @param {var}  deviceName  Nombre del dispositivo para el que se añade la nueva pestaña.
* @param {var}  groupName  Nombre del grupo y a su vez de la pestaña que se va a añadir.
*/
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