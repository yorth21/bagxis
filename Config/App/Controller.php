<?php

    class Controller
    {
        public function __construct()
        {
            $this->views = new Views();
            $this->cargarModelo();
        }
        public function cargarModelo()
        {
            $model = get_class($this)."Model";
            $ruta = "Models/".$model.".php";
            if (file_exists($ruta)) {
                require_once $ruta;
                $this->model = new $model();
            }
        }
    }

?>