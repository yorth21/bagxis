<?php

    class Usuario extends Controller
    {

        public function __construct()
        {
            session_start();

            // cargar construct de la isntancia
            parent::__construct();
        }
        public function session()
        {
            if (empty($_SESSION['activo'])) {
                header("location: ".base_url);
            }
        }

        /* Funciones para llamar a las vistas */
        public function index()
        {
            // Enviar a la vista principal en esta caso no tendria
            $this->views->getView($this, "index");
        }
        public function perfil()
        {
            $this->session();
            // Traer informacion del usuario
            $cedula = $_SESSION['cedula'];
            $data = $this->model->getUser($cedula);

            // Enviar a la vista principal en esta caso no tendria
            $this->views->getView($this, "perfil", $data);
        }
        public function compras()
        {
            $this->session();
            // Consultar informacion para mandar a la vista
            $carritos = $this->model->getCarritosComprados($_SESSION['cedula']);
            // Traer los productos por carrito
            for ($i = 0; $i < count($carritos); $i++) { 
                $data[$i] = $this->model->getProductosComprados($carritos[$i]['idcarrito']);
            }

            // Enviar a la vista principal en esta caso no tendria
            $this->views->getView($this, "compras", $data);
        }

    }

?>