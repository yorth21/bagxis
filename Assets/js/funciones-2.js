let tblUsuarios, tblOrdenesUsuario, tblOrdenes, tblProveedores, tblDetallesMant, tblLaboratorios, tblMedicamentos;
document.addEventListener("DOMContentLoaded", function(){
    tblUsuarios = $('#tblUsuarios').DataTable( {
        ajax: {
            url: base_url + 'Usuarios/listar',
            dataSrc: ''
        },
        columns: [
            {
                'data' : 'id'
            },
            {
                'data' : 'documento'
            },
            {
                'data' : 'nombre1'
            },
            {
                'data' : 'apellido1'
            },
            {
                'data' : 'fecha_registro'
            },
            {
                'data' : 'estado'
            },
            {
                'data' : 'acciones'
            }
        ]
    } );
    tblOrdenesUsuario = $('#tblOrdenesUsuario').DataTable( {
        "aaSorting": [],
        ajax: {
            url: base_url + 'VerOrdenes/listar',
            dataSrc: ''
        },
        columns: [
            {
                'data' : 'orden'
            },
            {
                'data' : 'solicitante'
            },
            {
                'data' : 'tipo_orden'
            },
            {
                'data' : 'area'
            },
            {
                'data' : 'prioridad'
            },
            {
                'data' : 'fecha_registro'
            },
            {
                'data' : 'auditado'
            },
            {
                'data' : 'acciones'
            }
        ]
    } );
    tblOrdenes = $('#tblOrdenes').DataTable( {
        "aaSorting": [],
        ajax: {
            url: base_url + 'Auditar/listar',
            dataSrc: ''
        },
        columns: [
            {
                'data' : 'orden'
            },
            {
                'data' : 'solicitante'
            },
            {
                'data' : 'tipo_orden'
            },
            {
                'data' : 'area'
            },
            {
                'data' : 'prioridad'
            },
            {
                'data' : 'fecha_registro'
            },
            {
                'data' : 'auditado'
            },
            {
                'data' : 'acciones'
            }
        ]
    } );
    tblProveedores = $('#tblProveedores').DataTable( {
        ajax: {
            url: base_url + 'Proveedores/listar',
            dataSrc: ''
        },
        columns: [
            {
                'data' : 'id'
            },
            {
                'data' : 'documento'
            },
            {
                'data' : 'razon_social'
            },
            {
                'data' : 'direccion'
            },
            {
                'data' : 'telefono'
            },
            {
                'data' : 'email'
            },
            {
                'data' : 'acciones'
            }
        ]
    } );
    tblDetallesMant = $('#tblDetallesMant').DataTable( {
        ajax: {
            url: base_url + 'DetallesMant/listar',
            dataSrc: ''
        },
        columns: [
            {
                'data' : 'id'
            },
            {
                'data' : 'detalle'
            },
            {
                'data' : 'acciones'
            }
        ]
    } );
    tblLaboratorios = $('#tblLaboratorios').DataTable( {
        ajax: {
            url: base_url + 'Laboratorios/listar',
            dataSrc: ''
        },
        columns: [
            {
                'data' : 'id'
            },
            {
                'data' : 'laboratorio'
            },
            {
                'data' : 'acciones'
            }
        ]
    } );
    tblMedicamentos = $('#tblMedicamentos').DataTable( {
        ajax: {
            url: base_url + 'Medicamentos/listar',
            dataSrc: ''
        },
        columns: [
            {
                'data' : 'id'
            },
            {
                'data' : 'medicamento'
            },
            {
                'data' : 'rips'
            }
        ]
    } );
})

function frmUsuario() {
    document.getElementById("title").innerHTML = "Nuevo Usuario";
    document.getElementById("btnAction").innerHTML = "Registrar";
    document.getElementById("claves").classList.remove("d-none");
    document.getElementById("frmUsuario").reset();
    $("#nuevo_usuario").modal("show");
    document.getElementById("id").value = "";
}

function registrarUser(e) {
    e.preventDefault();
    const documento = document.getElementById("documento");
    const nombre1 = document.getElementById("nombre1");
    const nombre2 = document.getElementById("nombre2");
    const apellido1 = document.getElementById("apellido1");
    const apellido2 = document.getElementById("apellido2");
    const usuario = document.getElementById("usuario");
    const clave = document.getElementById("clave");
    const confirmar = document.getElementById("confirmar");
    if (documento.value == "" || nombre1.value == "" || apellido1.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        const url = base_url + "Usuarios/registrar";
        const frm = document.getElementById("frmUsuario");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario registrado con exito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    frm.reset();
                    $("#nuevo_usuario").modal("hide");
                    tblUsuarios.ajax.reload();
                } else if (res == "modificado") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario modificado con exito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nuevo_usuario").modal("hide");
                    tblUsuarios.ajax.reload();
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

function btnEditarUser(id) {
    document.getElementById("title").innerHTML = "Actualizar Usuario";
    document.getElementById("btnAction").innerHTML = "Modificar";

    const url = base_url + "Usuarios/editar/"+id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            document.getElementById("id").value = res.id;
            document.getElementById("documento").value = res.documento;
            document.getElementById("nombre1").value = res.nombre1;
            document.getElementById("nombre2").value = res.nombre2;
            document.getElementById("apellido1").value = res.apellido1;
            document.getElementById("apellido2").value = res.apellido2;
            document.getElementById("user").classList.add("d-none");
            document.getElementById("claves").classList.add("d-none");
            $("#nuevo_usuario").modal("show");
        }
    }
}

