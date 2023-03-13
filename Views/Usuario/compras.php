<?php include "Views/Templates/header.php"; ?>
<!-- Vista compras -->

<!-- Mostrar las compras -->
<section class="cart__container">
    <div class="cart__content">
        <div class="cart__title cart__title--compras">
            <h1 class="cart__h1">Mis compras</h1>
        </div>
        <!-- Preguntar si tiene datos en el carrito -->
        <?php if (empty($data)) { ?>
            <!-- Mostrar que no tiene datos -->
            <div class="cart__row--content">
                <p class="cart__sinProductos">
                    No tienes ninguna compra registrada
                </p>
            </div>
        <?php } else { ?>
            <!-- Carrito comprado -->
            <?php foreach ($data as $carrito) { ?>
                <div class="compras">
                    <div class="cart__title">
                        <h3 class="cart__h1 cart__h1--fecha">Factura</h3>
                    </div>
                    <!-- Producto de un carrito -->
                    <?php $total = 0;
                    foreach ($carrito as $producto) { ?>
                        <div class="cart__row cart__row--content">
                            <div class="compras__row">
                                <div class="compras__col">
                                    <h3 class="compras__producto"><?php echo $producto['producto']; ?></h3>
                                </div>
                                <div class="compras__col">
                                    <div class="compras__row compras__row--right">
                                        <span class="compras__span compras__span--title">Cantidad:</span>
                                        <span class="compras__span"><?php echo $producto['cantidad']; ?></span>
                                    </div>
                                </div>
                                <!-- Acomodar los valores y el descuento -->
                                <div class="compras__col">
                                    <div class="compras__row compras__row--right">
                                        <?php if ($producto['descuento'] > 0) { ?>
                                            <span class="compras__porcentaje"><?php echo $producto['descuento']; ?>%</span>
                                        <?php } ?>
                                        <?php
                                            $precio = $producto['precio'] * $producto['cantidad'];
                                            $precio = $precio - ($precio * ($producto['descuento'] / 100));
                                            $total += $precio;
                                        ?>
                                        <span class="compras__precio"><?php echo number_format($precio, 0, ',', '.'); ?></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php } // Cerrar for producto?>
                    <div class="cart__total">
                        <span class="cart__total--span cart__total--mr1">Total: $ <?php echo number_format($total, 0, ',', '.'); ?></span>
                    </div>
                <?php } // Cerrar for carrito?>
            </div>
        <?php } // Cerrar el else ?>
    </div>
</section>


<?php include "Views/Templates/footer.php"; ?>