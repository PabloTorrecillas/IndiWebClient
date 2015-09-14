//Funcion principal
$(document).ready(function() {
    
	var dispositivos_configurados = [];
	
    //Funcion para comenzar
    $("#boton_comenzar").click(function() {
        var create_dialog = $("#ventana_gestion");
        var boton_comenzar = $(this);
         
        //Por defecto estara el valor en crear nueva ventana 
        if( create_dialog.dialog("isOpen") ) {
            boton_comenzar.button("option", "label", "Crear Nueva Ventana");
            create_dialog.dialog("close");
        } else {
            //Una vez abierta, el valor cambia a cerrar ventana
            boton_comenzar.button("option", "label", "Cerrar Ventana");
            create_dialog.dialog("open");
        }
    });
     
    //Se abre la ventana de dialogo
    $("#ventana_gestion").dialog({
        width: '350px',
        height: 'auto',
        autoOpen : false,
        buttons: [
            {
                text: 'Conectar',
                click: function() {
                    //Añadimos +1 al id para tener un control de las ventanas
                    var div_count = $('.ventana_gestion').length + 1;
                     
                    //Se genera el nuevo dispositivo id
                    var div_id = 'dispositivo_' + div_count;
                     
                    //Añadimos el valor del titulo y el contenido de nuestro formulario
                    var div_title = $('#new_window_title').val();
                    var div_content = $('#new_window_content').val();
                     
                    //Añadimos los botones seleccionados 
                    var buttons = new Array();
                    if( $('#boton_conectar').is(':checked') ) {
                        buttons.push({
                            text: 'CONECTAR',
                            click: function() {
                                alert('ALERTING from Dialog Widnow: ' + div_title);
                            }
                        });
                    }
                     
                    if( $('#boton_desconectar').is(':checked') ) {
                        buttons.push({
                            text: 'DESCONECTAR',
                            click: function() {
                                $('#' + div_id).dialog('desconectar');
                            }
                        });
                    }
 
                    //Añadimos la nueva ventana al body
                    $('body').append('<div class="dialog_window" id="' + div_id + '">' + div_content + '</div>');
 
                    //Inicializacíon de la nueva ventana
                    var dialog = $('#' + div_id).dialog({
                        width: 'auto',
                        height: 'auto',
                        title : div_title,
                        autoOpen : true,
                        buttons: buttons
                    });
                }
            }
        ]
    });
     
	$('#boton_anadir').click(function()
	{
        $("#ventana_anadir > *").css("visibility", "visible"),
        $("#ventana_anadir").dialog({
            width: '250px',
            height: 'auto',
            autoOpen : true,
            //$("#dialog > *").css("visibility","visible")
            
			close:function(){
				$("#formulario_dispositivo").trigger("reset");
			},
            buttons: 
            [
                {
                    text: 'Salvar', 
					click: function(){
						var nuevo_dispositivo = {
							nombre: $('#nombre_dispositivo').val(),
							ip: $('#ip_dispositivo').val(),
							puerto: $('#puerto_dispositivo').val(),
						};
						dispositivos_configurados.push(nuevo_dispositivo);
						$('#dispositivos_configurados').append(new Option(nuevo_dispositivo.nombre, dispositivos_configurados.length - 1));
                    }
                },
            ]
        });
	});

    $('#boton_editar').click(function()
    {
        $("#ventana_anadir").dialog({
            width: '250px',
            height: 'auto',
            autoOpen : true,
			open: function(){
				var indice = $('#dispositivos_configurados').find(":selected").val();
				$('#nombre_dispositivo').val(dispositivos_configurados[indice].nombre);
				$('#ip_dispositivo').val(dispositivos_configurados[indice].ip);
				$('#puerto_dispositivo').val(dispositivos_configurados[indice].puerto);
				$("#nombre_dispositivo").attr("disabled", "disabled");
			},
			buttons:
            [
                {
                    text: 'Salvar', 
					click: function(){
						var nuevo_dispositivo = {
							nombre: $('#nombre_dispositivo').val(),
							ip: $('#ip_dispositivo').val(),
							puerto: $('#puerto_dispositivo').val(),
						};
						dispositivos_configurados.push(nuevo_dispositivo);
						$('#dispositivos_configurados').append(new Option(nuevo_dispositivo.nombre, dispositivos_configurados.length - 1));
                    }
                },
            ]
        }); 
    });

    $('#boton_eliminar').click(function()
    {
        if(confirm('¿Está seguro que quiere eliminar el dispositivo de la lista?')){
          $('#dispositivos_configurados').find(':selected').remove();
        }  
    });
	
    //initialize our buttonset so our checkboxes are changed
    $("#buttonlist").buttonset();

});
