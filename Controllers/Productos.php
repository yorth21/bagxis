<?php

    class Productos extends Controller
    {

        public function __construct()
        {
            session_start();

            // cargar construct de la isntancia
            parent::__construct();
        }

        /* Funciones para llamar a las vistas */
        public function index()
        {
            // Enviar a la vista principal en esta caso no tendria
            $this->views->getView($this, "index");
        }

        public function producto(int $idProducto)
        {
            // Enviar informacion a la vista del producto
            $data = $this->model->getProducto($idProducto);
            $data['precio'] = number_format($data['precio'], 0, ',', '.'); // Poner puntos de mil
            $data['descuento'] = $data['descuento'] == 0 ? "" : $data['descuento']."%";

            $this->views->getView($this, "producto", $data);
        }

        public function facturar()
        {
            // Buscar el carrito activo del usuario
            $carrito = $this->model->getCarrito($_SESSION['cedula']);
            if (empty($carrito)) {
                echo json_encode("Sucedio un error comunicate con atencion al usuario");
                return;
            }

            // Listar los productos que tiene en el carrito
            $data = $this->model->getProductosCarrito($carrito['idcarrito']);

            // Enviamo los datos a la vista
            $this->views->getView($this, "facturar", $data);
        }

        public function carrito()
        {
            // Buscar el carrito activo del usuario
            $carrito = $this->model->getCarrito($_SESSION['cedula']);
            if (empty($carrito)) {
                echo json_encode("Sucedio un error comunicate con atencion al usuario");
                return;
            }

            // Listar los productos que tiene en el carrito
            $data = $this->model->getProductosCarrito($carrito['idcarrito']);

            // Enviamo los datos a la vista
            $this->views->getView($this, "carrito", $data);
        }

        /* Funciones para mostrar datos */
        public function newProductos()
        {
            // Hacemos la consulta
            $data = $this->model->getNewProductos(); // Buscamos si el usuario esta en la base de datos
            echo json_encode($data);
            die();
        }

        /* Funcion para agregar el producto al carrito */
        public function addCarrito()
        {
            // Verificar que se haya enviado una solicitud POST
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                // Leer los datos JSON de la solicitud
                $json = file_get_contents('php://input');
                
                // Decodificar los datos JSON en un array asociativo
                $post_data = json_decode($json, true);
            } else {
                echo json_encode("Servidor no recibio la informacion");
                return;
            }

            // Comprobar si el producto existe y hay stock
            $producto = $this->model->getProducto($post_data['idprodt']);
            // Comprobar que exista
            if (empty($producto)) {
                echo json_encode("Producto no existe");
                return;
            }
            // Comprobar que haya stock
            if ($producto['cantidad'] < $post_data['cantidad']) {
                echo json_encode("No hay suficiente stock");
                return;
            }

            // Buscar el carrito id del carrito del cliente
            $carrito = $this->model->getCarrito($post_data['cedula']);
            if (empty($carrito)) {
                echo json_encode("Sucedio un error comunicate con atencion al usuario");
                return;
            }

            // Guardamos el id del carrito
            $post_data['idcarrito'] = $carrito['idcarrito'];

            // Buscar si el usuario ya habia agregao antes ese producto
            // Si es haci tenemos que sumarlo
            $lista = $this->model->getListaProducto($post_data['idcarrito'], $post_data['idprodt']);
            if (!empty($lista)) {
                // Producto ya ha sido agregado, toca sumarlo

                $newCantidad = $lista['cantidad'] + $post_data['cantidad'];
                // Comprobar que si haya stock suficiente
                if ($newCantidad > $producto['cantidad']) {
                    echo json_encode("No pudimos agregar más unidades a tu carrito porque ya tienes la cantidad límite de compra para este producto");
                    return;
                }
                $data = $this->model->sumarProducto($lista['idlista'], $newCantidad);
                if ($data == 0) {
                    echo "No se agrego el producto";
                    return;
                }

                echo json_encode("ok");
                return;
            }


            // Agregar el producto al carrito
            $data = $this->model->addProducto($post_data);
            if ($data == 0) {
                echo "No se agrego el producto";
                return;
            }

            echo json_encode("ok");
            die();
        }

        public function delProductoLista()
        {
            // Verificar que se haya enviado una solicitud POST
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                // Leer los datos JSON de la solicitud
                $json = file_get_contents('php://input');
                
                // Decodificar los datos JSON en un array asociativo
                $post_data = json_decode($json, true);
            } else {
                echo json_encode("Servidor no recibio la informacion");
                return;
            }

            // Hacer funcion para elimiar producto de la lista
            $data = $this->model->delProductoLista($post_data['idCart'], $post_data['idProdt']);
            if ($data == 0) {
                echo json_encode("No se pudo eliminar el producto, recargue la pagina");
                return;
            }

            echo json_encode("ok");
            die();
        }

    }

?>