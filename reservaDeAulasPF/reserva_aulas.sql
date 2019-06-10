-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-06-2019 a las 02:51:16
-- Versión del servidor: 10.1.40-MariaDB
-- Versión de PHP: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reserva_aulas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elementos`
--

CREATE TABLE `elementos` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `elementos`
--

INSERT INTO `elementos` (`id`, `name`, `type`, `description`) VALUES
(5, 'Ana', 'equipo', 'Mariposita'),
(6, 'kk', 'aula', 'hjgj'),
(7, 'sss', 'aula', 'sss'),
(9, 'yiyiyiyiççççççççççç', 'aula', 'sss'),
(11, 'sssdccfv', 'aula', 'sss'),
(12, 'Alexandra', 'equipo', 'Princesa'),
(16, 'Equipo2', 'aula', 'TBT'),
(17, 'fdfvdvfd', 'aula', 'cvdz cdz'),
(18, 'ferav', 'equipo', 'fcdscdc'),
(19, 'feravcdcddddd', 'aula', 'fcdscdcdd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id` int(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `hour_ini` datetime NOT NULL,
  `hour_fin` datetime NOT NULL,
  `description` varchar(200) NOT NULL,
  `id_elementos` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`id`, `name`, `hour_ini`, `hour_fin`, `description`, `id_elementos`) VALUES
(3, 'prueba', '2019-06-05 08:30:00', '2019-06-05 09:25:00', 'jjj', 12),
(4, 'prueba', '2019-06-05 08:30:00', '2019-06-05 09:25:00', 'vghjvgh', 5),
(5, 'prueba', '2019-06-08 15:30:00', '2019-06-08 16:25:00', 'xfdhxfcf', 5),
(6, 'prueba', '2019-06-06 10:20:00', '2019-06-06 11:15:00', 'hjbvhj,', 9),
(7, 'prueba', '2019-06-07 11:15:00', '2019-06-07 11:45:00', 'lijk', 12),
(8, 'prueba', '2019-06-07 11:45:00', '2019-06-07 12:40:00', 'njk.n', 16),
(9, 'prueba', '2019-06-07 09:25:00', '2019-06-07 10:20:00', 'bhj,vbh', 18),
(10, 'prueba', '2019-06-07 10:20:00', '2019-06-07 11:15:00', 'vgcgh', 5),
(11, 'prueba', '2019-06-30 15:30:00', '2019-06-30 16:25:00', 'ghfth', 5);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `elementos`
--
ALTER TABLE `elementos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_elementos` (`id_elementos`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `elementos`
--
ALTER TABLE `elementos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`id_elementos`) REFERENCES `elementos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
