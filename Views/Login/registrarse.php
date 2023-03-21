<?php include "Views/Templates/header.php"; ?>
<!-- Vista registrarse -->

<section class="regis__container">
    <div class="regis__content">
        <form id="frmRegistrar" class="regis__form">
            <div class="regis__head">
                <h2 class="regis__title">Registrate</h2>
                <p class="regis__text">
                    Ingresa tus datos personales y disfruta de una experiencia de compra más rápida.
                </p>
            </div>
            <div class="regis__row">
                <div class="regis__group regis__group--cedula">
                    <label for="cedula" class="regis__label">Cedula</label>
                    <input type="text" class="regis__input" id="cedula" name="cedula" placeholder="Ingresa tu cedula">
                </div>
            </div>
            <div class="regis__row">
                <div class="regis__group">
                    <label for="nombres" class="regis__label">Nombres</label>
                    <input type="text" class="regis__input" id="nombres" name="nombres" placeholder="Ingresa tus nombres">
                </div>
                <div class="regis__group">
                    <label for="apellidos" class="regis__label">Apellidos</label>
                    <input type="text" class="regis__input" id="apellidos" name="apellidos" placeholder="Ingresa tus apellidos">
                </div>
            </div>
            <div class="regis__row">
                <div class="regis__group">
                    <label for="departamento" class="regis__label">Departamento</label>
                    <select class="regis__select" name="departamento" id="departamento">
                        <option class="regis__option" value="" selected>Seleccione...</option>
                        <?php foreach ($data['departamentos'] as $row) { ?>
                            <option value="<?php echo $row['iddepto']; ?>"><?php echo $row['departamento']; ?></option>
                        <?php } ?>
                    </select>
                </div>
                <div class="regis__group">
                    <label for="municipio" class="regis__label">Municipio</label>
                    <select class="regis__select" name="municipio" id="municipio">
                        <option class="regis__option" value="" selected>Seleccione...</option>
                    </select>
                </div>
            </div>
            <div class="regis__row">
                <div class="regis__group">
                    <label for="direccion" class="regis__label">Direccion</label>
                    <input type="text" class="regis__input" id="direccion" name="direccion" placeholder="Ingresa tu direccion">
                </div>
                <div class="regis__group">
                    <label for="telefono" class="regis__label">Telefono</label>
                    <input type="text" class="regis__input" id="telefono" name="telefono" placeholder="Ingresa tu telefono">
                </div>
            </div>

            <div class="regis__row">
                <div class="regis__group">
                    <label for="email" class="regis__label">Correo electronico</label>
                    <input type="text" class="regis__input" id="email" name="email" placeholder="Ingresa tu correo electronico">
                </div>
                <div class="regis__group">
                    <label for="pass" class="regis__label">Contraseña</label>
                    <input type="password" class="regis__input" id="pass" name="pass" placeholder="Ingresa una contraseña">
                </div>
            </div>

            <div class="regis__row regis__row--tyc">
                <label for="tyc" class="regis__label regis__label--tyc">Acepto los terminos y condiciones</label>
                <input type="checkbox" id="tyc" class="regis__check">
            </div>

            <div class="regis__row">
                <div class="g-recaptcha" data-sitekey="6LeSHxolAAAAAOCfnr-Iz8Dy6Qey0mO33ne2gjgw">
                    
                </div>
            </div>

            <div class="regis__row regis__row--btn">
                <button class="regis__btn" id="btnRegistrarse" type="button" onclick="frmRegistrar(event);">Registrar</button>
            </div>
        </form>
    </div>
</section>

<?php include "Views/Templates/footer.php"; ?>