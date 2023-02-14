<?php include "Views/Templates/header.php"; ?>

<!-- Contenido principal -->
<!-- <section class="bienvenida__container">
    <div class="bienvenida__content">
        <div class="bienvenida__title">
            <h2 class="bienvenida__text">Bienvenidxs</h2>
        </bienvenida>
    </div>
</section> -->

<!-- SLIDE START -->
<div id="slider-container" class="slider-container">
    <div class="slider" id="slider">
        <div class="slider__element">
          <img
            class="selider__img"
            src="<?php echo base_url; ?>Img/assets/slider/slider1.jpg"
            alt="Slider"
          />
        </div>
        <div class="slider__element">
          <img
            class="selider__img"
            src="<?php echo base_url; ?>Img/assets/slider/slider2.jpg"
            alt="Slider"
          />
        </div>
        <div class="slider__element">
          <img
            class="selider__img"
            src="<?php echo base_url; ?>Img/assets/slider/slider3.jpg"
            alt="Slider"
          />
        </div>
    </div>
</div>
<!-- <div class="slider-buttons">
    <button id="button-left" class="button">&lt;</button>
    <button id="button-right" class="button">&gt;</button>
</div> -->
<!-- SLIDE END -->

<!-- START - Contenido para los productos nuevos -->
<section class="new">
    <h1 class="new__title">Productos mas comprados</h1>
    <ul class="new__items">
        <li class="card">
            <img class="card__img" src="<?php echo base_url; ?>Img/assets/bag1.jpg" alt="Card image">
            <div class="card__content">
                <h2 class="card__title">Título de la tarjeta</h2>
                <p class="card__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sed aliquam veritatis nam magni possimus esse!</p>
            </div>
        </li>
        <li class="card">
            <img class="card__img" src="<?php echo base_url; ?>Img/assets/bag2.jpg" alt="Card image">
            <div class="card__content">
                <h2 class="card__title">Título de la tarjeta</h2>
                <p class="card__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sed aliquam veritatis nam magni possimus esse!</p>
            </div>
        </li>
        <li class="card">
            <img class="card__img" src="<?php echo base_url; ?>Img/assets/bag3.jpg" alt="Card image">
            <div class="card__content">
                <h2 class="card__title">Título de la tarjeta</h2>
                <p class="card__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sed aliquam veritatis nam magni possimus esse!</p>
            </div>
        </li>
        <li class="card">
            <img class="card__img" src="<?php echo base_url; ?>Img/assets/bag4.jpg" alt="Card image">
            <div class="card__content">
                <h2 class="card__title">Título de la tarjeta</h2>
                <p class="card__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sed aliquam veritatis nam magni possimus esse!</p>
            </div>
        </li>
    </ul>
</section>


<?php include "Views/Templates/footer.php"; ?>