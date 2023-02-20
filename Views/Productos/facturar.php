<?php include "Views/Templates/header.php"; ?>

<!-- Contenido para mostrar el producto -->

<section class="fact__container">
    <div class="fact__content">
        <div class="fact__row fact__row--sb">
            <div class="fact__col fact__col--formaPago">
                <h1 class="fact__h1">¿Como quieres pagar?</h1>
                <form class="fact__form">
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
                </form>
                <div class="fact__comprar">
                    <button class="fact__pagar">Comprar</button>
                </div>
            </div>
            <div class="fact__col fact__col--30">
                <h2 class="fact__h2">Resumen de compra</h2>
                <div class="fact__row fact__row--detalles">
                    <span class="fact__span">Productos (99)</span>
                    <span class="fact__span">$ 999.999</span>
                </div>
                <div class="fact__row fact__row--detalles">
                    <span class="fact__span">Envio</span>
                    <span class="fact__span fact__span--secondary">Gratis</span>
                </div>
                <div class="fact__row fact__row--total">
                    <span class="fact__span fact__span--max">Pagas: </span>
                    <span class="fact__span fact__span--max">$9999999</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Fin del contenido para mostrar el producto -->

<?php include "Views/Templates/footer.php"; ?>