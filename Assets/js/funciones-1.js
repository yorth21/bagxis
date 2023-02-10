// Editor de texto RichText

$(document).ready(function() {
    $('#editor').richText({
        // title
        heading: false,

        // fonts
        fonts: false,

        fontColor: false,
        fontSize: false,
        // uploads
        imageUpload: false,
        fileUpload: false,

        // media
        videoEmbed: false,

        // link
        urls: false,

        // tables
        table: false,

        // code
        removeStyles: false,
        code: false,

    });
    $('#editorPreg').richText({
        // title
        heading: false,

        // fonts
        fonts: false,

        fontColor: false,
        fontSize: false,
        // uploads
        imageUpload: false,
        fileUpload: false,

        // media
        videoEmbed: false,

        // link
        urls: false,

        // tables
        table: false,

        // code
        removeStyles: false,
        code: false,

    });
    $('#editorInv').richText({
        // title
        heading: false,

        // fonts
        fonts: false,

        fontColor: false,
        fontSize: false,
        // uploads
        imageUpload: false,
        fileUpload: false,

        // media
        videoEmbed: false,

        // link
        urls: false,

        // tables
        table: false,

        // code
        removeStyles: false,
        code: false,

    });
    $('#editorConc').richText({
        // title
        heading: false,

        // fonts
        fonts: false,

        fontColor: false,
        fontSize: false,
        // uploads
        imageUpload: false,
        fileUpload: false,

        // media
        videoEmbed: false,

        // link
        urls: false,

        // tables
        table: false,

        // code
        removeStyles: false,
        code: false,

    });
});

// Fin editor de texto RichText


// Inicio formulario solicitud

function crearSolicitud(e) {
    e.preventDefault();
    const tipopqrsf = document.getElementById("tipopqrsf");
    const idarea = document.getElementById("idarea");
    const idtipousu = document.getElementById("idtipousu");
    const editor = document.getElementById("editor");
    if (tipopqrsf.value == "" || editor.value == "" || editor.value == "<div><br></div>" || idtipousu.value == "" || idarea.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        const url = base_url + "Buzon/crearSolicitud";
        const frm = document.getElementById("frmSolicitud");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Solicitud enviada con exito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    frm.reset();
                    document.querySelector('.richText-editor').innerHTML = "";
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
    }
}

// Fin formulario solicitud


// Seguimiento

let tblSolicitudes, tblSolicitudesAdmin;
document.addEventListener("DOMContentLoaded", function(){
    tblSolicitudes = $('#tblSolicitudes').DataTable( {
        "aaSorting": [],
        ajax: {
            url: base_url + 'Buzon/listar',
            dataSrc: ''
        },
        columns: [
            {
                'data' : 'id'
            },
            {
                'data' : 'pqrsf'
            },
            {
                'data' : 'fechareg'
            },
            {
                'data' : 'estado'
            },
            {
                'data' : 'acciones'
            }
        ]
    } );
    tblSolicitudesAdmin = $('#tblSolicitudesAdmin').DataTable( {
        "aaSorting": [],
        ajax: {
            url: base_url + 'Admin/sinResponder',
            dataSrc: ''
        },
        columns: [
            {
                'data' : 'id'
            },
            {
                'data' : 'pqrsf'
            },
            {
                'data' : 'fechareg'
            },
            {
                'data' : 'estado'
            },
            {
                'data' : 'acciones'
            }
        ]
    } );
    tblSolicitudesAdmin = $('#tblSolicitudesResAdmin').DataTable( {
        "aaSorting": [],
        ajax: {
            url: base_url + 'Admin/solicitudesRes',
            dataSrc: ''
        },
        columns: [
            {
                'data' : 'id'
            },
            {
                'data' : 'pqrsf'
            },
            {
                'data' : 'fechareg'
            },
            {
                'data' : 'estado'
            },
            {
                'data' : 'acciones'
            }
        ]
    } );
})

// Fin seguimiento


// Formulario responder solicitudes

var btnContador = 0;

