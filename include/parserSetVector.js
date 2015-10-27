function parserSetTextVector(node){
  var deviceName = node.getAttribute("device");
  var propertyName = node.getAttribute("name");

  var nodes = node.getElementsByTagName('oneText');


  var bombilla = document.getElementById(getPropertyId(deviceName,propertyName) + "_bombilla");
  bombilla.setAttribute("src",getURLBombillita(node.getAttribute("state")));

  for(var i = 0; i < nodes.length; i++){
    var elementName = nodes[i].getAttribute("name");


    var existingElement = document.getElementById(getElementId(deviceName,propertyName,elementName) + "_value");

    existingElement.innerHTML = nodes[i].innerHTML;
  }
} 

function parserSetNumberVector(node){
  var deviceName = node.getAttribute("device");
  var propertyName = node.getAttribute("name");

  var nodes = node.getElementsByTagName('oneNumber');

  var bombilla = document.getElementById(getPropertyId(deviceName,propertyName) + "_bombilla");
  bombilla.setAttribute("src",getURLBombillita(node.getAttribute("state")));

  for(var i = 0; i < nodes.length; i++){
    var elementName = nodes[i].getAttribute("name");

    var existingElement = document.getElementById(getElementId(deviceName,propertyName,elementName) + "_value");

    existingElement.innerHTML = nodes[i].innerHTML;
  }
} 


function parserSetSwitchVector(node){
  var deviceName = node.getAttribute("device");
  var propertyName = node.getAttribute("name");

  var nodes = node.getElementsByTagName('oneSwitch');


  /*var bombilla = document.getElementById(getPropertyId(deviceName,propertyName) + "_bombilla");
  bombilla.setAttribute("src",getURLBombillita(node.getAttribute("state")));*/

  /*for(var i = 0; i < nodes.length; i++){
      var elementName = nodes[i].getAttribute("name");

      var existingElement = document.getElementById(getElementId(deviceName,propertyName,elementName) + "_value");

      existingElement.innerHTML = nodes[i].innerHTML;
  }*/
}

function parserSetBLOBVector(node){
  var deviceName = node.getAttribute("device");
  var propertyName = node.getAttribute("name");

  var nodes = node.getElementsByTagName('oneBLOB');

  var bombilla = document.getElementById(getPropertyId(deviceName,propertyName) + "_bombilla");
  bombilla.setAttribute("src",getURLBombillita(node.getAttribute("state")));

  for(var i = 0; i < nodes.length; i++){
    var elementName = nodes[i].getAttribute("name");

    var existingElement = document.getElementById(getElementId(deviceName,propertyName,elementName) + "_value_Size");
    existingElement.innerHTML += nodes[i].getAttribute("size");

    existingElement = document.getElementById(getElementId(deviceName,propertyName,elementName) + "_value_Format");
    existingElement.innerHTML += nodes[i].getAttribute("format");
  }
}

function parserSetLightVector(node){
  var deviceName = node.getAttribute("device");
  var propertyName = node.getAttribute("name");

  var nodes = node.getElementsByTagName('oneLight');

  var bombilla = document.getElementById(getPropertyId(deviceName,propertyName) + "_bombilla");
  bombilla.setAttribute("src",getURLBombillita(node.getAttribute("state")));

  for(var i = 0; i < nodes.length; i++){
   var elementName = nodes[i].getAttribute("name");

   var existingElement = document.getElementById(getElementId(deviceName,propertyName,elementName) + "_bombilla");

   existingElement.setAttribute("src",getURLBombillita(nodes[i].innerHTML));
  }
}