$(document).ready(function () {
    var sessionExist = sessionStorage.getItem("token");
    var rol = sessionStorage.getItem("rol");
    if (typeof sessionExist == "undefined" || sessionExist == null) {
        window.location = 'login.html';
    }
    $("#mnTransacciones").hide();
    $("#mnUsuarios").hide();
    $("#frmCrearTransaccion").hide();
    $("#btnCrearTransaction").hide();

    if (rol == "Asesor") {
        $("#mnUsuarios").show();
    }
    if (rol == "Cajero") {
        $("#mnTransacciones").show();
    }

    $("#btnLogout").click(function () {
        logout();
    });

    $("#btnBuscarCuentas").click(function () {
        debugger
        buscarCuentas();
    });
    $("#btnCrearTransaction").click(function () {
        debugger
        CrearTransaccion();
    });

});


function buscarCuentas() {
    debugger
    var num_documento = $("#num_documento").val();
    var tipo_doc = $("#tipo_doc").val();

    $.ajaxSetup({

        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            Authorization: 'Bearer ' + sessionStorage.getItem("token")
        }

    });

    $.ajax({
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        url: 'http://localhost:8000/api/transactions/getCuentasUser',
        data: {
            num_documento: num_documento,
            tipo_doc: tipo_doc
        },
        success: function (data) {
            debugger
            $("#frmCrearTransaccion").show();
            $("#btnCrearTransaction").show();
            $("#account_id").html('');
            for (var i = 0; i < data.data.length; i++) {
                var cuenta = data.data[i];
                $("#account_id")
                        .append("<option value='" + cuenta.id + "'>" + cuenta.ac_number + " Estado: " + cuenta.ac_state + "</option>");

            }
        },
        error: function (jqXHR) {
            debugger
            var error = jqXHR.responseJSON
            alert("error: " + error.error);
        }
    });
}
function CrearTransaccion() {
    debugger
    var account_id = $("#account_id").val();
    var tr_tipo = $("#tr_tipo").val();
    var tr_monto = $("#tr_monto").val();

    $.ajaxSetup({

        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            Authorization: 'Bearer ' + sessionStorage.getItem("token")
        }

    });

    $.ajax({
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        url: 'http://localhost:8000/api/transactions',
        data: {
            account_id: account_id,
            tr_tipo: tr_tipo,
            tr_monto: tr_monto
        },
        success: function (data) {
            debugger
            alert("Transacción Exitosa!! Gracias por utilizar nuestros cajeros.");
            window.location = 'transacciones.html';
        },
        error: function (err) {
            debugger
            alert("error: " + err);
        }
    });
}



