$(document).ready(function () {

    $("#btnLogin").click(function () {

        var email= $("#inputEmail").val();
        var password= $("#inputPassword").val();
        $.ajaxSetup({

            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }

        });

        $.ajax({
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            url: 'http://localhost:8000/api/login',
            data: {
            
                email: email,
                password: password
            },
            success: function (data) {
                sessionStorage.setItem("token", data.success.token);
                sessionStorage.setItem("rol", data.success.rol);
                alert("Bievenido");
                window.location = 'index.html';
            },
            error: function (err) {
                alert("error: " + err);
            }
        })
    });

});




