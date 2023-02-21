<?php

    class ProductosModel extends Query
    {
        private $idProducto;
        public function __construct()
        {
            parent::__construct();
        }

        // Funciones para traer datos de la base de datos
        public function getNewProductos()
        {
            $sql = "SELECT * FROM productos ORDER BY idprodt DESC LIMIT 4;";
            $data = $this->selectAll($sql);
            return $data;
        }

        public function getProducto(int $idProducto)
        {
            $sql = "SELECT * FROM productos WHERE idprodt = '$idProducto' AND estado = 1";
            $data = $this->select($sql);
            return $data;
        }

        public function getProductosTipo(string $tipo)
        {
            $sql = "SELECT * FROM productos WHERE tipo = '$tipo' AND estado = 1";
            $data = $this->selectAll($sql);
            return $data;
        }

        public function getProductosCarrito($idCarrito)
        {
            $sql = "SELECT prodt.idprodt, cart.idcarrito, lst.idlista, prodt.img, prodt.producto, prodt.tipo, prodt.color, lst.cantidad, prodt.cantidad stock, prodt.descuento, prodt.precio, lst.estado  FROM lista lst 
                    JOIN productos prodt ON lst.producto = prodt.idprodt
                    JOIN carritos cart ON lst.carrito = cart.idcarrito
                    WHERE cart.idcarrito = '$idCarrito' AND lst.estado = 1";
            $data = $this->selectAll($sql);
            return $data;
        }

        public function getCarrito(string $cedula)
        {
            $sql = "SELECT idcarrito FROM carritos WHERE cedula = '$cedula' AND estado = 1";
            $data = $this->select($sql);
            return $data;
        }

        public function getListaProducto(int $idcarrito, int $idprodt)
        {
            $sql = "SELECT * FROM lista WHERE carrito = '$idcarrito' AND producto = '$idprodt' AND estado = 1";
            $data = $this->select($sql);
            return $data;
        }

        // Funcion para agregar el producto al carrito
        public function addProducto(array $post_data)
        {
            // Hacer el SQL para agregar el producto
            $sql = "INSERT INTO lista (carrito, producto, cantidad)
                     VALUES (?,?,?)";
            $data = array($post_data['idcarrito'], $post_data['idprodt'], $post_data['cantidad']);
            $res = $this->save($sql, $data);
            return $res;
        }

        // Funcion para agregar mas unidades al carrito
        public function sumarProducto(int $idlista, int $cantidad)
        {
            // Hacer el SQL para sumar el producto
            $sql = "UPDATE lista SET cantidad = ? WHERE idlista = ?";
            $data = array($cantidad, $idlista);
            $res = $this->save($sql, $data);
            return $res;
        }

        // Funcion para eliminar un producto de una lista
        public function delProductoLista(int $idcart, int $idprodt)
        {
            $sql = "UPDATE lista SET estado = 0 WHERE carrito = ? AND producto = ?";
            $data = array($idcart, $idprodt);
            $res = $this->save($sql, $data);
            return $res;
        }

        public function facturarProductos(array $factura, int $idcarrito, int $cedula, array $productos)
        {
            // Iniciamos transacion
            $this->startTransaction(); // begin

            $sql = "INSERT INTO facturas (carrito, total, formapago)
                    VALUES (?,?,?)";
            $data = array($factura['idcarrito'], $factura['total'], $factura['formaPago']);
            $res1 = $this->save($sql, $data);
            // Validar si se ejecuto bien
            if ($res1 == 0) {
                // Terminanos la transacion
                $res = $this->submitTransaction(false);
                return false;
            }

            // actualizar el estado del carrito
            $sql = "UPDATE carritos SET estado = 0 WHERE idcarrito = ?";
            $data = array($idcarrito);
            $res2 = $this->save($sql, $data);
            if ($res2 == 0) {
                // Terminanos la transacion
                $res = $this->submitTransaction(false);
                return false;
            }

            // Crear un carrito nuevo para el cliente
            $sql = "INSERT INTO carritos (cedula) VALUES (?)";
            $datos = array($cedula);
            $res3 = $this->save($sql, $datos);
            if ($res3 == 0) {
                // Terminanos la transacion
                $res = $this->submitTransaction(false);
                return false;
            }

            // Restar la cantidad a todos los productos comprados
            foreach ($productos as $producto) {
                $sql = "UPDATE productos SET cantidad = cantidad - ? WHERE idprodt = ?";
                $data = array($producto['cantidad'], $producto['idprodt']);
                $res4 = $this->save($sql, $data);
                if ($res4 == 0) {
                    // Terminanos la transacion
                    $res = $this->submitTransaction(false);
                    return false;
                }
            }

            $res = $this->submitTransaction(true);
            return true;
            die();
        }

    }

?>