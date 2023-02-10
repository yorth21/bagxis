<?php

    class Query extends Conexion
    {
        private $pdo, $con, $sql, $datos;
        public function __construct()
        {
            $this->pdo = new Conexion();
            $this->con = $this->pdo->conect();
        }

        public function select(string $sql)
        {
            $this->sql = $sql;
            $resul = $this->con->prepare($this->sql);
            $resul->execute();
            $data = $resul->fetch(PDO::FETCH_ASSOC);
            return $data;
        }

        public function selectAll(string $sql)
        {
            $this->sql = $sql;
            $resul = $this->con->prepare($this->sql);
            $resul->execute();
            $data = $resul->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        }

        public function startTransaction()
        {
            $this->con->beginTransaction();
        }

        public function save(string $sql, array $datos)
        {
            try {
                $this->sql = $sql;
                $this->datos = $datos;
                $insert = $this->con->prepare($this->sql);
                $insert->execute($this->datos);
            } catch(PDOException $e) {
                return 0;
            }

            return 1;
        }

        public function submitTransaction($res)
        {
            if ($res == true) {
                try {
                    $this->con->commit();
                } catch(PDOException $e) {
                    $this->con->rollBack();
                    return false;
                }
                return true;
            } else {
                $this->con->rollBack();
                return false;
            }
        }

    }

?>