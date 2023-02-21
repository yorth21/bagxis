<?php include "Views/Templates/header.php"; ?>

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

<!-- Script para el slider -->
<script>

  /* Funciones para el slider */
  const sliderContainer = document.getElementById('slider-container');
  const slider = document.getElementById('slider');
  // const buttonLeft = document.getElementById('button-left');
  // const buttonRight = document.getElementById('button-right');

  const sliderElements = document.querySelectorAll('.slider__element');

  const rootStyles = document.documentElement.style;

  let slideCounter = 0;
  let isInTransition = false;

  const DIRECTION = {
    RIGHT: 'RIGHT',
    LEFT: 'LEFT'
  };

  const getTransformValue = () =>
    Number(rootStyles.getPropertyValue('--slide-transform').replace('px', ''));

  const reorderSlide = () => {
    const transformValue = getTransformValue();
    rootStyles.setProperty('--transition', 'none');
    if (slideCounter === sliderElements.length - 1) {
      slider.appendChild(slider.firstElementChild);
      rootStyles.setProperty(
        '--slide-transform',
        `${transformValue + sliderElements[slideCounter].scrollWidth}px`
      );
      slideCounter--;
    } else if (slideCounter === 0) {
      slider.prepend(slider.lastElementChild);
      rootStyles.setProperty(
        '--slide-transform',
        `${transformValue - sliderElements[slideCounter].scrollWidth}px`
      );
      slideCounter++;
    }

    isInTransition = false;
  };

  const moveSlide = direction => {
    if (isInTransition) return;
    const transformValue = getTransformValue();
    rootStyles.setProperty('--transition', 'transform 1s');
    isInTransition = true;
    if (direction === DIRECTION.LEFT) {
      rootStyles.setProperty(
        '--slide-transform',
        `${transformValue + sliderElements[slideCounter].scrollWidth}px`
      );
      slideCounter--;
    } else if (direction === DIRECTION.RIGHT) {
      rootStyles.setProperty(
        '--slide-transform',
        `${transformValue - sliderElements[slideCounter].scrollWidth}px`
      );
      slideCounter++;
    }
  };



  // buttonRight.addEventListener('click', () => moveSlide(DIRECTION.RIGHT));
  // buttonLeft.addEventListener('click', () => moveSlide(DIRECTION.LEFT));

  slider.addEventListener('transitionend', reorderSlide);
  reorderSlide();

  setInterval(function() {
      moveSlide(DIRECTION.RIGHT);
      
  }, 5000);
</script>

<!-- SLIDE END -->

<!-- START - Contenido para los productos nuevos -->
<section class="new">
    <h1 class="new__title">Productos mas comprados</h1>
    <ul class="new__items" id="listaProductosNew">
        <!-- Productos cargados con el javascript -->
    </ul>
</section>

<!-- Script para mostrar los productos -->
<script>
  $(document).ready(function(e){ // Se ejecuta cuando todo el documento HTML este cargado
    // Funcion para cargar 4 items nuevos en la pantalla de inicio
    listaProductosNew();
  });

  const listaProductosNew = async () => {
    // Vamos a buscar los archivos nuevos al sistema
    const response = await fetch( base_url + 'Productos/newProductos')
    const data = await response.json();

    // Elemento lista en el html
    let listaProductosNew = document.getElementById("listaProductosNew");
    
    // Ciclo for para acceder a todos los items
    for (var producto of data) {
        // Acomodar las rutas para el link del procuto y la imagen
        const idprodt = base_url + 'Productos/producto/' + producto.idprodt;
        const img = base_url+  producto.img;
        // Ponerle puntos de mil al precio
        let precio =  parseInt(producto.precio);
        // Descuento
        let descuento = parseInt(producto.descuento);
        
        // Validar cuando haya descuento
        if (descuento > 0) {
          precioVenta = precio - (precio * (descuento / 100));
          precio = "$ " + precio.toLocaleString('es-ES');
          descuento = descuento + "%";
        } else {
          precioVenta = precio;
          precio = "";
          descuento = "";
        }

        precioVenta = Math.trunc(precioVenta);
        precioVenta = precioVenta.toLocaleString('es-ES');

        const elemento = `<li class="new__item">
                                <a href="${idprodt}" class="card">
                                    <img class="card__img" src="${img}" alt="Card image">
                                    <div class="card__content">
                                    <h2 class="card__precioAnterior">${precio}</h2>
                                        <div class="card__precio">
                                            <h2 class="card__title">$ ${precioVenta}</h2>
                                            <h2 class="card__descuento">${descuento}</h2>
                                        </div>
                                        <p class="card__text">${producto.producto}</p>
                                    </div>
                                </a>
                            </li>`;

        // Agregar los items a la lista
        listaProductosNew.insertAdjacentHTML("beforeend", elemento);
    }
  }
</script>



<?php include "Views/Templates/footer.php"; ?>