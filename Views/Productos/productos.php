<?php include "Views/Templates/header.php"; ?>

<!-- Contenido para mostrar el producto -->

<section class="new new--70vh">
    <h1 class="new__title"><?php echo ucfirst($data[0]['tipo']); // ucfirts hace la primera letra mayuscula ?>s</h1>
    <ul class="new__items" id="">
        <!-- Hacer ciclo para mostrar todos los bolsos -->
        <?php foreach ($data as $producto) { ?>
        <li class="new__item">
            <a href="<?php echo base_url; ?>Productos/producto/<?php echo $producto['idprodt']; ?>" class="card">
                <img class="card__img" src="<?php echo base_url; echo $producto['img']; ?>" alt="Card image">
                <?php if ($producto['cantidad'] == 0) { ?>
                    <img src="<?php echo base_url; ?>/Img/bagxis/agotado.png" alt="Agotado" class="card__agotado">
                <?php } ?>
                <div class="card__content">
                    <?php
                        // Validar si tiene descuento o no
                        $descuento = $producto['descuento'];
                        $precioAnterior = $producto['precio'];
                        if ($descuento == 0) {
                            // valor del total
                            $newPrecio = $precioAnterior;
                            $precioAnterior = "";
                            $descuento = "";
                        } else {
                            // Validar el precio que quedario con descuento
                            $newPrecio = $precioAnterior - ($precioAnterior * ($descuento / 100));
                            $precioAnterior = "$ ".number_format($precioAnterior, 0, ',', '.');
                            $descuento = $descuento."%";
                        }
                    ?>
                    <h2 class="card__precioAnterior"><?php echo $precioAnterior; ?></h2>
                    <div class="card__precio">
                        <h2 class="card__title">$ <?php echo number_format($newPrecio, 0, ',', '.'); ?></h2>
                        <h2 class="card__descuento"><?php echo $descuento; ?></h2>
                    </div>
                    <p class="card__text"><?php echo $producto['producto']; ?></p>
                </div>
            </a>
        </li>
        <?php } ?>
    </ul>
</section>

<!-- Fin del contenido para mostrar el producto -->

<?php include "Views/Templates/footer.php"; ?>