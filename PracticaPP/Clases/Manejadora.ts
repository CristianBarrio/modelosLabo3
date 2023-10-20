
$(document).on("click", ".btnEliminar", function () {
    const usuarioJson = $(this).data("obj");
    Manejadora.EliminarUsuario(usuarioJson);
});
export class Manejadora
{
    //funciona
    public static AgregarUsuarioJSON()
    {
        let correo:string = (<HTMLInputElement>document.getElementById("correo")).value;
        let clave:string = (<HTMLInputElement>document.getElementById("clave")).value;
        let nombre:string = (<HTMLInputElement>document.getElementById("nombre")).value;
    
        let form : FormData = new FormData()
        form.append('correo', correo);
        form.append('clave', clave);
        form.append('nombre', nombre);
        let xhr : XMLHttpRequest = new XMLHttpRequest();
        xhr.open('POST', "./Backend/AltaUsuarioJSON.php", true);
        
        xhr.send(form);

        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === XMLHttpRequest.DONE)
            {
                if (xhr.status === 200) 
                {
                    console.log(xhr.responseText);
                    alert(xhr.responseText);
                } 
                else 
                {
                    console.error('Error: ', xhr.status);
                    alert('Error: '+ xhr.status);
                }
            }
        };
    }

    //funciona, cambiar por AJAX normal
    public static MostrarUsuariosJSON()
    {
        let url = "./Backend/ListadoUsuariosJSON.php";

        $.ajax({
            type:"get",
            url: url,
            dataType: "html"
        })
        .done(function(response)
        {
            let retorno = "Se muestra el listado de usuarios.";
            alert(retorno);
            console.log(retorno);

            let usuariosJson = JSON.parse(response);
            let tabla = document.createElement("table");
            
            let fila = tabla.insertRow(0);
            for(let item in usuariosJson[0])
            {
                if(usuariosJson[0].hasOwnProperty(item))
                {
                    let celda = document.createElement("th");
                    celda.innerHTML = item;
                    fila.appendChild(celda);
                }
            }

            usuariosJson.forEach((usuario:any, indice:any) => {
                let fila1 = tabla.insertRow(indice + 1);
                for(let item in usuario)
                {
                    if(usuario.hasOwnProperty(item))
                    {
                        let celda1 = fila1.insertCell();
                        celda1.innerHTML = String(usuario[item]);
                    }
                }
            });

            $("#divTabla").html(tabla);
        })
        .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
            let mensaje = jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown;
            alert(mensaje);
        }); 
    }

    //probar, falta boton
    public static VerificarUsuarioJSON()
    {
        let url = "./Backend/VerificarUsuarioJSON.php";

        let correo:any = $("#correo").val();
        let clave:any = $("#clave").val();
        
        let form:FormData = new FormData();
        form.append("usuario_json", JSON.stringify({"correo":correo, "clave": clave}));
        
        if(correo && clave)
        {
            $.ajax({
                type:"post",
                url: url,
                dataType: "json",
                processData: false,
                data: form
            })
            .done(rta =>{
                alert(rta);
                console.log(rta);
            })
            .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
                let mensaje = jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown;
                alert(mensaje);
                console.log(mensaje);
            });
        }
        else
        {
            alert("Formulario incompleto.");
        }
    }
    
    //funciona
    public static AgregarUsuario()
    {
        let correo:string = (<HTMLInputElement>document.getElementById("correo")).value;
        let clave:string = (<HTMLInputElement>document.getElementById("clave")).value;
        let nombre:string = (<HTMLInputElement>document.getElementById("nombre")).value;
        let id_perfil:string = (<HTMLInputElement>document.getElementById("cboPerfiles")).value;

    
        let form : FormData = new FormData()
        form.append('correo', correo);
        form.append('clave', clave);
        form.append('nombre', nombre);
        form.append('id_perfil', id_perfil);
        if(nombre && correo && clave && id_perfil)
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();
            xhr.open('POST', "./Backend/AltaUsuario.php", true);
            
            xhr.send(form);
    
            xhr.onreadystatechange = function()
            {
                if (xhr.readyState === XMLHttpRequest.DONE)
                {
                    if (xhr.status === 200) 
                    {
                        console.log(xhr.responseText);
                        alert(xhr.responseText);
                    } 
                    else 
                    {
                        console.error('Error: ', xhr.status);
                        alert('Error: '+ xhr.status);
                    }
                }
            };
        }
        else
        {
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
    public static MostrarUsuarios()
    {
        let url = "./Backend/ListadoUsuarios.php?tabla=mostrar";

        $.ajax({
            type:"get",
            url: url,
            dataType: "html"
        })
        .done(function(response)
        {
            let retorno = "Se muestra el listado de usuarios.";
            alert(retorno);
            console.log(retorno);
            $("#divTabla").html(response);
        })
        .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
            let mensaje = jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown;
            alert(mensaje);
        });  
    }

    public static ModificarUsuario(usuarioJson:any)
    {
        //let usuario:Entidades.Usuario = JSON.parse(usuarioJson);
        let form : FormData = new FormData();
        form.append("usuario_json", usuarioJson);

        let xhr : XMLHttpRequest = new XMLHttpRequest();
        xhr.open('POST', "./Backend/ModificarUsuario.php", true);
        
        xhr.send(form);

        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === XMLHttpRequest.DONE)
            {
                if (xhr.status === 200) 
                {
                    Manejadora.MostrarUsuarios();
                    console.log(xhr.responseText);
                    alert(xhr.responseText);
                } 
                else 
                {
                    console.error('Error: ', xhr.status);
                    alert('Error: '+ xhr.status);
                }
            }
        };
    }

    
    public static EliminarUsuario(usuarioJson:any)
    {  
        console.log(usuarioJson);
        let usuario:any = JSON.parse(usuarioJson);
        let form:FormData = new FormData();
        form.append("id", usuario.id.toString());
        form.append("accion", "borrar");

        let confirmacion = confirm(`¿Desea eliminar al usuario ${usuario.nombre} (${usuario.correo})?`);

        if(confirmacion)
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();
            xhr.open('POST', "./Backend/EliminarUsuario.php", true);
            
            xhr.send(form);
    
            xhr.onreadystatechange = function()
            {
                if (xhr.readyState === XMLHttpRequest.DONE)
                {
                    if (xhr.status === 200) 
                    {
                        Manejadora.MostrarUsuarios();
                        console.log(xhr.responseText);
                        alert(xhr.responseText);
                    } 
                    else 
                    {
                        console.error('Error: ', xhr.status);
                        alert('Error: '+ xhr.status);
                    }
                }
            };
        }
    }

    //funciona
    public static AgregarEmpleado()
    {
        let nombre:any = $("#nombre").val();
        let correo:any = $("#correo").val();
        let clave:any = $("#clave").val();
        let id_perfil:any = $("#cboPerfiles").val();
        let sueldo:any = $("#sueldo").val();
        let foto:any = $("#foto")[0];
        let form:FormData = new FormData();
       
        form.append("nombre", nombre);
        form.append("correo", correo);
        form.append("clave", clave);
        form.append("id_perfil", id_perfil);
        form.append("sueldo", sueldo);
        form.append("foto", foto.files[0]);
        
        if(nombre && correo && clave && id_perfil && sueldo && foto)
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();
            xhr.open('POST', "./Backend/AltaEmpleado.php", true);
            
            xhr.send(form);

            xhr.onreadystatechange = function()
            {
                if (xhr.readyState === XMLHttpRequest.DONE)
                {
                    if (xhr.status === 200) 
                    {
                        console.log(xhr.responseText);
                        alert(xhr.responseText);
                    } 
                    else 
                    {
                        console.error('Error: ', xhr.status);
                        alert('Error: '+ xhr.status);
                    }
                }
            };
        }
        else
        {
            alert("Formulario incompleto.");
        }
    }

    //funciona, cambiar por AJAX
    public static MostrarEmpleados()
    {
        let url = "./Backend/ListadoEmpleados.php?tabla=mostrar";

        $.ajax({
            type:"get",
            url: url,
            dataType: "html"
        })
        .done(function(response)
        {
            let retorno = "Se muestra el listado de empleados.";
            console.log(retorno);
            $("#divTablaEmpleados").html(response);
        })
        .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
            let mensaje = jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown;
            alert(mensaje);
        });  
    }

    public static EliminarEmpleado(empleadoJson:any)
    {
        let empleado:Entidades.Empleado = JSON.parse(empleadoJson);
        let form : FormData = new FormData();
        form.append("id", empleado.id.toString());
        form.append("accion", "borrar");
        let confirmacion = confirm(`¿Desea eliminar al usuario ${empleado.nombre} (${empleado.sueldo})?`);

        if(confirmacion)
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();
            xhr.open('POST', "./Backend/EliminarEmpleado.php", true);
            
            xhr.send(form);
    
            xhr.onreadystatechange = function()
            {
                if (xhr.readyState === XMLHttpRequest.DONE)
                {
                    if (xhr.status === 200) 
                    {
                        Manejadora.MostrarEmpleados();
                        console.log(xhr.responseText);
                        alert(xhr.responseText);
                    } 
                    else 
                    {
                        console.error('Error: ', xhr.status);
                        alert('Error: '+ xhr.status);
                    }
                }
            };
        }
    }


    public static ModificarEmpleado(empleadoJson:any)
    {
        let empleado:Entidades.Empleado = JSON.parse(empleadoJson);
        let form : FormData = new FormData();
        form.append("id", empleado.id.toString());
        form.append("accion", "borrar");

        let xhr : XMLHttpRequest = new XMLHttpRequest();
        xhr.open('POST', "./Backend/ModificarEmpleado.php", true);
        
        xhr.send(form);

        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === XMLHttpRequest.DONE)
            {
                if (xhr.status === 200) 
                {
                    Manejadora.MostrarEmpleados();
                    console.log(xhr.responseText);
                    alert(xhr.responseText);
                } 
                else 
                {
                    console.error('Error: ', xhr.status);
                    alert('Error: '+ xhr.status);
                }
            }
        };
    }
}
