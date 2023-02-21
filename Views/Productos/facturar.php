<?php include "Views/Templates/header.php"; ?>

<!-- Contenido para mostrar el producto -->

<section class="fact__container">
    <div class="fact__content">
        <div class="fact__row fact__row--sb">
            <div class="fact__col fact__col--formaPago">
                <h1 class="fact__h1">¿Como quieres pagar?</h1>
                <form class="fact__form" id="frmFormaPago">
                    <div class="fact__group">
                        <input type="radio" class="fact__input" name="formaPago" id="efectivo" value="1">
                        <label for="efectivo" class="fact__label">
                            Pago en efectivo con Efecty
                        </label>
                    </div>
                    <div class="fact__group">
                        <input type="radio" class="fact__input" name="formaPago" id="PSE" value="2">
                        <label for="PSE" class="fact__label">
                            Transferencia desde tu banco con PSE
                        </label>
                    </div>
                    <div class="fact__group">
                        <input type="radio" class="fact__input" name="formaPago" id="tarjeta" value="3">
                        <label for="tarjeta" class="fact__label">
                            Tarjeta de crédito o débito
                        </label>
                    </div>
                    <div class="fact__comprar">
                        <button class="fact__pagar" onclick="facturarProductos(event);">Comprar</button>
                    </div>
                </form>
            </div>
            <div class="fact__col fact__col--30">
                <h2 class="fact__h2">Resumen de compra</h2>
                <div class="fact__row fact__row--detalles">
                    <span class="fact__span">Productos (<?php echo $data['productos']; ?>)</span>
                    <span class="fact__span">$ <?php echo $data['total']; ?></span>
                </div>
                <div class="fact__row fact__row--detalles">
                    <span class="fact__span">Envio</span>
                    <span class="fact__span fact__span--secondary">Gratis</span>
                </div>
                <div class="fact__row fact__row--total">
                    <span class="fact__span fact__span--max">Pagas: </span>
                    <span class="fact__span fact__span--max">$ <?php echo $data['total']; ?></span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Funciones javascript -->
<script>
    // Funcion para facturar los productos
    function facturarProductos(e) {
        e.preventDefault();
        // obtenemos el input selecionado
        const form = document.getElementById("frmFormaPago");
        const opciones = form.elements.formaPago;
        let formaPago = 0;

        for (let i = 0; i < opciones.length; i++) {
            if (opciones[i].checked) {
                formaPago = opciones[i].value;
            }
        }

        // Validar si ha selecionado alguna forma de pago
        if (formaPago == 0) {
            alert('info', 'seleciona una forma de pago');
            return;
        }

        facturar(formaPago);
    }

    // Funcion para enviar la señal de facturar al servidor
    const facturar = async ( formaPago ) => {
        // Hacemos un objeto con los datos para mandarle al servidor
        let datos = {
            formaPago: formaPago,
        }

        // Convertirlo en una cadena JSON
        datos = JSON.stringify(datos);

        const responsePost = await fetch(base_url + 'Productos/facturarProductos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: datos
        });

        const res = await responsePost.json();
        // Hacer validaciones y mostrar alerta de acuerdo al resultado
        if (res == "ok") {
            alert('success', 'Compra completada con exito');
            setTimeout(() => {
                location.href = base_url;
            }, 3000);
        } else {
            alert('error', res);
        }
    }

</script>

<!-- Fin del contenido para mostrar el producto -->

<?php include "Views/Templates/footer.php"; ?>