<?php
require_once "../Backend/Clases/Empleado.php";

//funciona
if(isset($_GET["tabla"]) && $_GET["tabla"] === "mostrar")
{   
    $retorno = '<h1>Lista de empleados</h1>';
    $retorno .= '<table border="1">
                    <tr>
                        <th>ID</th>
                        <th>Correo</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Sueldo</th>
                        <th>Foto</th>
                    </tr>';
    
    $empleados = Empleado::TraerTodos();
    
    foreach($empleados as $empleado)
    {
        $empleadoJson = json_encode($empleado);
        $retorno .= '<tr>';
        $retorno .= '<td>' . $empleado->id . '</td>';
        $retorno .= '<td>' . $empleado->correo . '</td>';
        $retorno .= '<td>' . $empleado->nombre . '</td>';
        $retorno .= '<td>' . $empleado->perfil . '</td>';
        $retorno .= '<td>' . $empleado->sueldo . '</td>;';
        $retorno .= '<td>' . $empleado->foto . '</td>;';
        //$retorno .= '<td><img src="' . $empleado->foto . '" alt="Foto de ' . $empleado->nombre . ' ." width="50px" height="50px"></td>';
        if($empleado->foto != "")
        {
            //if(file_exists("".$empleado->foto)) {
            $retorno .=  '<td><img src=./Backend/Empleados/Fotos/'. $empleado->foto . ' alt="Foto de ' . $empleado->nombre . '" height="50px" width="50px"></td>'; 
            //}else{
                //}
        }else
        {
            $retorno .= 'No hay imagen guardada en '. $empleado->foto; 
        }
        $retorno .= '<td><input type="button" value="Eliminar"  class="btnEliminar" data-obj=' . $empleadoJson . ' />'; 
        $retorno .= '<input type="button" value="Modificar" class="btnModificar" data-obj=' . $empleadoJson . ' /></td>';
        $retorno .= '</tr>';
    }
    
    $retorno .= '</table>';
    
    echo $retorno;
}
else
{
    echo "Error al mostrar el listado de empleados.";
}

?>