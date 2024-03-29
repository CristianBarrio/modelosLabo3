<?php

require_once "../Backend/Clases/Usuario.php";

//funciona
if(isset($_GET["tabla"]) && $_GET["tabla"] === "mostrar")
{
    $retorno = "";
    
    $retorno = '<h1>Lista de usuarios</h1><br>';
    $retorno .= '<table border="1">
                    <tr>
                    <th>ID</th>
                    <th>Correo</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Acciones</th>
                    </tr>';
                    
    $usuarios = Usuario::TraerTodos();
    
    foreach($usuarios as $usuario)
    {
        $usuarioJson = json_encode($usuario);

        $retorno .= '<tr>';
        $retorno .= '<td>' . $usuario->id . '</td>';
        $retorno .= '<td>' . $usuario->correo . '</td>';
        $retorno .= '<td>' . $usuario->nombre . '</td>';
        $retorno .= '<td>' . $usuario->perfil . '</td>';
        //$retorno .= '<td><input type="button" value="Eliminar" class="btn-Eliminar" onclick="Manejadora.EliminarUsuario(' .json_encode($usuario) . ')"/>';
        $retorno .= '<td><input type="button" value="Eliminar"  class="btnEliminar" data-obj=' . $usuarioJson . ' />'; 
        $retorno .= '<input type="button" value="Modificar" class="btnModificar" data-obj=' . $usuarioJson . ' /></td>';
        $retorno .= '</tr>';
    }
    
    $retorno .= '</table>';
    
    echo $retorno;
}
else
{
    echo "Error al mostrar el listado de usuarios.";
}

?>