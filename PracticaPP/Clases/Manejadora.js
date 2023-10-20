"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manejadora = void 0;
$(document).on("click", ".btnEliminar", function () {
    const usuarioJson = $(this).data("obj");
    Manejadora.EliminarUsuario(usuarioJson);
});
class Manejadora {
    //funciona
    static AgregarUsuarioJSON() {
        let correo = document.getElementById("correo").value;
        let clave = document.getElementById("clave").value;
        let nombre = document.getElementById("nombre").value;
        let form = new FormData();
        form.append('correo', correo);
        form.append('clave', clave);
        form.append('nombre', nombre);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', "./Backend/AltaUsuarioJSON.php", true);
        xhr.send(form);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                    alert(xhr.responseText);
                }
                else {
                    console.error('Error: ', xhr.status);
                    alert('Error: ' + xhr.status);
                }
            }
        };
    }
    //funciona, cambiar por AJAX normal
    static MostrarUsuariosJSON() {
        let url = "./Backend/ListadoUsuariosJSON.php";
        $.ajax({
            type: "get",
            url: url,
            dataType: "html"
        })
            .done(function (response) {
            let retorno = "Se muestra el listado de usuarios.";
            alert(retorno);
            console.log(retorno);
            let usuariosJson = JSON.parse(response);
            let tabla = document.createElement("table");
            let fila = tabla.insertRow(0);
            for (let item in usuariosJson[0]) {
                if (usuariosJson[0].hasOwnProperty(item)) {
                    let celda = document.createElement("th");
                    celda.innerHTML = item;
                    fila.appendChild(celda);
                }
            }
            usuariosJson.forEach((usuario, indice) => {
                let fila1 = tabla.insertRow(indice + 1);
                for (let item in usuario) {
                    if (usuario.hasOwnProperty(item)) {
                        let celda1 = fila1.insertCell();
                        celda1.innerHTML = String(usuario[item]);
                    }
                }
            });
            $("#divTabla").html(tabla);
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
            let mensaje = jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown;
            alert(mensaje);
        });
    }
    //probar, falta boton
    static VerificarUsuarioJSON() {
        let url = "./Backend/VerificarUsuarioJSON.php";
        let correo = $("#correo").val();
        let clave = $("#clave").val();
        let form = new FormData();
        form.append("usuario_json", JSON.stringify({ "correo": correo, "clave": clave }));
        if (correo && clave) {
            $.ajax({
                type: "post",
                url: url,
                dataType: "json",
                processData: false,
                data: form
            })
                .done(rta => {
                alert(rta);
                console.log(rta);
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                let mensaje = jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown;
                alert(mensaje);
                console.log(mensaje);
            });
        }
        else {
            alert("Formulario incompleto.");
        }
    }
    //funciona
    static AgregarUsuario() {
        let correo = document.getElementById("correo").value;
        let clave = document.getElementById("clave").value;
        let nombre = document.getElementById("nombre").value;
        let id_perfil = document.getElementById("cboPerfiles").value;
        let form = new FormData();
        form.append('correo', correo);
        form.append('clave', clave);
        form.append('nombre', nombre);
        form.append('id_perfil', id_perfil);
        if (nombre && correo && clave && id_perfil) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', "./Backend/AltaUsuario.php", true);
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        alert(xhr.responseText);
                    }
                    else {
                        console.error('Error: ', xhr.status);
                        alert('Error: ' + xhr.status);
                    }
                }
            };
        }
        else {
            alert("Formulario incompleto.");
        }
    }
    // public static AgregarUsuario()
    // {
    //     let url = "./Backend/AltaUsuario.php";
    //     let nombre:any = $("#nombre").val();
    //     let correo:any = $("#correo").val();
    //     let clave:any = $("#clave").val();
    //     let id_perfil:any = $("#cboPerfiles").val();
    //     let form:FormData = new FormData();
    //     form.append("nombre", nombre);
    //     form.append("correo", correo);
    //     form.append("clave", clave);
    //     form.append("id_perfil", id_perfil);
    //     console.log(nombre);
    //     if(nombre && correo && clave && id_perfil)
    //     {
    //         $.ajax({
    //             type:"POST",
    //             url: url,
    //             dataType: "text",
    //             cache: false,
    //             processData: false,
    //             data: form
    //         })
    //         .done(rta =>{
    //             alert(rta);
    //             console.log(rta);
    //         })
    //         .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
    //             let mensaje = jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown;
    //             alert(mensaje);
    //             console.log(mensaje);
    //         });
    //     }
    //     else
    //     {
    //         alert("Formulario incompleto.");
    //     }
    // }
    //funciona, cambiar por AJAX
    static MostrarUsuarios() {
        let url = "./Backend/ListadoUsuarios.php?tabla=mostrar";
        $.ajax({
            type: "get",
            url: url,
            dataType: "html"
        })
            .done(function (response) {
            let retorno = "Se muestra el listado de usuarios.";
            alert(retorno);
            console.log(retorno);
            $("#divTabla").html(response);
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
            let mensaje = jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown;
            alert(mensaje);
        });
    }
    static ModificarUsuario(usuarioJson) {
        //let usuario:Entidades.Usuario = JSON.parse(usuarioJson);
        let form = new FormData();
        form.append("usuario_json", usuarioJson);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', "./Backend/ModificarUsuario.php", true);
        xhr.send(form);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    Manejadora.MostrarUsuarios();
                    console.log(xhr.responseText);
                    alert(xhr.responseText);
                }
                else {
                    console.error('Error: ', xhr.status);
                    alert('Error: ' + xhr.status);
                }
            }
        };
    }
    static EliminarUsuario(usuarioJson) {
        console.log(usuarioJson);
        let usuario = JSON.parse(usuarioJson);
        let form = new FormData();
        form.append("id", usuario.id.toString());
        form.append("accion", "borrar");
        let confirmacion = confirm(`¿Desea eliminar al usuario ${usuario.nombre} (${usuario.correo})?`);
        if (confirmacion) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', "./Backend/EliminarUsuario.php", true);
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        Manejadora.MostrarUsuarios();
                        console.log(xhr.responseText);
                        alert(xhr.responseText);
                    }
                    else {
                        console.error('Error: ', xhr.status);
                        alert('Error: ' + xhr.status);
                    }
                }
            };
        }
    }
    //funciona
    static AgregarEmpleado() {
        let nombre = $("#nombre").val();
        let correo = $("#correo").val();
        let clave = $("#clave").val();
        let id_perfil = $("#cboPerfiles").val();
        let sueldo = $("#sueldo").val();
        let foto = $("#foto")[0];
        let form = new FormData();
        form.append("nombre", nombre);
        form.append("correo", correo);
        form.append("clave", clave);
        form.append("id_perfil", id_perfil);
        form.append("sueldo", sueldo);
        form.append("foto", foto.files[0]);
        if (nombre && correo && clave && id_perfil && sueldo && foto) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', "./Backend/AltaEmpleado.php", true);
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        alert(xhr.responseText);
                    }
                    else {
                        console.error('Error: ', xhr.status);
                        alert('Error: ' + xhr.status);
                    }
                }
            };
        }
        else {
            alert("Formulario incompleto.");
        }
    }
    //funciona, cambiar por AJAX
    static MostrarEmpleados() {
        let url = "./Backend/ListadoEmpleados.php?tabla=mostrar";
        $.ajax({
            type: "get",
            url: url,
            dataType: "html"
        })
            .done(function (response) {
            let retorno = "Se muestra el listado de empleados.";
            console.log(retorno);
            $("#divTablaEmpleados").html(response);
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
            let mensaje = jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown;
            alert(mensaje);
        });
    }
    static EliminarEmpleado(empleadoJson) {
        let empleado = JSON.parse(empleadoJson);
        let form = new FormData();
        form.append("id", empleado.id.toString());
        form.append("accion", "borrar");
        let confirmacion = confirm(`¿Desea eliminar al usuario ${empleado.nombre} (${empleado.sueldo})?`);
        if (confirmacion) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', "./Backend/EliminarEmpleado.php", true);
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        Manejadora.MostrarEmpleados();
                        console.log(xhr.responseText);
                        alert(xhr.responseText);
                    }
                    else {
                        console.error('Error: ', xhr.status);
                        alert('Error: ' + xhr.status);
                    }
                }
            };
        }
    }
    static ModificarEmpleado(empleadoJson) {
        let empleado = JSON.parse(empleadoJson);
        let form = new FormData();
        form.append("id", empleado.id.toString());
        form.append("accion", "borrar");
        let xhr = new XMLHttpRequest();
        xhr.open('POST', "./Backend/ModificarEmpleado.php", true);
        xhr.send(form);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    Manejadora.MostrarEmpleados();
                    console.log(xhr.responseText);
                    alert(xhr.responseText);
                }
                else {
                    console.error('Error: ', xhr.status);
                    alert('Error: ' + xhr.status);
                }
            }
        };
    }
}
exports.Manejadora = Manejadora;
//# sourceMappingURL=Manejadora.js.map