$(document).ready(function () {
    var sessionExist = sessionStorage.getItem("token");
    var rol = sessionStorage.getItem("rol");
    if (typeof sessionExist == "undefined" || sessionExist == null) {
        window.location = 'login.html';
    }
    $("#mnUsuarios").hide();
    $("#mnTransacciones").hide();

    if (rol == "Asesor") {
        $("#mnUsuarios").show();
    }
    if (rol == "Cajero") {
        $("#mnTransacciones").show();
    }
    $("#btnLogout").click(function () {
        logout();
    });
    $("#btnCrear").click(function () {
        crearUsuarios();
    });

    $(document).on('click', '.btnEditaruno', function () {
        var idUsuario = $(event.target).attr('data-id');
        getUsuarioAEditar(idUsuario);
    });

    $(document).on('click', '.btnCuentas', function () {
        var idUsuario = $(event.target).attr('data-id');
        listarCuentas(idUsuario);
    });

    $("#btnEditar").click(function () {
        debugger
        editarUsuario();
    });

    listarUsuarios();


});

function crearUsuarios() {
    var name = $("#namecrear").val();
    var email = $("#emailcrear").val();
    var password = $("#passwordcrear").val();
    var c_password = $("#cpasswordcrear").val();
    var tipo_doc = $("#tipo_doccrear").val();
    var num_documento = $("#num_documentocrear").val();
    var apellido = $("#apellidocrear").val();
    var direccion = $("#direccioncrear").val();

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
        url: 'http://localhost:8000/api/register',
        data: {
            name: name,
            email: email,
            password: password,
            c_password: c_password,
            tipo_doc: tipo_doc,
            num_documento: num_documento,
            apellido: apellido,
            direccion: direccion
        }, success: function (data) {
            $('#CrearModal').modal('hide')
            listarUsuarios();
            var datapass = data.success.numerodoc.toString().substr(-4);
            crearCuenta(data.success.user, datapass);
        },
        error: function (err) {
            debugger
            alert("error: " + err);
        }
    });
}
function crearCuenta(idUsuario, datapass) {
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
        url: 'http://localhost:8000/api/accounts',
        data: {
            user_id: idUsuario,
            ac_password: datapass

        }, success: function (data) {
            $('#CrearModal').modal('hide')
            listarUsuarios();

        },
        error: function (err) {
            debugger
            alert("error: " + err);
        }
    });
}
function listarCuentas(idUsuario) {
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
        url: 'http://localhost:8000/api/accounts/getCuentas',
        data: {user_id: idUsuario}
        , success: function (data) {
            debugger
            $("#listCuentas").html('');
            for (var i = 0; i < data.data.length; i++) {
                var cuenta = data.data[i];
                $("#listCuentas")
                        .append("<li>Numero de Cuenta: " + cuenta.ac_number + " Saldo: " + cuenta.ac_balance + " Estado: " + cuenta.ac_state + "</li>");
                // (o el campo que necesites)
            }
        },
        error: function (err) {
            alert("error: " + err);
        }
    });
}
function getUsuarioAEditar(idUsuario) {
    $.ajaxSetup({

        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            Authorization: 'Bearer ' + sessionStorage.getItem("token")
        }

    });

    $.ajax({
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        url: 'http://localhost:8000/api/users/' + idUsuario,
        success: function (data) {
            var user = data.data;
            $("#idUsuarioEditar").val(user.id);
            $("#nameeditar").val(user.name);
            $("#emaileditar").val(user.email);
            $("#passwordeditar").val(user.password);
            $("#tipo_doceditar").val(user.tipo_doc);
            $("#num_documentoeditar").val(user.num_documento);
            $("#apellidoeditar").val(user.apellido);
            $("#direccioneditar").val(user.direccion);

        },
        error: function (err) {
            alert("error: " + err);
        }
    });
}
function editarUsuario() {
    debugger
    var id = $("#idUsuarioEditar").val();
    var name = $("#nameeditar").val();
    var email = $("#emaileditar").val();
    var password = $("#passwordeditar").val();
    var tipo_doc = $("#tipo_doceditar").val();
    var num_documento = $("#num_documentoeditar").val();
    var apellido = $("#apellidoeditar").val();
    var direccion = $("#direccioneditar").val();


    $.ajaxSetup({

        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            Authorization: 'Bearer ' + sessionStorage.getItem("token")
        }

    });

    var data = {
        name: name,
        email: email,
        password: password,
        tipo_doc: tipo_doc,
        num_documento: num_documento,
        apellido: apellido,
        direccion: direccion
    }

    $.ajax({
        type: 'PUT',
        crossDomain: true,
        dataType: 'json',
        url: 'http://localhost:8000/api/users/' + id,
        data: data,
        success: function (data) {
            $('#EditModal').modal('hide')
            listarUsuarios();
        },
        error: function (err) {
            debugger
            alert("error: " + err);
        }
    });


}
function listarUsuarios() {
    $.ajaxSetup({

        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            Authorization: 'Bearer ' + sessionStorage.getItem("token")
        }

    });

    $.ajax({
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        url: 'http://localhost:8000/api/users',
        success: function (data) {
            $("#tblUsuarios tbody").html('');
            for (var i = 0; i < data.data.length; i++) {

                $("#tblUsuarios tbody")
                        .append("<tr>\n\
                                    <td>" + data.data[i].id + "</td>\n\
                                    <td>" + data.data[i].name + " " + data.data[i].apellido + "</td>\n\
                                    <td>" + data.data[i].tipo_doc + "</td>\n\
                                    <td>" + data.data[i].num_documento + "</td>\n\
                                    <td>" + data.data[i].email + "</td>\n\
                                    <td><button class='btnEditaruno' data-id='" + data.data[i].id + "'data-toggle='modal' data-target='#EditModal'>E</button>\n\
                                        <button class='btnCuentas' data-id='" + data.data[i].id + "'data-toggle='modal' data-target='#CuentasModal'>C</button></td>\n\
                                    </tr>");

                // (o el campo que necesites)
            }
        },
        error: function (err) {
            alert("error: " + err);
        }
    });
}

function logout() {
    $.ajaxSetup({

        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            Authorization: 'Bearer ' + sessionStorage.getItem("token")
        }

    });

    $.ajax({
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        url: 'http://localhost:8000/api/logout',
        success: function (data) {
            sessionStorage.clear();
            window.location = 'login.html';
        },
        error: function (err) {
            alert("error: " + err);
        }
    })
}



