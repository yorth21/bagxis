CREATE TABLE `usuarios` (
  `cedula` varchar(20) PRIMARY KEY,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `departamento` char(2) NOT NULL,
  `municipio` char(5) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `clave` varchar(256) NOT NULL,
  `estado` int(1) DEFAULT 1
);

CREATE TABLE `municipios` (
  `idmunicipio` char(5) PRIMARY KEY,
  `municipio` varchar(50) NOT NULL,
  `departamento` char(2) NOT NULL
);

CREATE TABLE `departamentos` (
  `iddepto` char(2) PRIMARY KEY,
  `departamento` varchar(30) NOT NULL
);

CREATE TABLE `carritos` (
  `idcarrito` int PRIMARY KEY AUTO_INCREMENT,
  `cedula` varchar(20) NOT NULL,
  `estado` int(1) DEFAULT 1
);

CREATE TABLE `lista` (
  `idlista` int PRIMARY KEY AUTO_INCREMENT,
  `carrito` int NOT NULL,
  `producto` int NOT NULL,
  `cantidad` int(4) NOT NULL DEFAULT 1,
   `estado` int(1) DEFAULT 1
);

CREATE TABLE `productos` (
  `idprodt` int PRIMARY KEY AUTO_INCREMENT,
  `producto` varchar(50) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `tipo` char(1) NOT NULL,
  `color` varchar(20) NOT NULL,
  `marca` varchar(20) NOT NULL,
  `modelo` varchar(20) NOT NULL,
  `img` varchar(256) NOT NULL,
  `precio` double NOT NULL,
  `cantidad` int(4) DEFAULT 1,
  `descuento` double DEFAULT 0,
  `estado` int(1) DEFAULT 1
);

CREATE TABLE `facturas` (
  `idfac` int PRIMARY KEY AUTO_INCREMENT,
  `carrito` int NOT NULL,
  `total` double NOT NULL,
  `formapago` int NOT NULL
);

CREATE TABLE `formaspago` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `banco` varchar(20) NOT NULL
);

ALTER TABLE `municipios` ADD FOREIGN KEY (`departamento`) REFERENCES `departamentos` (`iddepto`);

ALTER TABLE `usuarios` ADD FOREIGN KEY (`municipio`) REFERENCES `municipios` (`idmunicipio`);

ALTER TABLE `carritos` ADD FOREIGN KEY (`cedula`) REFERENCES `usuarios` (`cedula`);

ALTER TABLE `lista` ADD FOREIGN KEY (`carrito`) REFERENCES `carritos` (`idcarrito`);

ALTER TABLE `lista` ADD FOREIGN KEY (`producto`) REFERENCES `productos` (`idprodt`);

ALTER TABLE `facturas` ADD FOREIGN KEY (`carrito`) REFERENCES `carritos` (`idcarrito`);

ALTER TABLE `facturas` ADD FOREIGN KEY (`formapago`) REFERENCES `formaspago` (`id`);