function btnEliminarUser(id) {
    Swal.fire({
        title: 'Esta seguro?',
        text: "No prodras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Usuarios/eliminar/"+id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje!',
                            'Usuario eliminado con exito',
                            'success'
                        )
                        tblUsuarios.ajax.reload();
                    } else {
                        Swal.fire(
                            'Mensaje!',
                            res,
                            'error'
                        )
                    }
                }
            }
        }
    })
}

function btnReingresarUser(id) {
    Swal.fire({
        title: 'Esta seguro?',
        text: "Reingresaras el usuario!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Usuarios/reingresar/"+id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje!',
                            'Usuario reingresado con exito',
                            'success'
                        )
                        tblUsuarios.ajax.reload();
                    } else {
                        Swal.fire(
                            'Mensaje!',
                            res,
                            'error'
                        )
                    }
                }
            }
        }
    })
}

// Fin Usuarios

function frmOrdenFarmacia() {
    document.getElementById("title").innerHTML = "Nueva Orden";
    document.getElementById("btnAction").innerHTML = "Crear";
    document.getElementById("frmOrden").classList.remove("d-none");
    document.getElementById("frmOrdenFarmacia").reset();
    $("#nueva_orden_farmacia").modal("show");
    document.getElementById("orden").value = "";
}

function frmAgregarItem() {
    document.getElementById("title").innerHTML = "Agregar Item";
    document.getElementById("btnAction").innerHTML = "Agregar";

    // document.getElementById("frmOrdenFarmacia").reset();
    const orden = document.getElementById("orden").value;
    if (orden == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error de programa, reinicia el programa',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        document.getElementById("medicamento").value = "";
        document.getElementById("laboratorio").value = "";
        document.getElementById("existentes").value = "";
        document.getElementById("cantidad").value = "";
        document.getElementById("tipo_cantidad").value = "";
        document.getElementById("valor_unidad").value = "";
        document.getElementById("iva").value = "";
        $("#nueva_orden_farmacia").modal("show");
    }
}

function frmObservacion() {
    const orden = document.getElementById("orden").value;
    if (orden == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error de programa, reinicia el programa',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        $("#nueva_observacion").modal("show");
    }
}

function crearObservacion(e) {
    e.preventDefault();
    const orden = document.getElementById("o-orden");
    const observacion = document.getElementById("observacion");
    if (orden.value == "" || observacion.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        const url = base_url + "OrdenFarmacia/crearObservacion";
        const frm = document.getElementById("frmObservacion");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "error") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al crear la observacion',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nueva_observacion").modal("hide");

                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Observacion creada con exito',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    let html = '';
                    html += `<div class="row">
                                <div class="col-11 mt-2">
                                    <fieldset disabled>
                                        <div class="form-floating">
                                            <div class="form-floating">
                                                <textarea class="form-control" placeholder="" id="m-observacion" name="m-observacion" style="height: 80px">${res}</textarea>
                                                <label for="m-observacion">Observacion</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>`;
                    document.getElementById("mostrar_observacion").innerHTML = html;
                    document.getElementById("btnObservacion").classList.add("d-none");
                    $("#nueva_observacion").modal("hide");

                }
            }
        }
    }
}

function tblItems() {
    const id = document.getElementById("orden").value;
    const url = base_url + "OrdenFarmacia/listar/"+id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            const respt = JSON.parse(this.responseText);
            let html = '';
            respt.forEach((row, i) => {
                html += `<tr>
                            <td>${i+1}</td>
                            <td>${row['medicamento']}</td>
                            <td>${row['laboratorio']}</td>
                            <td>${row['existente']}</td>
                            <td>${row['cantidad']}</td>
                            <td>${row['tipo_cantidad']}</td>
                            <td>${row['valor_unidad']}</td>
                            <td>${row['iva']}</td>
                            <td>${row['acciones']}</td>
                        </tr>`;
            });
            document.getElementById("tblItems").innerHTML = html;
        }
    }
}

