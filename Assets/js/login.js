/* -------------------------------------------------------------
    Funciones para mostrar el modal del login
  ------------------------------------------------------------- */
const loginDialog = document.getElementById('loginDialog');
const loginShow = document.getElementById('loginShow');
const loginShowSub = document.getElementById('loginShowSub'); // Abrir login desde el menu inferior
const loginCerrar = document.getElementById('loginCerrar');

// abrir el modal del login
loginShow.addEventListener("click", () => {
    loginDialog.showModal();
});
loginShowSub.addEventListener("click", () => {
    loginDialog.showModal();
});
// cerrar el modal del login
loginCerrar.addEventListener('click', function() {
    loginDialog.close();
});

/* Funcion para las alertas */
function alert(icono, msg) {
    Swal.fire({
        icon: icono,
        title: msg,
        showConfirmButton: false,
        timer: 1500,
    })
}

/* -------------------------------------------------------------
    Funciones para el formulario de registrarse 
  ------------------------------------------------------------- */

// Select Departamentos - minicipios
$(document).ready(function(e){
    $("#departamento").change(function () {
        var id = $("#departamento").val();
        $.ajax({
            // data: parametros,
            url: base_url + 'Login/municipios/'+id,
            type: 'post',
            beforeSend: function () {
            },
            success: function (response) {
                $("#municipio").html(response);
            }
        });
    })
});

/* funcion para registrar usuarios */
function frmRegistrar(e) {
    e.preventDefault();

    const url = base_url + "Login/registrar";
    const frm = document.getElementById("frmRegistrar");
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send(new FormData(frm));
    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            const res = this.responseText; // obtenemos la respuesta del servidor
            if (res == "ok") {
                alert('success', 'Usuario registrado con exito');
                frm.reset(); // Limpiamos el formulario
                setTimeout(() => {
                    location.href = base_url;
                }, 1500);
            } else {
                alert('error', res);
            }
        }
    } 
}


/* -------------------------------------------------------------
    Funciones para el login 
  ------------------------------------------------------------- */
function frmLogin(e) {
    e.preventDefault();

    const url = base_url + "Login/loguearse";
    const frm = document.getElementById("frmLogin");
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send(new FormData(frm));
    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            const res = this.responseText; // obtenemos la respuesta del servidor
            if (res == "ok") {
                alert('success', 'Inicio sesion con exito');
                frm.reset(); // Limpiamos el formulario
                loginDialog.close(); // cerramos el modal
            } else {
                // Mostrar mensaje de error en el login y limpiar el formulario
                const loginRes = document.getElementById("loginRes")
                loginRes.innerHTML = res;
                frm.reset();
                setTimeout(() => {
                    loginRes.innerHTML = "";
                }, 1500);
            }
        }
    } 
}