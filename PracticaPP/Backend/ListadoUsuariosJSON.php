<?php

require_once "../Backend/Clases/Usuario.php";
//corregir el alta de archivo json 
//$usuarios[] =  Usuario::TraerTodosJson();
//foreach($usuarios as $usuario)
//}
//{
if($_SERVER["REQUEST_METHOD"] === "GET")
{
    $usuario = Usuario::TraerTodosJson();
    echo json_encode($usuario) . "\n";
}
else
{
    echo "Error al encontrar el listado.";
}

?>