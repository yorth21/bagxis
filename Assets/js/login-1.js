
// Funciones Login

function frmLogin(e) {
    e.preventDefault();
    const documento = document.getElementById("documento");
    const clave = document.getElementById("clave");
    if (documento.value == "") {
        clave.classList.remove("is-invalid");
        documento.classList.add("is-invalid");
        documento.focus();
        // para eliminar la alerta
        document.getElementById("alerta").classList.add("d-none");
    } else if (clave.value == "") {
        documento.classList.remove("is-invalid");
        clave.classList.add("is-invalid");
        clave.focus();
        // para eliminar la alerta
        document.getElementById("alerta").classList.add("d-none");
    } else {
        const url = base_url + "Login/validar";
        const frm = document.getElementById("frmLogin");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "ok") {
                    // mandar controlador index
                    window.location = base_url + "Inicio";
                } else {
                    document.getElementById("alerta").classList.remove("d-none");
                    document.getElementById("alerta").innerHTML = res;
                }
            }
        }
    }
}

// Fin Funciones Login


// Funciones Registrarse

const formulario = document.getElementById('frmRegistrarse');
const inputs = document.querySelectorAll('#frmRegistrarse input');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,30}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{6,15}$/ // 7 a 14 numeros.
}

const campos = {
    documento : false,
    nombre: false,
    apellido: false,
    fechanac: false,
    clave: false,
    email: false,
    telefono: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "documento":
            if (expresiones.telefono.test(e.target.value)) {
                const url = base_url + "Login/vldocumento/"+e.target.value;
                const http = new XMLHttpRequest();
                http.open("GET", url, true);
                http.send();
                http.onreadystatechange = function(){
                    if (this.readyState == 4 && this.status == 200) {
                        const res = JSON.parse(this.responseText);
                        if (res == "ok") {
                            document.getElementById('documento').classList.remove('border-success');
                            document.getElementById('documento').classList.add('border-danger');
                            document.getElementById('alertdocumento1').classList.add('d-none');
                            document.getElementById('alertdocumento2').classList.remove('d-none');
                            campos['documento'] = false;
                        } else {
                            document.getElementById('documento').classList.remove('border-danger');
                            document.getElementById('documento').classList.add('border-success');
                            document.getElementById('alertdocumento1').classList.add('d-none');
                            document.getElementById('alertdocumento2').classList.add('d-none');
                            campos['documento'] = true;
                        }
                    }
                }
            } else {
                document.getElementById('documento').classList.remove('border-success');
                document.getElementById('documento').classList.add('border-danger');
                document.getElementById('alertdocumento1').classList.remove('d-none');
                document.getElementById('alertdocumento2').classList.add('d-none');
            }
        break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case "apellido":
            validarCampo(expresiones.nombre, e.target, 'apellido');
        break;
        case "clave":
            validarCampo(expresiones.password, e.target, 'clave');
            validarClave();
        break;
        case "clave2":
            validarClave();
        break;
        case "email":
            validarCampo(expresiones.correo, e.target, 'email');
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(campo).classList.add('border-success');
        document.getElementById(campo).classList.remove('border-danger');
        document.getElementById(`alert${campo}`).classList.add('d-none');
        campos[campo] = true;
    } else {
        document.getElementById(campo).classList.remove('border-success');
        document.getElementById(campo).classList.add('border-danger');
        document.getElementById(`alert${campo}`).classList.remove('d-none');
        campos[campo] = false;
    }
}

const validarClave = () => {
    const inputClave = document.getElementById('clave');
    const inputClave2 = document.getElementById('clave2');

    if (inputClave.value !== inputClave2.value) {
        document.getElementById('clave2').classList.remove('border-success');
        document.getElementById('clave2').classList.add('border-danger');
        document.getElementById(`alertclave2`).classList.remove('d-none');
        campos['clave'] = false;
    } else {
        document.getElementById('clave2').classList.add('border-success');
        document.getElementById('clave2').classList.remove('border-danger');
        document.getElementById(`alertclave2`).classList.add('d-none');
        campos['clave'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

// Validar fecha

var myDate = $('#fechanac');
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear()-18;
if(dd < 10)
    dd = '0' + dd;

if(mm < 10)
    mm = '0' + mm;

today = yyyy + '-' + mm + '-' + dd;
myDate.attr("max", today);

function vlfecha(){
    var date = myDate.val();
    if(Date.parse(date)){
        if(date > today){
            document.getElementById('fechanac').classList.remove('border-success');
            document.getElementById('fechanac').classList.add('border-danger');
            document.getElementById('alertfechanac').classList.remove('d-none');
            campos['fechanac'] = false;
        } else {
            document.getElementById('fechanac').classList.add('border-success');
            document.getElementById('fechanac').classList.remove('border-danger');
            document.getElementById('alertfechanac').classList.add('d-none');
            campos['fechanac'] = true;
        }
    }
}

// Fin validar fecha

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

// Fin welect Departamentos - minicipios

// Resgistrar Usuario

function frmRegistrarse(e) {
    e.preventDefault();

    const departamento = document.getElementById('departamento');
    const municipio = document.getElementById('municipio');
    const direccion = document.getElementById('direccion');

    if (departamento.value!="" && municipio.value!="" && direccion.value!="" && campos.email && campos.telefono) {
        document.getElementById("alertcontacto").classList.add("d-none");
        // registrar usuario
        const url = base_url + "Login/registrar";
        const frm = document.getElementById("frmRegistrarse");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Tu registro fue exitoso',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    frm.reset();
                    document.querySelectorAll('.border-success').forEach((danger) => {
                        danger.classList.remove('border-success');
                    });
                    document.getElementById("dtpersonales").classList.remove("d-none");
                    document.getElementById("dtcontacto").classList.add("d-none");
                    setTimeout(() => {
                        location.href = base_url + "Login"
                    }, 2000);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: res,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            }
        }
    } else {
        document.getElementById("alertcontacto").classList.remove("d-none");
        document.getElementById("alertcontacto").innerHTML = 'Todos los campos son obligatorios';
    }
}


// Fin resgistrar Usuario


function frmContinuar(e) {
    e.preventDefault();

    const tipodoc = document.getElementById('tipodoc');
    const genero = document.getElementById('genero');

    if (tipodoc.value!="" && campos.documento && campos.nombre && campos.apellido && genero.value!="" && campos.fechanac && campos.clave) {
        document.getElementById("dtpersonales").classList.add("d-none");
        document.getElementById("dtcontacto").classList.remove("d-none");
        document.getElementById("alertpersonal").classList.add("d-none");
    } else {
        document.getElementById("alertpersonal").classList.remove("d-none");
        document.getElementById("alertpersonal").innerHTML = 'Todos los campos son obligatorios';
    }
}

function frmAtras(e) {
    document.getElementById("dtpersonales").classList.remove("d-none");
    document.getElementById("dtcontacto").classList.add("d-none");
}

// Fin Funciones Registrarse


