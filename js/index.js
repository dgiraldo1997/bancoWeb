$(document).ready(function () {
    var sessionExist = sessionStorage.getItem("token");
    var rol = sessionStorage.getItem("rol");
    debugger
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
});


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
            debugger
            sessionStorage.clear();
            window.location = 'login.html';
        },
        error: function (err) {
            debugger
            alert("error: " + err);
        }
    })
}


