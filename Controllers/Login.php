<?php

    class Login extends Controller
    {

        public function __construct()
        {
            session_start();

            // cargar construct de la isntancia
            parent::__construct();
        }

        public function index()
        {
            // enviar a la vista para logearse
            $this->views->getView($this, "index");
        }

        public function registrarse()
        {
            /* enviamos los departamentos a la vista */
            $data['departamentos'] = $this->model->getDepartamentos();
            $this->views->getView($this, "registrarse", $data);
        }

        public function municipios(int $id)
        {
            $data = $this->model->getMunicipiosDepartamentos($id);
            $html = "<option value='' selected>Seleccione...</option>";
            for ($i=0; $i < count($data); $i++) {
                $html.="<option value='".$data[$i]['idmunicipio']."'>".$data[$i]['municipio']."</option>";
            }
            echo $html;
            die();
        }

        /* Funcion para registrar a los usuarios */
        public function registrar()
        {
            // Validamos que los campos del form no esten vacios y los guardamos en un array
            $post_data = array();
            $i = 0; // bamdera para las pocisiones del nuevo vector
            foreach ($_POST as $clave => $valor) {
                if (empty($valor)) {
                    echo "El campo " . $clave . " está vacío";
                    return;
                }
                // guardamos los datos en un array
                $post_data[$i] = $valor;
                $i++;
            }

            /* Validamos que el usuario no exista
                false = usuario no existe
                true = usuario existe */
            if (true == $this->buscarUsuario($_POST['cedula'])) {
                echo "Usuario ya existe";
                return;
            }

            // Encriptamos la clave
            $post_data[8] = hash("SHA256", $post_data[8]);
            
            // Insertamos el usuario en la base de datos
            $data = $this->model->registrarUsuario($post_data);
            if ($data == 0) {
                echo "No se pudo registrar";
                return;
            }

            echo "ok";
            die();
        }

        public function buscarUsuario($cedula)
        {
            $estado = 1;
            $data = $this->model->getUsuarioDocumento($cedula, $estado); // Buscamos si el usuario esta en la base de datos
            if (!empty($data)) {
                return true;
            }
            return false;
        }

        public function loguearse()
        {
            // Credenciales que ingreso el usuario
            $email = $_POST['loginEmail'];
            $pass = $_POST['loginPass'];
            // Validar los datos que el usuario ingreso no esten vacios
            if (empty($email) || empty($pass)) {
                echo "Ingrese sus datos";
                return;
            }

            // Verificar si exite usuarios con las credenciales digitadas
            $pass = hash("SHA256", $pass);
            $estado = 1; // validar que el usuario este activo
            $data = $this->model->getUsuario($email, $pass, $estado);
            if (empty($data)) {
                echo "Usuario o clave incorrectos";
                return;
            }

            // agregamos los datos del usuario logueado a la variable global $_SESSION
            $_SESSION['cedula'] = $data['cedula'];
            $_SESSION['nombres'] = $data['nombres'];
            $_SESSION['apellidos'] = $data['apellidos'];
            $_SESSION['activo'] = true;

            echo "ok";
            die();
        }














        public function validar()
        {
            // validar cuando se logue el usuario
            if (empty($_POST['usuario'] || empty($_POST['clave']))) {
                $msg = "Los campos estan vacios";
            } else {
                $usuario = $_POST['usuario'];
                $clave = $_POST['clave'];
                $hash = hash("SHA256", $clave);
                $estado = 1;
                $data = $this->model->getUsuario($usuario, $clave, $estado);
                if (!empty($data)) {
                    $_SESSION['cedula'] = $data['cedula'];
                    $_SESSION['nombres'] = $data['nombres'];
                    $_SESSION['apellidos'] = $data['apellidos'];
                    $_SESSION['activo'] = true;
                    $msg = "ok";
                } else {
                    $msg = "Usuario o contraseña incorrecta";
                }
            }
            echo json_encode($msg, JSON_UNESCAPED_UNICODE); // para mostrar caracteres especiales como tildes y ñ
            die();
        }

        public function vldocumento($documento) // validar que usuario no exista
        {
            $estado = 1;
            $data = $this->model->getDocUsuario($documento, $estado);
            if (!empty($data)) {
                $msg = "ok";
            } else {
                $msg = "Usuario ya existe";
            }
            echo json_encode($msg, JSON_UNESCAPED_UNICODE); // para mostrar caracteres especiales como tildes y ñ
            die();
        }

        public function registrar1()
        {
            date_default_timezone_set("America/Bogota");
            $fechareg = date('Y-m-d');

            $tipodoc = $_POST['tipodoc'];
            $documento = $_POST['documento'];
            $estado = 1;
            $data = $this->model->getDocUsuario($documento, $estado);
            if (!empty($data)) {
                $msg = "Usuario ya existe";
            } else {
                $nombre = $_POST['nombre'];
                $apellido = $_POST['apellido'];
                $genero = $_POST['genero'];
                $fechanac = $_POST['fechanac'];
                $clave = $_POST['clave'];
                $departamento = $_POST['departamento'];
                $municipio = $_POST['municipio'];
                $direccion = $_POST['direccion'];
                $email = $_POST['email'];
                $telefono = $_POST['telefono'];
                $hash = hash("SHA256", $clave);

                echo $hash;

                if ($tipodoc == "" || empty($documento) || empty($nombre)  || empty($apellido)  || $genero == "" || empty($fechanac)  || empty($hash)) {
                    $msg = "Hay un campo vacio en la sesion Datos personal";
                } else {
                    if (empty($departamento) || empty($municipio) || empty($direccion) || empty($email) || empty($telefono)) {
                        $msg = "Hay un campo vacio en la sesion Datos contacto";
                    } else {
                        $data = $this->model->registrarUsuario($tipodoc, $documento, $nombre, $apellido, $genero, $fechanac, $hash,
                                                                $departamento, $municipio, $direccion, $email, $telefono, $fechareg);
                        if ($data == "ok") {
                            $msg = "si";
                        } else {
                            $msg = "Error al registrar el proveedor";
                        }
                    }
                }
            }
            echo json_encode($msg, JSON_UNESCAPED_UNICODE); // para mostrar caracteres especiales como tildes y ñ
            die();
        }

        public function salir()
        {
            session_destroy();
            header("location: ".base_url);
        }
    }

?>