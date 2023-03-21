<?php include "Views/Templates/header.php"; ?>
<!-- Vista registrarse -->

<section class="perfil__container">
    <div class="perfil__content">
        <div class="perfil__title">
            <h1 class="perfil__h1">Mis datos</h1>
        </div>
        <div class="perfil__row">
            <div class="perfil__col perfil__col--30">Documento</div>
            <div class="perfil__col">CC <?php echo $data['cedula']; ?></div>
        </div>
        <div class="perfil__row">
            <div class="perfil__col perfil__col--30">Nombre y apellido</div>
            <div class="perfil__col"><?php echo $data['nombres']." ".$data['apellidos']; ?></div>
        </div>
        <div class="perfil__row">
            <div class="perfil__col perfil__col--30">Direccion</div>
            <div class="perfil__col"><?php echo $data['departamento'].", ".$data['municipio'].", ".$data['direccion']; ?></div>
        </div>
        <div class="perfil__row">
            <div class="perfil__col perfil__col--30">Telefono</div>
            <div class="perfil__col"><?php echo $data['telefono']; ?></div>
        </div>
        <div class="perfil__row">
            <div class="perfil__col perfil__col--30">E-mail</div>
            <div class="perfil__col"><?php echo $data['email']; ?></div>
        </div>
    </div>
</section>

<?php include "Views/Templates/footer.php"; ?>