<?php

    class UsuarioModel extends Query
    {
        private $idProducto, $cedula;
        public function __construct()
        {
            parent::__construct();
        }

        public function getCarritosComprados(string $cedula)
        {
            $sql = "SELECT idcarrito FROM carritos WHERE cedula = '$cedula' AND estado = 0";
            $data = $this->selectAll($sql);
            return $data;
        }

        public function getProductosComprados(string $idcarrito)
        {
            $sql = "SELECT lt.carrito, lt.cantidad, lt.precio, lt.descuento, pdt.producto, pdt.idprodt FROM lista lt
                    JOIN productos pdt ON pdt.idprodt = lt.producto
                    WHERE lt.carrito = '$idcarrito' AND lt.estado = 1";
            $data = $this->selectAll($sql);
            return $data;
        }

        public function getUser(string $cedula)
        {
            $sql = "SELECT user.cedula, user.nombres, user.apellidos, depto.departamento, muncp.municipio, user.telefono, user.direccion, user.email  
                    FROM usuarios user
                    JOIN departamentos depto ON depto.iddepto = user.departamento
                    JOIN municipios muncp ON muncp.idmunicipio = user.municipio
                    WHERE user.cedula = '$cedula'";
            $data = $this->select($sql);
            return $data;
        }
    
    }

?>