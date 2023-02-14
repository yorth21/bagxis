<?php

    class Login extends Controller
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
            // enviar a la vista para logearse
            $this->views->getView($this, "index");
        }

        public function registrarse()
        {
            /* enviamos los departamentos a la vista */
            $data['departamentos'] = $this->model->getDepartamentos();
            $this->views->getView($this, "registrarse", $data);
        }

        public function verPerfil()
        {
            // enviar a la vista para ver perfil
            $this->views->getView($this, "perfil");
        }

        /* Fin funciones pra llamar a las vistas */

        //Buscar municipios por el cogido del departamento
        public function municipios(int $departamento)
        {
            $data = $this->model->getMunicipiosDepartamentos($departamento);
            $html = "<option value='' selected>Seleccione...</option>";
            for ($i=0; $i < count($data); $i++) {
                $html.="<option value='".$data[$i]['idmunicipio']."'>".$data[$i]['municipio']."</option>";
            }
            echo $html;
            die();
        }

        // Buscar un usuario por su cedula       
        public function buscarUsuario($cedula)
        {
            $estado = 1;
            $data = $this->model->getUsuarioDocumento($cedula, $estado); // Buscamos si el usuario esta en la base de datos
            if (!empty($data)) {
                return true;
            }
            return false;
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

        /* Funcion para iniciar sesion */
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

        /* Funcion para retornar la informacion del usuario logueado */
        public function datosSesion()
        {
            // Preguntamos si la sesion esta activa
            if (empty($_SESSION)) {
                echo json_encode("No ha iniciado sesion");
                return;
            }
            // Enviamos los datos de la sesion
            echo json_encode($_SESSION);
            die();
        }

        /* Funcion para cerrar sesion */
        public function salir()
        {
            session_destroy();
            header("location: ".base_url);
        }
    }

?>