<?php
require_once "../Backend/Clases/Empleado.php";

//funciona
if(isset($_POST["correo"], $_POST["clave"], $_POST["nombre"], $_POST["id_perfil"], $_FILES["foto"], $_POST["sueldo"]))
{
    $correo = $_POST["correo"];
    $clave = $_POST["clave"];
    $nombre = $_POST["nombre"];
    $id_perfil = $_POST["id_perfil"];
    $foto = $_FILES["foto"]["name"];
    $sueldo = $_POST["sueldo"];

    $extensionFoto = pathinfo($foto, PATHINFO_EXTENSION);
    $pathFoto = $nombre . "." . date("His") . "." . $extensionFoto;
    if(is_writable("./Empleados/Fotos"))
    {
        move_uploaded_file($_FILES["foto"]["tmp_name"], "./Empleados/Fotos/" . $pathFoto);
    }
    $empleado = new Empleado(null, $nombre, $correo, $clave, $id_perfil, $pathFoto, $sueldo);
    $exito = $empleado->Agregar();

    $retorno = array("exito" => $exito,
    "mensaje" => $exito ? "Empleado agregado con éxito." : "Error al agregar el empleado.");

    echo json_encode($retorno);
}
else
{
    $retorno = array("exito" => false,
    "mensaje" => "Error al agregar el empleado.");

    echo json_encode($retorno);
}

?>