function crearOrdenFarmacia(e) {
    e.preventDefault();
    const orden = document.getElementById("orden");
    const solicitante = document.getElementById("solicitante");
    const protocolo = document.getElementById("id_protocolo");
    const proveedor = document.getElementById("proveedor");
    const area = document.getElementById("area");
    const prioridad = document.getElementById("prioridad");
    const medicamento = document.getElementById("medicamento");
    const laboratorio = document.getElementById("laboratorio");
    const existentes = document.getElementById("existentes");
    const cantidad = document.getElementById("cantidad");
    const tipo_cantidad = document.getElementById("tipo_cantidad");
    const valor_unidad = document.getElementById("valor_unidad");
    const iva = document.getElementById("iva");
    // validar para crear nueva orden o agregar items
    if (orden.value == "") {
        if (solicitante.value == "" || proveedor.value == "" || area.value == "" || prioridad.value == "") {
            Swal.fire({
                icon: 'error',
                title: 'Todos los campos son obligatorios',
                showConfirmButton: false,
                timer: 3000
            })
        } else {
            if (medicamento.value == "" || laboratorio.value == "" || cantidad.value == "" || tipo_cantidad.value == "" || valor_unidad.value == "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Todos los campos son obligatorios',
                    showConfirmButton: false,
                    timer: 3000
                })
            } else {
                if (cantidad.value == 0 || valor_unidad.value == 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Valor o cantidad no pueden ser 0',
                        showConfirmButton: false,
                        timer: 3000
                    })
                } else {
                    const url = base_url + "OrdenFarmacia/crearOrden";
                    const frm = document.getElementById("frmOrdenFarmacia");
                    const http = new XMLHttpRequest();
                    http.open("POST", url, true);
                    http.send(new FormData(frm));
                    http.onreadystatechange = function(){
                        if (this.readyState == 4 && this.status == 200) {
                            const res = JSON.parse(this.responseText);
                            if (res == "error") {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error al crear la orden',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                                $("#nueva_orden_farmacia").modal("hide");

                            } else if (res == "existe") {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Orden repetida, recarga la pagina y vuelve a crear la orden',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                                $("#nueva_orden_farmacia").modal("hide");

                            } else if (res == "iva") {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Iva muy elevado',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                            } else {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Orden creada con exito',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                                document.getElementById("orden").value = res.id_orden;
                                document.getElementById("o-orden").value = res.id_orden;
                                document.getElementById("m-orden").value = res.id_orden;
                                document.getElementById("m-solicitante").value = res.solicitante;
                                document.getElementById("m-proveedor").value = res.razon_social;
                                document.getElementById("m-area").value = res.area + " (" + res.piso + ")";
                                document.getElementById("m-prioridad").value = res.prioridad;
                                document.getElementById("encabezado").classList.remove("d-none");
                                document.getElementById("btnAgregarItem").classList.remove("d-none");
                                document.getElementById("btnObservacion").classList.remove("d-none");
                                document.getElementById("btnTerminar").classList.remove("d-none");
                                document.getElementById("btnCrearOrden").classList.add("d-none");
                                document.getElementById("frmOrden").classList.add("d-none");
                                frm.reset();
                                $("#nueva_orden_farmacia").modal("hide");

                                tblItems();
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (medicamento.value == "" || laboratorio.value == "" || cantidad.value == "" || tipo_cantidad.value == "" || valor_unidad.value == "") {
            Swal.fire({
                icon: 'error',
                title: 'Todos los campos son obligatorios',
                showConfirmButton: false,
                timer: 3000
            })
        } else {
            if (cantidad.value == 0 || valor_unidad.value == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Valor o cantidad no pueden ser 0',
                    showConfirmButton: false,
                    timer: 3000
                })
            } else {
                const url = base_url + "OrdenFarmacia/agregarItem";
                const frm = document.getElementById("frmOrdenFarmacia");
                const http = new XMLHttpRequest();
                http.open("POST", url, true);
                http.send(new FormData(frm));
                http.onreadystatechange = function(){
                    if (this.readyState == 4 && this.status == 200) {
                        const res = JSON.parse(this.responseText);
                        if (res == "si") {
                            Swal.fire({
                                icon: 'success',
                                title: 'Item agregado',
                                showConfirmButton: false,
                                timer: 3000
                            })
                            $("#nueva_orden_farmacia").modal("hide");

                            tblItems();
                        } else if (res = "error") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Eror de programa, no existe esa orden',
                                showConfirmButton: false,
                                timer: 3000
                            })
                            $("#nueva_orden_farmacia").modal("hide");
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
}

function btnEditarItem() {
    Swal.fire({
        icon: 'info',
        title: 'Boton en fase de desarrollo',
        showConfirmButton: false,
        timer: 3000
    })
}

function btnEliminarItem(id) {
    Swal.fire({
        title: 'Esta seguro?',
        text: "No prodras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "OrdenFarmacia/eliminarItem/"+id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje!',
                            'Item eliminado con exito',
                            'success'
                        )
                        tblItems();
                    } else {
                        Swal.fire(
                            'Mensaje!',
                            res,
                            'error'
                        )
                    }
                }
            }
        }
    })
}

function terminar() {
    location.reload();
}

// fin orden farmacia

function btnReporte(orden) {
    Swal.fire({
        title: 'Generar PDF orden '+orden,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + 'VerOrdenes/generarPdf/'+orden;
            window.open(url);
        }
    })
}

function btnReporteMantenimiento(orden) {
    Swal.fire({
        title: 'Generar PDF orden '+orden,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + 'VerOrdenes/generarPdfMantenimiento/'+orden;
            window.open(url);
        }
    })
}

function btnEliminarOrden(orden) {
    Swal.fire({
        title: 'Esta seguro?',
        text: "Eliminaras la orden "+orden,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "VerOrdenes/eliminarOrden/"+orden;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje!',
                            'Orden eliminada con exito',
                            'success'
                        )
                        tblOrdenesUsuario.ajax.reload();
                    } else {
                        Swal.fire(
                            'Mensaje!',
                            res,
                            'error'
                        )
                    }
                }
            }
        }
    })
}

// fin ver orden usuario