function continuarFrm(e) {
    e.preventDefault();

    const editorPreg = document.getElementById("editorPreg");
    const editorInv = document.getElementById("editorInv");
    const editorConc = document.getElementById("editorConc");

    if (btnContador > 2 || btnContador < 0) {
        Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error, recarga la pagina',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        if (btnContador == 0) {
            if (editorPreg.value == "" || editorPreg.value == "<div><br></div>") {
                Swal.fire({
                    icon: 'error',
                    title: 'Completa el campo para continuar',
                    showConfirmButton: false,
                    timer: 3000
                })
            } else {
                btnContador = 1;
                document.getElementById("pregunta").classList.add("d-none");
                document.getElementById("investigacion").classList.remove("d-none");
                document.getElementById("atrasFrm").classList.remove("d-none");
            }
        } else if (btnContador == 1) {
            if (editorInv.value == "" || editorInv.value == "<div><br></div>") {
                Swal.fire({
                    icon: 'error',
                    title: 'Completa el campo para continuar',
                    showConfirmButton: false,
                    timer: 3000
                })
            } else {
                btnContador = 2;
                document.getElementById("investigacion").classList.add("d-none");
                document.getElementById("conclusion").classList.remove("d-none");
                document.getElementById("enviarFrm").classList.remove("d-none");
                document.getElementById("continuarFrm").classList.add("d-none");
            }
        }
    }
}

function atrasFrm(e) {
    e.preventDefault();

    if (btnContador > 2 || btnContador < 0) {
        Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error, recarga la pagina',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        if (btnContador == 1) {
            btnContador = 0;
            document.getElementById("investigacion").classList.add("d-none");
            document.getElementById("atrasFrm").classList.add("d-none");
            document.getElementById("pregunta").classList.remove("d-none");
        } else if (btnContador == 2) {
            btnContador = 1;
            document.getElementById("investigacion").classList.remove("d-none");
            document.getElementById("conclusion").classList.add("d-none");
            document.getElementById("enviarFrm").classList.add("d-none");
            document.getElementById("continuarFrm").classList.remove("d-none");
        }
    }
}

function enviarFrm(e) {
    e.preventDefault();

    const idSolicitud = document.getElementById("idSolicitud");
    const editorPreg = document.getElementById("editorPreg");
    const editorInv = document.getElementById("editorInv");
    const editorConc = document.getElementById("editorConc");

    if (idSolicitud.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error de sistema, recarga la pagina',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        if (editorPreg.value == "<div><br></div>" || editorInv.value == "<div><br></div>" || editorConc.value == "<div><br></div>") {
            Swal.fire({
                icon: 'error',
                title: 'Todos los campos son obligatorios',
                showConfirmButton: false,
                timer: 3000
            })
        } else {
            const url = base_url + "Admin/enviarRespuesta";
            const frm = document.getElementById("frmSolicitudRes");
            const http = new XMLHttpRequest();
            http.open("POST", url, true);
            http.send(new FormData(frm));
            http.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    const res = this.responseText;
                    if (res == "si") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Respuesta enviada con exito',
                            showConfirmButton: false,
                            timer: 3000
                        })
                        frm.reset();
                        setTimeout(() => {
                            location.href = base_url + "Admin/buzon"
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
        }
    }
}

// Fin formulario responder solicitudes

// Menu

$.get(base_url + 'Inicio/menuPermiso', function(res){
    $("#admin").html(res);
});

$.get(base_url + 'Inicio/nameUser', function(res){
    $("#navbarDropdown").html(res);
});

// Fin menu


// Modal agregar archivos

function aggArchivos(idSolicitud) {
    document.getElementById("frmArchivos").reset();
    document.getElementById("elementos-pruebas").innerHTML = '<div class="text-center">Ningun elemento cargado</div>';
    document.getElementById("btn-gdrArchivos").innerHTML = `<button type="button" class="btn btn-success" onclick="guardarArchivos(event, ${idSolicitud});">Agregar</button>`;
    document.getElementById("num-soli").innerHTML = `<h5>Solicitud <b>No.</b> ${idSolicitud}</h5>`;
    $("#modal-aggArchivos").modal("show");
}

function guardarArchivos(e, idSolicitud) {
    e.preventDefault();

    const url = base_url + "Admin/gdrArchivos/" + idSolicitud;
    const frm = document.getElementById("frmArchivos");
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send(new FormData(frm));
    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            const res = this.responseText;
            if (res == "si") {
                Swal.fire({
                    icon: 'success',
                    title: 'Archivos subidos con exito',
                    showConfirmButton: false,
                    timer: 2000
                })
                frm.reset();
                $("#modal-aggArchivos").modal("hide");
                tblSolicitudesAdmin.ajax.reload();
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
}

function enviarRes(idSolicitud) {
    Swal.fire({
        title: '¿Estas seguro?',
        text: "El usuario podra ver la respuesta de la solicitud",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Admin/enviarRes/"+idSolicitud;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    const res = this.responseText;
                    if (res == "si") {
                        tblSolicitudesAdmin.ajax.reload();
                        Swal.fire(
                            'Enviado!',
                            'Se envio con exito',
                            'success'
                        )
                    } else {
                        Swal.fire(
                            'Error',
                            res,
                            'error'
                        )
                    }
                }
            }
        }
      })
}

// Fin modal agregar archivos

