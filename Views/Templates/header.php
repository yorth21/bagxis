<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="<?php echo base_url; ?>Assets/css/reset.css" rel="stylesheet" />
    <link href="<?php echo base_url; ?>Assets/css/style__header.css" rel="stylesheet" />
    <link href="<?php echo base_url; ?>Assets/css/style__index.css" rel="stylesheet" />
    <link href="<?php echo base_url; ?>Assets/css/style__footer.css" rel="stylesheet" />
    <script src="<?php echo base_url; ?>Assets/js/library/jquery-3.6.3.js"></script>
    <link rel="shortcut icon" href="<?php echo base_url; ?>Img/bagxis/bolso.png">
    <title>Bagxis</title>
</head>

<body>
    <header class="header">
        <nav class="nav">
            <div class="nav__left">
                <h1 class="nav__h1">
                    <a href="<?php echo base_url; ?>Home" class="nav__logo">
                        <img class="nav__img" src="<?php echo base_url; ?>Img/bagxis/logo.svg" alt="Bagxis" title="Bagxis">
                    </a>
                </h1>
    
                <ul class="nav__menu">
                    <li class="nav__li">
                        <a href="<?php echo base_url; ?>Home" class="nav__a">Inicio</a>
                    </li>
                    <!-- <li class="nav__li">
                        <a href="" class="nav__a">Combos</a>
                    </li> -->
                    <li class="nav__li">
                        <a href="<?php echo base_url; ?>Productos/panelProductos/bolsos" class="nav__a">Bolsos</a>
                    </li>
                    <li class="nav__li">
                        <a href="<?php echo base_url; ?>Productos/panelProductos/carteras" class="nav__a">Carteras</a>
                    </li>
                </ul>
            </div>

            <div class="nav__rigth right">
                <ul class="right__ul">
                    <!-- <li class="right__li">
                        <a href="" class="right__a">
                            <img src="<?php echo base_url; ?>Img/icons/right/search.svg" alt="search" class="right__img">
                        </a>
                    </li> -->
                    <li class="right__li">
                        <a href="<?php echo base_url; ?>Productos/carrito" class="right__a">
                            <img src="<?php echo base_url; ?>Img/icons/right/cart.svg" alt="cart" class="right__img">
                        </a>
                    </li>
                    <li class="right__li rigth__perfil">
                        <button class="right__a right__a--perfil" id="btnPerfil" onclick="mostrarPerfil();">
                            <img src="<?php echo base_url; ?>Img/icons/right/user.svg" alt="user" class="right__img">
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    </header>

    <nav class="menu">
        <ul class="menu__ul">
        <li class="menu__li">
                <a href="<?php echo base_url; ?>Home" class="menu__a">
                    <div class="menu__div">
                        <img src="<?php echo base_url; ?>Img/icons/menu/home.svg" alt="Inicio" class="menu__img">
                    </div>
                    <h3 class="menu__h3">Inicio</h3>
                </a>
            </li>
            <!-- <li class="menu__li">
                <a href="" class="menu__a">
                    <div class="menu__div">
                        <img src="<?php echo base_url; ?>Img/icons/menu/tags.svg" alt="Combos" class="menu__img">
                    </div>
                    <h3 class="menu__h3">Combos</h3>
                </a>
            </li> -->
            <li class="menu__li">
                <a href="<?php echo base_url; ?>Productos/panelProductos/bolsos" class="menu__a">
                    <div class="menu__div">
                        <img src="<?php echo base_url; ?>Img/icons/menu/bag.svg" alt="Bolsos" class="menu__img">
                    </div>
                    <h3 class="menu__h3">Bolsos</h3>
                </a>
            </li>
            <li class="menu__li">
                <a href="<?php echo base_url; ?>Productos/panelProductos/carteras" class="menu__a">
                    <div class="menu__div">
                        <img src="<?php echo base_url; ?>Img/icons/menu/bolso.svg" alt="Carteras" class="menu__img">
                    </div>
                    <h3 class="menu__h3">Carteras</h3>
                </a>
            </li>
            <li class="menu__li">
                <button class="menu__a menu__a--iniciar" onclick="mostrarPerfil();">
                    <div class="menu__div">
                        <img src="<?php echo base_url; ?>Img/icons/menu/user.svg" alt="Perfil" class="menu__img">
                    </div>
                    <h3 class="menu__h3" id="textBtnPerfil">Iniciar</h3>
                </button>
            </li>
        </ul>
    </nav>

    <!-- Crear el modal para iniciar sesion -->
    <dialog class="login" id="loginDialog">
        <form class="login__form" method="dialog" id="frmLogin">
            <div class="login__row">
                <div class="login__img">
                    <img class="login__logo" src="<?php echo base_url; ?>Img/bagxis/logo.svg" alt="Bagxis" title="Bagxis">
                </div>
                <div class="login__col">
                    <h2 class="login__title">Iniciar sesión</h2>
                    <p class="login__text">Compra más rápido y revisa los detalles de tus compras.</p>
                </div>
                <button class="login__cerrar" id="loginCerrar" type="reset">
                    <img src="<?php echo base_url; ?>Img/icons/login/closed.svg" alt="cerrar" class="login__btncerrar" title="Cerrar">
                </button>
            </div>
            <div class="login__row">
                <div class="login__col">
                    <div class="login__group">
                        <label for="loginEmail" class="login__label">Correo electronico</label>
                        <input type="email" class="login__input" id="loginEmail" name="loginEmail" placeholder="Ingresa tu correo electronico">
                    </div>
                    <div class="login__group">
                        <label for="loginPass" class="login__label">Contraseña</label>
                        <input type="password" class="login__input" id="loginPass" name="loginPass" placeholder="Ingresa una contraseña">
                    </div>
                </div>
            </div>

            <div class="login__row login__row--warning">
                <div class="login__warnig">
                    <img class="login__iconwarnig" src="<?php echo base_url; ?>Img/icons/login/warning.svg" alt="Bagxis" title="Warning">
                </div>
                <p class="login__text login__text--warning" id="loginRes"></p>
            </div>

            <div class="login__row">
                <div class="login__col">
                    <button class="login__btn" id="loginIngresar" onclick="frmLogin(event);">Ingresar</button>
                    <a href="<?php echo base_url; ?>Login/registrarse" class="login__link">Crear cuenta</a>
                </div>
            </div>
        </form>
    </dialog>

    <!-- Espacio para que los demas elementos no se pongan debajo del navbar -->
    <main class="main">
        <!-- Vamos a meter los contenedores dentro del main -->


<!-- Se une con el contenido de las demas vistas -->

<!-- La pagina html termina en footer.php -->