/* -------------------------------------------------------------
    Funciones para mostrar el modal del login
  ------------------------------------------------------------- */
// Obtenemos el elemento modal para interactuar con el
const loginDialog = document.getElementById('loginDialog');
// Obtenemos el boton para cerrar el modal
const loginCerrar = document.getElementById('loginCerrar');

/* Funcion para ver el perfil y si
    no esta logueado le muestra el menu */
const mostrarPerfil = async () => {
    // comprobamos si no esta logueado para mostrar el login
    const data = await datosSesion();
    if (data.activo == true) {
        location.href = base_url + 'Login/verPerfil'; // redirigimos a la vista para ver el perfil del usuario
        return;
    }
    // abrir el modal del login
    loginDialog.showModal();
};

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

  $(document).ready(function(e){ // Se ejecuta cuando todo el documento HTML este cargado
    // Select Departamentos - minicipios
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

    // Funcion para saber si el usuario esta logueado o no
    datosSesion();
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
                datosSesion(); // Para optener los datos se la sesion iniciada
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

/* -------------------------------------------------------------
    Funciones para cuando el usuario ya esta logueado
  ------------------------------------------------------------- */
// Funcion para obtener los datos de la sesion del usuario
const datosSesion = async () => {
    const response = await fetch( base_url + 'Login/datosSesion');
    const data = await response.json();
    if (data.activo == true) {
        miPerfil(data);
    }
    return data;
};
// Funcion para cambiar el icono de iniciar sesion
const miPerfil = ( data ) => {
    // Obtenemos los campos que vamos a modificar
    const btnPerfil = document.getElementById("btnPerfil");
    const textBtnPerfil = document.getElementById("textBtnPerfil");

    // Hacemos un innerHTML para modificar esos campos y dar ilusion que ya esta logueado
    btnPerfil.insertAdjacentHTML("beforeend", data.nombres);
    textBtnPerfil.innerHTML = data.nombres;
}
