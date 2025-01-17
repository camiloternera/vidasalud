<?php
    require(dirname(dirname(dirname(__FILE__))).'\backend\includes\checkSesion.php');
    require(dirname(dirname(dirname(__FILE__))).'\backend\includes\permisos\permiso_medico.php');
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/medico.css">
    <link rel="stylesheet" href="icons/fontawesome/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300&display=swap" rel="stylesheet">

    <title>SaludVida</title>
</head>
<body>
    <!-- dashboard -->
    <div class="ContainerDashB">
        <!-- Parte de abajo -->
        <div class="DashFoot">
            <div class="DashFootItem">
                <img src="img/undraw_doctors_hwty.svg" alt="">
            </div>
        </div>
        <!-- Parte de arriba -->
        <div class="DashContent">
            
            <div class="DashLogo">
                <a href="medico.php">
                    <i class="color-logo fas fa-plus"></i>
                    <span id="colorA">Salud</span><span id="colorC">Vida</span>
                </a>
            </div>

            <div class="DashBItem">
                <div class="icons">
                    <a href=""> <i class="fas fa-calendar-alt"></i></a>
                </div>
                <p>Consultar citas</p> 
            </div>
            <ul class="submenu__ConsulCitas">
                <li class="submenu__ConsulCitas-item"><a href="#">Ver cita</a></li>
                <li class="submenu__ConsulCitas-item"><a href="#">Historial de citas</a></li>
               
            </ul>
 
            <div class="DashBItem">
                <div class="icons">
                    <a href=""><i class="far fa-calendar-plus"></i></a>
                </div>
                <p>Agregar citas</p>
            </div>
            <ul class="submenu__citas">
                <li class="submenu__cita-item"><a href="#">Solicitar cita</a></li>               
            </ul>
         

            <div class="DashBItem">
                <div class="icons">
                    <a href=""> <i class="far fa-calendar-times"></i></a>
                </div>
                <p>Eliminar citas</p>
            </div>
            <ul class="submenu__infoPersonal">
                <li class="submenu__infoPersonal-item"><a href="#">Cancelar cita</a></li>      
            </ul>

            <div class="DashBItem">
                <div class="icons">
                    <a href=""> <i class="far fa-id-card"></i></a>
                </div>
                <p>Consultar pacientes</p>
            </div>
            <ul class="submenu__ConsulPacientes">
                <li class="submenu__ConsulPacientes-item"><a href="#">Buscar información</a></li>
                <li class="submenu__ConsulPacientes-item"><a href="#">Pacientes actuales</a></li>
                <li class="submenu__ConsulPacientes-item"><a href="#">Historial de pacientes</a></li>
            </ul>
            
            
        </div>

    </div>