function btnAuditar(orden) {
    Swal.fire({
        title: 'Auditar orden '+orden,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonColor: '#08D208',
        confirmButtonText: 'Aprobar',
        denyButtonText: `Rechazar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const url = base_url + "Auditar/aprobar/"+orden;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire('Aprobada!', '', 'success');
                        tblOrdenes.ajax.reload();
                    } else {
                        Swal.fire(
                            'Mensaje!',
                            res,
                            'error'
                        )
                    }
                }
            }
        } else if (result.isDenied) {
            const url = base_url + "Auditar/rechazar/"+orden;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire('Rechazada', '', 'info');
                        tblOrdenes.ajax.reload();
                    } else {
                        Swal.fire(
                            'Mensaje!',
                            res,
                            'error'
                        )
                    }
                }
            }
        }
    })
}

function btnVer(orden) {
    Swal.fire({
        title: 'Generar PDF orden '+orden,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + 'Auditar/generarPdf/'+orden;
            window.open(url);
        }
    })
}

function btnVerMant(orden) {
    Swal.fire({
        title: 'Generar PDF orden '+orden,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + 'Auditar/generarPdfMantenimiento/'+orden;
            window.open(url);
        }
    })
}

function btnVerAdmin(orden) {
    Swal.fire({
        title: 'Generar PDF orden '+orden,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + 'Auditar/generarPdfAdministracion/'+orden;
            window.open(url);
        }
    })
}

// Fin auditar

function registrarPermisos(e) {
    e.preventDefault();
    const url = base_url + "Usuarios/registrarPermiso";
    const frm = document.getElementById('formulario');
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send(new FormData(frm));
    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            if (res != '') {
                Swal.fire(
                    res.msg,
                    '',
                    res.icon
                )
            } else {
                Swal.fire(
                    'Error no identificado',
                    '',
                    'error'
                )
            }
        }
    }
}

// inicio orden mantenimiento

function frmObservacionMant() {
    const orden = document.getElementById("orden").value;
    if (orden == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error de programa, reinicia el programa',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        $("#nueva_observacionMant").modal("show");
    }
}

function crearObservacionMant(e) {
    e.preventDefault();
    const orden = document.getElementById("o-orden");
    const observacion = document.getElementById("observacionMant");
    if (orden.value == "" || observacion.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        const url = base_url + "OrdenMantenimiento/crearObservacion";
        const frm = document.getElementById("frmObservacionMant");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "error") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al crear la observacion',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nueva_observacionMant").modal("hide");

                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Observacion creada con exito',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    let html = '';
                    html += `<div class="row">
                                <div class="col-11 mt-2">
                                    <fieldset disabled>
                                        <div class="form-floating">
                                            <div class="form-floating">
                                                <textarea class="form-control" placeholder="" id="m-observacion" name="m-observacion" style="height: 80px">${res}</textarea>
                                                <label for="m-observacion">Observacion</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>`;
                    document.getElementById("mostrar_observacionMant").innerHTML = html;
                    document.getElementById("btnObservacionMant").classList.add("d-none");
                    $("#nueva_observacionMant").modal("hide");

                }
            }
        }
    }
}

function frmOrdenMantenimiento() {
    document.getElementById("title").innerHTML = "Nueva Orden";
    document.getElementById("btnAction").innerHTML = "Crear";
    document.getElementById("frmMantenimiento").classList.remove("d-none");
    document.getElementById("frmOrdenMantenimiento").reset();
    $("#nueva_orden_mantenimiento").modal("show");
    document.getElementById("orden").value = "";
}

function tblItemsMantenimiento() {
    const id = document.getElementById("orden").value;
    const url = base_url + "OrdenMantenimiento/listar/"+id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            const respt = JSON.parse(this.responseText);
            let html = '';
            respt.forEach((row, i) => {
                html += `<tr>
                            <td>${i+1}</td>
                            <td>${row['detalle']}</td>
                            <td>${row['tipo_item']}</td>
                            <td>${row['cantidad']}</td>
                            <td>${row['valor_unidad']}</td>
                            <td>${row['iva']}</td>
                            <td>${row['acciones']}</td>
                        </tr>`;
            });
            document.getElementById("tblItems").innerHTML = html;
        }
    }
}

function crearOrdenMantenimiento(e) {
    e.preventDefault();
    const orden = document.getElementById("orden");
    const solicitante = document.getElementById("solicitante");
    const proveedor = document.getElementById("proveedor");
    const area = document.getElementById("area");
    const prioridad = document.getElementById("prioridad");
    const tipo_actividad = document.getElementById("tipo_actividad");
    const horas_extras = document.getElementById("horas_extras");
    const detalle = document.getElementById("detalle");
    const tipo_item = document.getElementById("tipo_item");
    const cantidad = document.getElementById("cantidad");
    const valor_unidad = document.getElementById("valor_unidad");
    const iva = document.getElementById("iva");
    // validar para crear nueva orden o agregar items
    if (detalle.value == "" || tipo_item.value == "" || cantidad.value == "" || valor_unidad.value == "" || iva.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        if (cantidad.value == "0" || valor_unidad.value == "0") {
            Swal.fire({
                icon: 'error',
                title: 'Cantidad y valor unidad no pueden ser 0',
                showConfirmButton: false,
                timer: 3000
            })
        } else {
            if (orden.value == "") {
                if (solicitante.value == "" || proveedor.value == "" || area.value == "" || prioridad.value == "" || tipo_actividad.value == "" || horas_extras.value == "") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Todos los campos son obligatorios',
                        showConfirmButton: false,
                        timer: 3000
                    })
                } else {
                    // agregar orden nueva con un item
                    const url = base_url + "OrdenMantenimiento/crearOrden";
                    const frm = document.getElementById("frmOrdenMantenimiento");
                    const http = new XMLHttpRequest();
                    http.open("POST", url, true);
                    http.send(new FormData(frm));
                    http.onreadystatechange = function(){
                        if (this.readyState == 4 && this.status == 200) {
                            const res = JSON.parse(this.responseText);
                            if (res == "error") {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error al crear la orden',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                                $("#nueva_orden_mantenimiento").modal("hide");

                            } else if (res == "existe") {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Orden repetida, recarga la pagina y vuelve a crear la orden',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                                $("#nueva_orden_mantenimiento").modal("hide");

                            } else if (res == "iva") {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Iva muy elevado',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                            } else {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Orden creada con exito',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                                document.getElementById("orden").value = res.id_orden;
                                document.getElementById("m-orden").value = res.id_orden;
                                document.getElementById("o-orden").value = res.id_orden;
                                document.getElementById("a-orden").value = res.id_orden;
                                document.getElementById("m-solicitante").value = res.solicitante;
                                document.getElementById("m-proveedor").value = res.proveedor;
                                document.getElementById("m-area").value = res.area + " (" + res.piso + ")";
                                document.getElementById("m-prioridad").value = res.prioridad;
                                document.getElementById("encabezado").classList.remove("d-none");
                                document.getElementById("btnAgregarItem").classList.remove("d-none");
                                document.getElementById("btnObservacionMant").classList.remove("d-none");
                                document.getElementById("btnAgregarActividad").classList.remove("d-none");
                                document.getElementById("btnTerminar").classList.remove("d-none");
                                document.getElementById("btnCrearOrden").classList.add("d-none");
                                document.getElementById("frmMantenimiento").classList.add("d-none");
                                frm.reset();
                                $("#nueva_orden_mantenimiento").modal("hide");

                                tblItemsMantenimiento();
                                mostrarActividades();
                            }
                        }
                    }
                }
            } else {
                // agregar items
                const url = base_url + "OrdenMantenimiento/agregarItem";
                const frm = document.getElementById("frmOrdenMantenimiento");
                const http = new XMLHttpRequest();
                http.open("POST", url, true);
                http.send(new FormData(frm));
                http.onreadystatechange = function(){
                    if (this.readyState == 4 && this.status == 200) {
                        const res = JSON.parse(this.responseText);
                        if (res == "si") {
                            Swal.fire({
                                icon: 'success',
                                title: 'Items agregado',
                                showConfirmButton: false,
                                timer: 3000
                            })
                            $("#nueva_orden_mantenimiento").modal("hide");

                            tblItemsMantenimiento();
                        } else if (res = "error") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Eror de programa, no existe esa orden',
                                showConfirmButton: false,
                                timer: 3000
                            })
                            $("#nueva_orden_mantenimiento").modal("hide");
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
}

function mostrarActividades() {
    const orden = document.getElementById("orden").value;
    const url = base_url + "OrdenMantenimiento/listarActiviades/"+orden;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            const respt = JSON.parse(this.responseText);
            let html = '';
            if (respt == "") {
                html += `<div class="alert alert-warning mt-2" role="alert">
                            No has registrados actividades a esta orden
                        </div>`;
            } else {
                respt.forEach((row, i) => {
                    html += `<div class="row">
                                <fieldset disabled>
                                    <div class="form-group">
                                        <label for="${i+1}-actividadMant">Actividad ${i+1}</label>
                                        <input id="${i+1}-actividadMant" class="form-control" type="text" name="${i+1}-actividadMant" value="${row['actividad']}">
                                    </div>
                                </fieldset>
                            </div>`;
                });
            }
            document.getElementById("listaActividades").innerHTML = html;
        }
    }
}

function crearActividadMantenimiento(e) {
    e.preventDefault();
    const orden = document.getElementById("a-orden");
    const actividadMant = document.getElementById("actividadMant");
    if (actividadMant.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Ingrese una actividad',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        if (orden.value == "") {
            Swal.fire({
                icon: 'error',
                title: 'Error de programa',
                showConfirmButton: false,
                timer: 3000
            })
        } else {
            const url = base_url + "OrdenMantenimiento/agregarActividad";
            const frm = document.getElementById("frmActividadesMantenimiento");
            const http = new XMLHttpRequest();
            http.open("POST", url, true);
            http.send(new FormData(frm));
            http.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "si") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Actividad agregado',
                            showConfirmButton: false,
                            timer: 3000
                        })
                        $("#nueva_actividad_mantenimiento").modal("hide");

                        mostrarActividades();
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

function frmAgregarItemMantenimiento() {
    document.getElementById("title").innerHTML = "Agregar Item";
    document.getElementById("btnAction").innerHTML = "Agregar";

    // document.getElementById("frmOrdenFarmacia").reset();
    const orden = document.getElementById("orden").value;
    if (orden == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error de programa, reinicia el programa',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        document.getElementById("detalle").value = "";
        document.getElementById("tipo_item").value = "";
        document.getElementById("cantidad").value = "";
        document.getElementById("valor_unidad").value = "";
        document.getElementById("iva").value = "";
        $("#nueva_orden_mantenimiento").modal("show");
    }
}

function frmAgregarActividadMantenimiento() {
    document.getElementById("title_actividades").innerHTML = "Agregar Actividad";
    document.getElementById("btnAction").innerHTML = "Agregar";

    // document.getElementById("frmOrdenFarmacia").reset();
    const orden = document.getElementById("orden").value;
    if (orden == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error de programa, reinicia el programa',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        document.getElementById("actividadMant").value = "";
        $("#nueva_actividad_mantenimiento").modal("show");
    }
}

function btnEliminarItemMantenimiento(id) {
    Swal.fire({
        title: 'Esta seguro?',
        text: "No prodras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "OrdenAdministracion/eliminarItem/"+id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje!',
                            'Item eliminado con exito',
                            'success'
                        )
                        tblItems();
                    } else {
                        Swal.fire(
                            'Mensaje!',
                            res,
                            'error'
                        )
                    }
                }
            }
        }
    })
}

// scrips controlador Proveedores Mantenimiento

function frmProveedoresMant() {
    document.getElementById("title").innerHTML = "Nuevo Proveedor";
    document.getElementById("btnAction").innerHTML = "Registrar";
    document.getElementById("frmProveedoresMant").reset();
    $("#nuevo_proveedorMant").modal("show");
    document.getElementById("id").value = "";
}

function registrarProveedorMant(e) {
    e.preventDefault();
    const id = document.getElementById("id");
    const proveedorMant = document.getElementById("proveedorMant");
    const telefonoProv = document.getElementById("telefonoProv");
    const direccionProv = document.getElementById("direccionProv");
    const tipo = document.getElementById("tipo");
    if (proveedorMant.value == "" || telefonoProv.value == "" || direccionProv.value == "" || tipo.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        const url = base_url + "ProveedoresMant/crearProveedor";
        const frm = document.getElementById("frmProveedoresMant");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Proveedor registrado con exito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    frm.reset();
                    $("#nuevo_proveedorMant").modal("hide");
                    tblProveedoresMant.ajax.reload();
                } else if (res == "modificado") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Proveedor modificado con exito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nuevo_proveedorMant").modal("hide");
                    tblProveedoresMant.ajax.reload();
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

function btnEditarProveedorMant(id) {
    document.getElementById("title").innerHTML = "Actualizar Proveedor";
    document.getElementById("btnAction").innerHTML = "Modificar";

    const url = base_url + "ProveedoresMant/editar/"+id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            document.getElementById("id").value = res.id;
            document.getElementById("proveedorMant").value = res.proveedor;
            document.getElementById("telefonoProv").value = res.telefono;
            document.getElementById("direccionProv").value = res.direccion;
            document.getElementById("tipo").value = res.id_tipo_orden;
            $("#nuevo_proveedorMant").modal("show");
        }
    }
}

function btnEliminarProveedorMant(id) {
    Swal.fire({
        title: 'Esta seguro?',
        text: "No prodras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "ProveedoresMant/eliminar/"+id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje!',
                            'Proveedores eliminado con exito',
                            'success'
                        )
                        tblProveedoresMant.ajax.reload();
                    } else {
                        Swal.fire(
                            'Mensaje!',
                            res,
                            'error'
                        )
                    }
                }
            }
        }
    })
}

// scrips para crear detalles mantenimiento

function frmDetalleMant() {
    document.getElementById("title").innerHTML = "Nueva Detalle";
    document.getElementById("btnAction").innerHTML = "Crear";
    document.getElementById("frmDetalleMant").classList.remove("d-none");
    document.getElementById("frmDetalleMant").reset();
    $("#nuevo_detalleMant").modal("show");
    document.getElementById("id").value = "";
}

function registrarDetalleMant(e) {
    e.preventDefault();
    const id = document.getElementById("id");
    const detalleMant = document.getElementById("detalleMant");
    const tipo = document.getElementById("tipo");
    if (detalleMant.value == "" || tipo.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        const url = base_url + "DetallesMant/crearDetalle";
        const frm = document.getElementById("frmDetalleMant");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Detalle registrado con exito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    frm.reset();
                    $("#nuevo_detalleMant").modal("hide");
                    tblDetallesMant.ajax.reload();
                } else if (res == "modificado") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Detalle modificado con exito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nuevo_detalleMant").modal("hide");
                    tblDetallesMant.ajax.reload();
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

function btnEliminarDetalleMant(id) {
    Swal.fire({
        title: 'Esta seguro?',
        text: "No prodras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "DetallesMant/eliminar/"+id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje!',
                            'Detalle eliminado con exito',
                            'success'
                        )
                        tblDetallesMant.ajax.reload();
                    } else {
                        Swal.fire(
                            'Mensaje!',
                            res,
                            'error'
                        )
                    }
                }
            }
        }
    })
}

function btnEditarDetalleMant(id) {
    document.getElementById("title").innerHTML = "Actualizar Detalle";
    document.getElementById("btnAction").innerHTML = "Modificar";

    const url = base_url + "DetallesMant/editar/"+id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            document.getElementById("id").value = res.id;
            document.getElementById("detalleMant").value = res.detalle;
            document.getElementById("tipo").value = res.id_tipo_orden;
            $("#nuevo_detalleMant").modal("show");
        }
    }
}

// scrips para los laboratorios

function btnEliminarLaboratorio(id) {
    Swal.fire({
        title: 'Esta seguro?',
        text: "No prodras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Laboratorios/eliminar/"+id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje!',
                            'Laboratorio eliminado con exito',
                            'success'
                        )
                        tblLaboratorios.ajax.reload();
                    } else {
                        Swal.fire(
                            'Mensaje!',
                            res,
                            'error'
                        )
                    }
                }
            }
        }
    })
}

function frmLaboratorio() {
    document.getElementById("title").innerHTML = "Nueva Laboratorio";
    document.getElementById("btnAction").innerHTML = "Crear";
    document.getElementById("frmLaboratorio").classList.remove("d-none");
    document.getElementById("frmLaboratorio").reset();
    $("#nuevo_laboratorio").modal("show");
    document.getElementById("id").value = "";
}

function registrarLaboratorio(e) {
    e.preventDefault();
    const id = document.getElementById("id");
    const laboratorio = document.getElementById("laboratorio");
    if (laboratorio.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Debes digitar un laboratorio',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        const url = base_url + "Laboratorios/crearLaboratorio";
        const frm = document.getElementById("frmLaboratorio");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Laboratorio registrado con exito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    frm.reset();
                    $("#nuevo_laboratorio").modal("hide");
                    tblLaboratorios.ajax.reload();
                } else if (res == "modificado") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Laboratorio modificado con exito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nuevo_laboratorio").modal("hide");
                    tblLaboratorios.ajax.reload();
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

function btnEditarLaboratorio(id) {
    document.getElementById("title").innerHTML = "Actualizar Laboratorio";
    document.getElementById("btnAction").innerHTML = "Modificar";

    const url = base_url + "Laboratorios/editar/"+id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            document.getElementById("id").value = res.id;
            document.getElementById("laboratorio").value = res.laboratorio;
            $("#nuevo_laboratorio").modal("show");
        }
    }
}

// scrips para los medicamentos

function frmMedicamento() {
    document.getElementById("title").innerHTML = "Nueva Medicamentos";
    document.getElementById("btnAction").innerHTML = "Crear";
    document.getElementById("frmMedicamento").classList.remove("d-none");
    document.getElementById("frmMedicamento").reset();
    $("#nuevo_medicamento").modal("show");
    document.getElementById("id").value = "";
}

function registrarMedicamento(e) {
    e.preventDefault();
    const id = document.getElementById("id");
    const medicamento = document.getElementById("medicamentoFar");
    const rips = document.getElementById("rips");
    if (medicamento.value == "" || rips.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Debes digitar un medicamento',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        const url = base_url + "Medicamentos/crearMedicamento";
        const frm = document.getElementById("frmMedicamento");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Medicamento registrado con exito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    frm.reset();
                    $("#nuevo_medicamento").modal("hide");
                    tblMedicamentos.ajax.reload();
                } else if (res == "modificado") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Medicamento modificado con exito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nuevo_medicamento").modal("hide");
                    tblMedicamentos.ajax.reload();
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

// funciones para crear la orden de Administracion

function frmOrdenAdministracion() {
    document.getElementById("title").innerHTML = "Nueva Orden";
    document.getElementById("btnAction").innerHTML = "Crear";
    document.getElementById("frmOrden").classList.remove("d-none");
    document.getElementById("frmOrdenAdministracion").reset();
    $("#nueva_orden_administracion").modal("show");
    document.getElementById("orden").value = "";
}

function crearOrdenAdministracion(e) {
    e.preventDefault();
    const orden = document.getElementById("orden");
    const solicitante = document.getElementById("solicitante");
    const proveedor = document.getElementById("proveedor");
    const area = document.getElementById("area");
    const prioridad = document.getElementById("prioridad");
    const detalle = document.getElementById("detalle");
    const tipo_item = document.getElementById("tipo_item");
    const cantidad = document.getElementById("cantidad");
    const valor_unidad = document.getElementById("valor_unidad");
    const iva = document.getElementById("iva");
    // validar para crear nueva orden o agregar items
    if (detalle.value == "" || tipo_item.value == "" || cantidad.value == "" || valor_unidad.value == "" || iva.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        if (cantidad.value == "0" || valor_unidad.value == "0") {
            Swal.fire({
                icon: 'error',
                title: 'Cantidad y valor unidad no pueden ser 0',
                showConfirmButton: false,
                timer: 3000
            })
        } else {
            if (orden.value == "") {
                if (solicitante.value == "" || proveedor.value == "" || area.value == "" || prioridad.value == "") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Todos los campos son obligatorios',
                        showConfirmButton: false,
                        timer: 3000
                    })
                } else {
                    // agregar orden nueva con un item
                    const url = base_url + "OrdenAdministracion/crearOrden";
                    const frm = document.getElementById("frmOrdenAdministracion");
                    const http = new XMLHttpRequest();
                    http.open("POST", url, true);
                    http.send(new FormData(frm));
                    http.onreadystatechange = function(){
                        if (this.readyState == 4 && this.status == 200) {
                            const res = JSON.parse(this.responseText);
                            if (res == "error") {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error al crear la orden',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                                $("#nueva_orden_administracion").modal("hide");

                            } else if (res == "existe") {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Orden repetida, recarga la pagina y vuelve a crear la orden',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                                $("#nueva_orden_administracion").modal("hide");

                            } else if (res == "iva") {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Iva muy elevado',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                            } else {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Orden creada con exito',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                                document.getElementById("orden").value = res.id_orden;
                                document.getElementById("m-orden").value = res.id_orden;
                                document.getElementById("o-orden").value = res.id_orden;
                                document.getElementById("m-solicitante").value = res.solicitante;
                                document.getElementById("m-proveedor").value = res.razon_social;
                                document.getElementById("m-area").value = res.area + " (" + res.piso + ")";
                                document.getElementById("m-prioridad").value = res.prioridad;
                                document.getElementById("encabezado").classList.remove("d-none");
                                document.getElementById("btnAgregarItemAdmin").classList.remove("d-none");
                                document.getElementById("btnObservacionAdmin").classList.remove("d-none");
                                document.getElementById("btnTerminar").classList.remove("d-none");
                                document.getElementById("btnCrearOrden").classList.add("d-none");
                                document.getElementById("frmOrden").classList.add("d-none");
                                frm.reset();
                                $("#nueva_orden_administracion").modal("hide");

                                tblItemsAdministracion();
                            }
                        }
                    }
                }
            } else {
                // agregar items
                const url = base_url + "OrdenAdministracion/agregarItem";
                const frm = document.getElementById("frmOrdenAdministracion");
                const http = new XMLHttpRequest();
                http.open("POST", url, true);
                http.send(new FormData(frm));
                http.onreadystatechange = function(){
                    if (this.readyState == 4 && this.status == 200) {
                        const res = JSON.parse(this.responseText);
                        if (res == "si") {
                            Swal.fire({
                                icon: 'success',
                                title: 'Items agregado',
                                showConfirmButton: false,
                                timer: 3000
                            })
                            $("#nueva_orden_administracion").modal("hide");

                            tblItemsAdministracion();
                        } else if (res = "error") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Eror de programa, no existe esa orden',
                                showConfirmButton: false,
                                timer: 3000
                            })
                            $("#nueva_orden_administracion").modal("hide");
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
}

function tblItemsAdministracion() {
    const id = document.getElementById("orden").value;
    const url = base_url + "OrdenAdministracion/listar/"+id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            const respt = JSON.parse(this.responseText);
            let html = '';
            respt.forEach((row, i) => {
                html += `<tr>
                            <td>${i+1}</td>
                            <td>${row['detalle']}</td>
                            <td>${row['tipo_item']}</td>
                            <td>${row['cantidad']}</td>
                            <td>${row['valor_unidad']}</td>
                            <td>${row['iva']}</td>
                            <td>${row['acciones']}</td>
                        </tr>`;
            });
            document.getElementById("tblItems").innerHTML = html;
        }
    }
}

function frmAgregarItemAdmin() {
    document.getElementById("title").innerHTML = "Agregar Item";
    document.getElementById("btnAction").innerHTML = "Agregar";

    // document.getElementById("frmOrdenFarmacia").reset();
    const orden = document.getElementById("orden").value;
    if (orden == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error de programa, reinicia el programa',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        document.getElementById("detalle").value = "";
        document.getElementById("tipo_item").value = "";
        document.getElementById("cantidad").value = "";
        document.getElementById("valor_unidad").value = "";
        document.getElementById("iva").value = "";
        $("#nueva_orden_administracion").modal("show");
    }
}

function frmObservacionAdmin() {
    const orden = document.getElementById("orden").value;
    if (orden == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error de programa, reinicia el programa',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        $("#nueva_observacion_administracion").modal("show");
    }
}

function crearObservacionAdministracion(e) {
    e.preventDefault();
    const orden = document.getElementById("o-orden");
    const observacion = document.getElementById("observacion");
    if (orden.value == "" || observacion.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        const url = base_url + "OrdenAdministracion/crearObservacion";
        const frm = document.getElementById("frmObservacionAdministracion");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "error") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al crear la observacion',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nueva_observacion_administracion").modal("hide");

                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Observacion creada con exito',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    let html = '';
                    html += `<div class="row">
                                <div class="col-11 mt-2">
                                    <fieldset disabled>
                                        <div class="form-floating">
                                            <div class="form-floating">
                                                <textarea class="form-control" placeholder="" id="m-observacion" name="m-observacion" style="height: 80px">${res}</textarea>
                                                <label for="m-observacion">Observacion</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>`;
                    document.getElementById("mostrar_observacion").innerHTML = html;
                    document.getElementById("btnObservacionAdmin").classList.add("d-none");
                    $("#nueva_observacion_administracion").modal("hide");

                }
            }
        }
    }
}

function btnEliminarItemAdministracion(id) {
    Swal.fire({
        title: 'Esta seguro?',
        text: "No prodras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "OrdenAdministracion/eliminarItem/"+id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje!',
                            'Item eliminado con exito',
                            'success'
                        )
                        tblItems();
                    } else {
                        Swal.fire(
                            'Mensaje!',
                            res,
                            'error'
                        )
                    }
                }
            }
        }
    })
}

function btnReporteAdministracion(orden) {
    Swal.fire({
        title: 'Generar PDF orden '+orden,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + 'VerOrdenes/generarPdfAdministracion/'+orden;
            window.open(url);
        }
    })
}

// FUNCIONES PARA EL MODULO PROVEEDOR

// select municipio ASOCIADO
$(document).ready(function(e){
    $("#id_departamento").change(function () {
        var id = $("#id_departamento").val();
        $.ajax({
            // data: parametros,
            url: base_url + 'Proveedores/municipios/'+id,
            type: 'post',
            beforeSend: function () {
            },
            success: function (response) {
                $("#id_municipio").html(response);
            }
        });
    })
});

function frmRazonSocial() {
    document.getElementById("nombres").classList.add("d-none");
    document.getElementById("razonSocial").classList.remove("d-none");
    document.getElementById("tipoDoc").innerHTML = "NIT";
    document.getElementById("DV").classList.remove("d-none");
}

function frmNombres() {
    document.getElementById("nombres").classList.remove("d-none");
    document.getElementById("razonSocial").classList.add("d-none");
    document.getElementById("tipoDoc").innerHTML = "CC";
    document.getElementById("DV").classList.add("d-none");
}

function crearProveedor(e) {
    e.preventDefault();
    const documento = document.getElementById("documento");
    const id_departamento = document.getElementById("id_departamento");
    const id_municipio = document.getElementById("id_municipio");
    const direccion = document.getElementById("direccion");
    const telefono = document.getElementById("telefono");
    const email = document.getElementById("email");
    const id_clase = document.getElementById("id_clase");
    const id_regimt_contrib = document.getElementById("id_regimt_contrib");
    const id_forma_pago = document.getElementById("id_forma_pago");
    const repre_doc = document.getElementById("repre_doc");
    const repre_nom1 = document.getElementById("repre_nom1");
    const repre_apell1 = document.getElementById("repre_apell1");
    if (documento.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Documento vacio',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        if (id_departamento.value == "" || id_municipio.value == "" || direccion.value == "" || telefono.value == "" || email.value == "") {
            Swal.fire({
                icon: 'error',
                title: 'Campos de direccion o contacto estan sin llenar',
                showConfirmButton: false,
                timer: 3000
            })
        } else {
            if (id_clase.value == "" || id_regimt_contrib.value == "" || id_forma_pago.value == "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Campos legales estan sin llenar',
                    showConfirmButton: false,
                    timer: 3000
                })
            } else {
                if (repre_doc.value == "" || repre_nom1.value == "" || repre_apell1.value == "") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Datos representante vacios',
                        showConfirmButton: false,
                        timer: 3000
                    })
                } else {
                    const url = base_url + "Proveedores/crearProveedor";
                    const frm = document.getElementById("frmProveedores");
                    const http = new XMLHttpRequest();
                    http.open("POST", url, true);
                    http.send(new FormData(frm));
                    http.onreadystatechange = function(){
                        if (this.readyState == 4 && this.status == 200) {
                            const res = JSON.parse(this.responseText);
                            if (res == "si") {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Proveedor registrado con exito',
                                    showConfirmButton: false,
                                    timer: 3000
                                })
                                frm.reset();
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
    }
}

// editar proveedor

function btnEditarProveedor(id) {
    const url = base_url + "Proveedores/editar/"+id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            document.getElementById("id").value = res.id;
            document.getElementById("laboratorio").value = res.laboratorio;
            $("#modf_proveedor").modal("show");
        }
    }
}