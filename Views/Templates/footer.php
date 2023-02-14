    <!-- Se une con el contenido de las demas vistas -->
    
    <!-- El header esta en header.php -->

    </main>

    <footer class="footer">
        <div class="footer__container">
            <div class="footer__listas">
                <ul class="footer__ul">
                    <li class="footer__li">
                        <h3 class="footer__h3">Contacto</h3>
                    </li>
                    <li class="footer__li">
                        <p class="footer__p">Pasto, Nariño, Colombia</p>
                    </li>
                    <li class="footer__li">
                        <a href="" class="footer__a">
                            <img src="<?php echo base_url; ?>Img/icons/footer/telefono.svg" alt="telefono" class="footer__icon">
                            <span class="footer__span">+573186623144</span>
                        </a>
                    </li>
                    <li class="footer__li">
                        <a href="" class="footer__a">
                            <img src="<?php echo base_url; ?>Img/icons/footer/mail.svg" alt="correo" class="footer__icon">
                            <span class="footer__span">valee2508@gmail.com</span>
                        </a>
                    </li>
                </ul>
                <ul class="footer__ul">
                    <li class="footer__li">
                        <h3 class="footer__h3">Menu</h3>
                    </li>
                    <li class="footer__li">
                        <a href="#" class="footer__a">
                            Inicio
                        </a>
                    </li>
                    <li class="footer__li">
                        <a href="#" class="footer__a">
                            Combos
                        </a>
                    </li>
                    <li class="footer__li">
                        <a href="#" class="footer__a">
                            Bolsos
                        </a>
                    </li>
                    <li class="footer__li">
                        <a href="#" class="footer__a">
                            Carteras
                        </a>
                    </li>
                </ul>
                <ul class="footer__ul">
                    <li class="footer__li">
                        <h3 class="footer__h3">Redes sociales</h3>
                    </li>
                    <li class="footer__li redes">
                        <a href="#" class="redes__a">
                            <div class="redes__circulo">
                                <div class="redes__img">
                                    <img src="<?php echo base_url; ?>Img/icons/footer/instagram.svg" alt="Instagram" class="redes__icon">
                                </div>
                            </div>
                        </a>
                        <a href="#" class="redes__a">
                            <div class="redes__circulo">
                                <div class="redes__img">
                                    <img src="<?php echo base_url; ?>Img/icons/footer/facebook.svg" alt="Instagram" class="redes__icon">
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="footer__copyright">
                <p class="footer__p">Copyright © 2023 Todos los derechos reservados - BAGXIS</p>
                <p class="footer__p">Desarrollado por <a href="" class="footer__link">Yorth21</a></p>
            </div>
        </div>
    </footer>
    <script>
        const base_url = "<?php echo base_url; ?>";
    </script>
    <script src="<?php echo base_url; ?>Assets/js/library/sweetalert2.all.min.js"></script>
    <script src="<?php echo base_url; ?>Assets/js/funciones.js"></script>
    <script src="<?php echo base_url; ?>Assets/js/login.js"></script>
</body>
</html>