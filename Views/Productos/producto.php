<?php include "Views/Templates/header.php"; ?>

<!-- Contenido para mostrar el producto -->

<section class="prodt__container">
    <div class="prodt__content">
        <div class="prodt__row">
            <div class="prodt__col prodt__col--img">
                <img src="<?php echo base_url; echo $data['img']; ?>" alt="Producto" class="prodt__img">
            </div>
            <div class="prodt__col prodt__col--text">
                <div class="prodt__row prodt__row--marca">
                    <p class="prodt__marca">Marca: <?php echo $data['marca']; ?></p>
                    <p class="prodt__marca">Modelo: <?php echo $data['modelo']; ?></p>
                </div>
                <div class="prodt__row">
                    <h1 class="prodt__nombre"><?php echo $data['producto']; ?></h1>
                </div>
                <div class="prodt__col prodt__row--precio">
                    <?php if ($data['precioAnterior'] != $data['precioDescuento']) { ?>
                        <h2 class="prodt__precioAnterior">$ <?php echo $data['precioAnterior']; ?></h2>
                    <?php } ?>
                    <div class="prodt__row">
                        <h2 class="prodt__precio">$ <?php echo $data['precioDescuento']; ?></h2>
                        <h3 class="prodt__descuento"><?php echo $data['descuento']; ?></h3>
                    </div>
                </div>
                <div class="prodt__row">
                    <p class="prodt__p"><?php echo $data['tipo']; ?> color <?php echo $data['color']; ?></p>
                </div>
                <div class="prodt__row">
                    <div class="prodt__col">
                        <p class="prodt__p prodt__p--title">Descripcion:</p>
                        <p class="prodt__p"><?php echo $data['descripcion']; ?></p>
                    </div>
                </div>
                <div class="prodt__row">
                    <form id="frmProducto" class="prodt__form">
                        <p class="prodt__p--title">Stock</p>
                        <label for="prodtCantidad" class="prodt__label">Cantidad: <span class="prodt__span">(disponibles: <?php echo $data['cantidad']; ?>)</span></label>
                        <input type="hidden" name="prodtId" id="prodtId" value="<?php echo $data['idprodt']; ?>">
                        <input type="hidden" name="prodtStock" id="prodtStock" value="<?php echo $data['cantidad']; ?>">
                        <?php if ($data['cantidad'] > 0) { ?>
                            <input type="text" class="prodt__input" name="prodtCantidad" id="prodtCantidad" value="1">
                        <?php } ?>
                    </form>
                </div>
                <?php if ($data['cantidad'] > 0) { ?>
                    <div class="prodt__row prodt__row--btn">
                        <div class="prodt__col prodt__col--btn">
                            <!-- <button class="prodt__btn">Comprar ahora</button> -->
                            <button class="prodt__btn prodt__btn--cart" onclick="frmAddCarrito();">Agregar al carrito</button>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </div>
        
    </div>
</section>
<script>
    // Obtener una referencia al campo de entrada
    const campoNumerico = document.getElementById("prodtCantidad");
    const stock = document.getElementById("prodtStock").value;

    // Escuchar el evento "input" del campo
    campoNumerico.addEventListener("input", function(event) {
    // Obtener el valor actual del campo
    var valor = event.target.value;

    // Eliminar cualquier caracter que no sea un número
    valor = valor.replace(/[^\d]/g, "");

    // Limitar el valor máximo a 1000
    if (parseInt(valor) > stock) {
        valor = stock;
    }

    // Asignar el nuevo valor al campo
    event.target.value = valor;
    });

    /* ------------------------------------------------
       Funciones para agregar el producto al carrito
    ------------------------------------------------ */
    const frmAddCarrito = async () => {
        // Obtenemos la informacion del formulario
        const form = document.getElementById("frmProducto");
        // Crea un objeto para almacenar los valores
        const formData = {};

        // Recorre todos los elementos del formulario
        for (let i = 0; i < form.elements.length; i++) {
            const element = form.elements[i];

            // Agrega el valor del elemento al objeto
            formData[element.name] = element.value;
        }

        const response = await fetch( base_url + 'Login/datosSesion');
        const datosUser = await response.json();
        if (datosUser == "!sesion") {
            alert('info', 'Inicie sesion para continuar');
            return;
        }

        // Hacemos un objeto con los datos para mandarle al servidor
        let datos = {
            cedula: datosUser.cedula,
            idprodt: formData.prodtId,
            cantidad: formData.prodtCantidad
        }

        // Convertirlo en una cadena JSON
        datos = JSON.stringify(datos);

        const responsePost = await fetch(base_url + 'Productos/addCarrito', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: datos
        });

        const res = await responsePost.json();
        // Hacer validaciones y mostrar alerta de acuerdo al resultado
        if (res == "ok") {
            alert('success', 'Producto agregado al carrito con exito');
        } else {
            alert('error', res);
        }
    };

</script>
 
<!-- Fin del contenido para mostrar el producto -->

<?php include "Views/Templates/footer.php"; ?>