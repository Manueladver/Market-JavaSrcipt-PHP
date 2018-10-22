-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-02-2018 a las 21:02:07
-- Versión del servidor: 10.1.29-MariaDB
-- Versión de PHP: 7.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdmarket`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `nombre` varchar(20) NOT NULL,
  `descripcion` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`nombre`, `descripcion`) VALUES
('Carnes', 'La carne es el tejido animal, principalmente muscular, que se consume como alimento.'),
('Frutas', 'Frutos comestibles obtenidos de plantas cultivadas o silvestres que, por su sabor generalmente dulce-acidulado, por su aroma intenso y agradable, y por sus propiedades nutritivas, suelen consumirse mayormente en su estado fresco, como jugo o como postre (y en menor medida, en otras preparaciones), una vez alcanzada la madurez organoléptica, o luego de ser sometidos a cocción.'),
('Helados', 'En su forma más simple, el helado o crema helada es un alimento congelado que por lo general se hace de productos lácteos tales como leche, crema y a menudo en combinación con frutas u otros ingredientes y sabores.'),
('Hortalizas', 'Conjunto de plantas cultivadas generalmente en huertas o regadíos, que se consumen como alimento, ya sea de forma cruda o preparadas culinariamente, y que incluye las verduras y las legumbres verdes.'),
('Pescado', 'El término pescado se refiere a los peces que se usan como alimento. Estos peces pueden ser pescados en el agua —océanos, mares, ríos, lagos—, pero también pueden ser criados mediante técnicas de acuicultura.'),
('Postres', 'El postre es el plato de sabor dulce o agridulce que se toma al final de la comida.'),
('Salazones', 'Se denomina salazón a un método destinado a preservar los alimentos, de forma que se encuentren disponibles para el consumo durante un mayor tiempo.'),
('Sin Categoría', 'Categoría genérica para productos sin categoría');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `nombre` varchar(40) NOT NULL,
  `dni` varchar(9) NOT NULL,
  `domicilio` varchar(200) NOT NULL,
  `poblacion` varchar(20) NOT NULL,
  `provincia` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_factura`
--

CREATE TABLE `detalles_factura` (
  `num_detalle` int(3) NOT NULL,
  `num_factura` int(3) NOT NULL,
  `ref` varchar(20) NOT NULL,
  `precio` int(2) NOT NULL,
  `cantidad` int(3) NOT NULL,
  `total` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `numero` int(3) NOT NULL,
  `dni_cliente` varchar(9) NOT NULL,
  `totales` int(4) NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'no pagada',
  `año` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `nom_cat` varchar(20) NOT NULL,
  `ref` varchar(20) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `precio` int(2) NOT NULL,
  `imagen` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`nom_cat`, `ref`, `nombre`, `precio`, `imagen`) VALUES
('Pescado', 'atún', 'atún', 3, 'imagenes/atun.jpg'),
('Frutas', 'fresas', 'fresas', 6, 'imagenes/fresas.jpg'),
('Frutas', 'granada', 'granada', 5, 'imagenes/granada.jpg'),
('Hortalizas', 'lechuga', 'lechuga', 1, 'imagenes/lechuga.jpg'),
('Pescado', 'lenguado', 'lenguado', 2, 'imagenes/lenguado.jpg'),
('Frutas', 'lima', 'lima', 1, 'imagenes/lima.jpg'),
('Frutas', 'mandarina', 'mandarina', 2, 'imagenes/mandarina.jpg'),
('Frutas', 'melocoton', 'melocoton', 3, 'imagenes/melocoton.jpg'),
('Frutas', 'naranja', 'naranja', 4, 'imagenes/naranja.jpg'),
('Hortalizas', 'patata', 'patata', 2, 'imagenes/patata.jpg'),
('Frutas', 'pera', 'pera', 4, 'imagenes/pera.jpg'),
('Frutas', 'piña', 'piña', 2, 'imagenes/piña.jpg'),
('Frutas', 'platano', 'platano', 2, 'imagenes/platano.jpg'),
('Pescado', 'salmón', 'salmón', 3, 'imagenes/salmon.jpg'),
('Frutas', 'sandia', 'sandia', 1, 'imagenes/sandia.jpg'),
('Postres', 'tarta de benidorm', 'tarta de benidorm', 2, 'imagenes/tarta-de-benidorm.jpg'),
('Hortalizas', 'tomate', 'tomate', 2, 'imagenes/tomate.jpg'),
('Hortalizas', 'zanahoria', 'zanahoria', 2, 'imagenes/zanahorias.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`nombre`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`dni`);

--
-- Indices de la tabla `detalles_factura`
--
ALTER TABLE `detalles_factura`
  ADD PRIMARY KEY (`num_detalle`),
  ADD KEY `num_factura` (`num_factura`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`numero`),
  ADD KEY `dni_cliente` (`dni_cliente`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`ref`),
  ADD KEY `nom_cat` (`nom_cat`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalles_factura`
--
ALTER TABLE `detalles_factura`
  MODIFY `num_detalle` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `numero` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalles_factura`
--
ALTER TABLE `detalles_factura`
  ADD CONSTRAINT `detalles_factura_ibfk_1` FOREIGN KEY (`num_factura`) REFERENCES `facturas` (`numero`) ON DELETE CASCADE;

--
-- Filtros para la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`dni_cliente`) REFERENCES `clientes` (`dni`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`nom_cat`) REFERENCES `categorias` (`nombre`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
