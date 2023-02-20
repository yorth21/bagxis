<?php include "Views/Templates/header.php"; ?>

<!-- Contenido para mostrar el producto -->

<section class="cart__container">
    <div class="cart__content">
        <div class="cart__title">
            <h1 class="cart__h1">Carrito</h1>
        </div>
        <!-- Preguntar si tiene datos en el carrito -->
        <?php if (empty($data)) { ?>
            <!-- Mostrar que no tiene datos -->
            <div class="cart__row--content">
                <p class="cart__sinProductos">
                    Carrito sin productos
                </p>
            </div>
        <?php } else {
            // Variable para guardar el precio total
            $total = 0;
            // Mostrar los datos del carrito
            // Ciclo para recorrer todos los productos
            foreach ($data as $producto) { ?>
                <!-- Codigo HTML para mostrar la informacion -->
                <div class="cart__row cart__row--content">
                    <div class="cart__row cart__row--50">
                        <div class="cart__imagen">
                            <img src="<?php echo base_url; echo $producto['img']; ?>" alt="Producto" class="cart__img">
                        </div>

                        <div class="cart__col">
                            <a href="<?php echo base_url; ?>Productos/producto/<?php echo $producto['idprodt']; ?>">
                                <h2 class="cart__nombre"><?php echo $producto['producto']; ?></h2>
                            </a>
                            <h3 class="cart__datosProdt"><?php echo $producto['tipo']; ?> color <?php echo $producto['color']; ?></h3>
                            <div class="cart__row cart__row--btn">
                                <button class="cart__del" onclick="eliminarProductoLista(<?php echo $producto['idcarrito']; ?>, <?php echo $producto['idprodt']; ?>);">Eliminar</button>
                                <!-- <button class="cart__comprarAhora">Comprar ahora</button> -->
                            </div>
                        </div>
                    </div>

                    <div class="cart__row cart__row--50 cart__row--sb">
                        <div class="cart__col cart__col--auto">
                            <span class="cart__span cart__span--title">Cantidad: <?php echo $producto['cantidad']; ?></span>
                            <span class="cart__span cart__span--mini">Disponible (<?php echo $producto['stock']; ?>)</span>
                        </div>
                        <div class="cart__col cart__col--auto">
                            <div class="cart__row">
                                <span class="cart__porcentaje">
                                <?php
                                    // Validar si tiene descuento o no
                                    $descuento = $producto['descuento'];
                                    $precioAnterior = $producto['precio'];
                                    if ($descuento == 0) {
                                        // valor del total
                                        $newPrecio = $precioAnterior * $producto['cantidad'];
                                        $precioAnterior = "";
                                        echo "";
                                    } else {
                                        $precioAnterior = $precioAnterior * $producto['cantidad'];
                                        // Validar el precio que quedario con descuento
                                        $newPrecio = $precioAnterior - ($precioAnterior * ($descuento / 100));

                                        $precioAnterior = "$ ".number_format($precioAnterior, 0, ',', '.');
                                        echo $descuento."%";
                                    }
                                ?>
                                </span>
                                <span class="cart__precioAnterios"><?php echo $precioAnterior; ?></span>
                            </div>
                            <span class="cart__precio">$
                                <?php  
                                    $total = $total + $newPrecio;
                                    $precio = number_format($newPrecio, 0, ',', '.');
                                    echo $precio;
                                ?>
                            </span>
                        </div>
                    </div>
                </div>
        <?php } // Cierra el ciclo ?> 
            <div class="cart__total">
                <span class="cart__total--span cart__total--mr1">Total a pagar: </span>
                <span class="cart__total--span">$ <?php echo number_format($total, 0, ',', '.'); ?></span>
            </div>
    
            <div class="cart__btn">
                <a href="<?php echo base_url; ?>Productos/facturar" class="cart__comprar">Comprar todo</a>
            </div>
        <?php } // Cierra el else ?>

    </div>
</section>

<!-- Funciones javaScript -->
<script>
    // Funcion para eliminar producto del carrito
    const eliminarProductoLista = async ( idCart, idProdt ) => {
        // Hacemos un objeto con los datos para mandarle al servidor
        let datos = {
            idCart: idCart,
            idProdt: idProdt
        }

        // Convertirlo en una cadena JSON
        datos = JSON.stringify(datos);

        const responsePost = await fetch(base_url + 'Productos/delProductoLista', {
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