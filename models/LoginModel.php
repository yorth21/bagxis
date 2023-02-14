<?php

    class LoginModel extends Query
    {
        private $documento, $nombre, $clave;
        public function __construct()
        {
            parent::__construct();
        }

        // Funcion para loguearse
        public function getUsuario(string $email, string $clave, int $estado)
        {
            $sql = "SELECT * FROM usuarios WHERE email = '$email' AND clave = '$clave' AND estado = '$estado'";
            $data = $this->select($sql);
            return $data;
        }

        // Funcion para buscar usuario por la cedula
        public function getUsuarioDocumento(string $cedula, int $estado)
        {
            $sql = "SELECT * FROM usuarios WHERE cedula = '$cedula' AND estado = '$estado'";
            $data = $this->select($sql);
            return $data;
        }
        
        public function getDepartamentos()
        {
            $sql = "SELECT * FROM departamentos";
            $data = $this->selectAll($sql);
            return $data;
        }

        public function getMunicipiosDepartamentos(int $departamento)
        {
            $sql = "SELECT * FROM municipios WHERE departamento = $departamento";
            $data = $this->selectAll($sql);
            return $data;
        }
        
        // Funcion para registrar al usuario
        public function registrarUsuario(array $post_data)
        {
            // Hacer el SQL para insertar el usuario
            $sql = "INSERT INTO usuarios(cedula, nombres, apellidos, departamento, municipio, direccion, telefono, email, clave)
                    VALUES (?,?,?,?,?,?,?,?,?)";
            $res = $this->save($sql, $post_data);
            
            return $res;
        }
        
    }

?>