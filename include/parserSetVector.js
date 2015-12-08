/**
* Modificación de una propiedad Text.
*
* @param {var}  node  Propiedad Text completa que se está modificando.
*/
function parserSetTextVector(node){
  var deviceName = node.getAttribute("device");
  var propertyName = node.getAttribute("name");

  var nodes = node.getElementsByTagName('oneText');


  var bombilla = document.getElementById(getPropertyId(deviceName,propertyName) + "_bombilla");
  bombilla.setAttribute("src",getURLLight(node.getAttribute("state")));

  for(var i = 0; i < nodes.length; i++){
    var elementName = nodes[i].getAttribute("name");


    var existingElement = document.getElementById(getElementId(deviceName,propertyName,elementName) + "_value");

    existingElement.innerHTML = nodes[i].innerHTML;
  }
} 

/**
* Modificación de una propiedad Number.
*
* @param {var}  node  Propiedad Number completa que se está modificando.
*/
function parserSetNumberVector(node){
  var deviceName = node.getAttribute("device");
  var propertyName = node.getAttribute("name");

  var nodes = node.getElementsByTagName('oneNumber');

  var bombilla = document.getElementById(getPropertyId(deviceName,propertyName) + "_bombilla");
  bombilla.setAttribute("src",getURLLight(node.getAttribute("state")));

  for(var i = 0; i < nodes.length; i++){
    var elementName = nodes[i].getAttribute("name");

    var existingElement = document.getElementById(getElementId(deviceName,propertyName,elementName) + "_value");

    existingElement.innerHTML = nodes[i].innerHTML;
  }
} 

/**
* Modificación de una propiedad Switch.
*
* @param {var}  node  Propiedad Switch completa que se está modificando.
*/
function parserSetSwitchVector(node){
  var deviceName = node.getAttribute("device");
  var propertyName = node.getAttribute("name");

  var nodes = node.getElementsByTagName('oneSwitch');

  var bombilla = document.getElementById(getPropertyId(deviceName,propertyName) + "_bombilla");
  bombilla.setAttribute("src",getURLLight(node.getAttribute("state")));

  var propertyValue = document.getElementById(getPropertyId(deviceName,propertyName) + "_value");

  //Pongo a vacío el propertyValue para ir añadiendo los que están activos.
  //Hago esto por si son AnyOfMany para poder ir metiendo todos ya que si no lo hago obtiene el ultimo solo.
  propertyValue.innerHTML = '';

  for(var i = 0; i < nodes.length; i++){
    if(nodes[i].innerHTML.trim().toLowerCase() == 'on'){
      var element = document.getElementById(getElementId(deviceName,propertyName,nodes[i].getAttribute("name")) + "_value");

      //Si es OPTION (lo he puesto en mayus porque he leido que funciona bien), directamente lo cambio
      //OPTION son los OneOfMany y AtMostOne
      if(element.nodeName == 'OPTION'){
          propertyValue.innerHTML = element.innerHTML;
      }
      //Si no es un OPTION
      else{
        //Cojo el parentNode para así poder acceder a la etiqueta span.
        var labelNode = element.parentNode;
        var spanNode = labelNode.getElementsByTagName("span")[0];

        //Voy añadiendo a property value y por eso pongo el espacio en blanco para que se me vayan mostrando los que estan activos.
        propertyValue.innerHTML += ' ' + spanNode.innerHTML;
      }
    }
  }
}

/**
* Modificación de una propiedad BLOB
*
* @param {var}  node  Propiedad BLOB completa que se está modificando
*/
function parserSetBLOBVector(node){
  var deviceName = node.getAttribute("device");
  var propertyName = node.getAttribute("name");

  var nodes = node.getElementsByTagName('oneBLOB');

  var bombilla = document.getElementById(getPropertyId(deviceName,propertyName) + "_bombilla");
  bombilla.setAttribute("src",getURLLight(node.getAttribute("state")));

  for(var i = 0; i < nodes.length; i++){
    var elementName = nodes[i].getAttribute("name");

    var existingElement = document.getElementById(getElementId(deviceName,propertyName,elementName) + "_value_Size");
    existingElement.innerHTML += nodes[i].getAttribute("size");

    existingElement = document.getElementById(getElementId(deviceName,propertyName,elementName) + "_value_Format");
    existingElement.innerHTML += nodes[i].getAttribute("format");
  }
}

/**
* Modificación de una propiedad Light
*
* @param {var}  node  Propiedad Light completa que se está modificando
*/
function parserSetLightVector(node){
  var deviceName = node.getAttribute("device");
  var propertyName = node.getAttribute("name");

  var nodes = node.getElementsByTagName('oneLight');

  var bombilla = document.getElementById(getPropertyId(deviceName,propertyName) + "_bombilla");
  bombilla.setAttribute("src",getURLLight(node.getAttribute("state")));

  for(var i = 0; i < nodes.length; i++){
   var elementName = nodes[i].getAttribute("name");

   var existingElement = document.getElementById(getElementId(deviceName,propertyName,elementName) + "_bombilla");

   existingElement.setAttribute("src",getURLLight(nodes[i].innerHTML));
  }
}