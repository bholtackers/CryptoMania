-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2019 at 12:47 PM
-- Server version: 10.1.39-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cryptomania`
--

-- --------------------------------------------------------

--
-- Table structure for table `cryptofolio`
--

CREATE TABLE `cryptofolio` (
  `id` int(11) NOT NULL,
  `ownerId` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `price` varchar(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `totalValue` varchar(30) NOT NULL,
  `bought_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cryptofolio`
--

INSERT INTO `cryptofolio` (`id`, `ownerId`, `name`, `price`, `amount`, `totalValue`, `bought_on`) VALUES
(12, 0, 'Bitcoin (BTC)', '7486.20', 3, '22458.6', '2018-06-06'),
(13, 0, 'Bitcoin (BTC)', '7486.20', 5, '37431', '2018-06-06'),
(14, 0, 'Bitcoin (BTC)', '7486.20', 2, '14972.4', '2018-06-06'),
(15, 0, 'Bitcoin (BTC)', '7486.20', 2, '14972.4', '2018-06-06'),
(16, 0, 'Bitcoin (BTC)', '7486.20', 2, '14972.4', '2018-06-06'),
(17, 0, 'Bitcoin (BTC)', '7486.20', 3, '22458.6', '2018-06-07'),
(18, 0, 'Bitcoin (BTC)', '7486.20', 23, '172182.6', '2018-06-07'),
(20, 1, 'Bitcoin', '7885.817626', 5, '39429.088130000004', '2019-04-06'),
(22, 1, 'Ethereum', '247.0879541', 1, '247.08795419228767', '2019-04-06'),
(24, 1, 'XRP', '0.406402528', 1, '0.4064025282194913', '2019-04-06'),
(25, 1, 'Litecoin', '103.6509104', 1, '103.65091047312308', '2019-04-06'),
(30, 1, 'Bitcoin Cash', '387.2643343', 1, '387.26433437773653', '2019-04-06'),
(35, 1, 'EOS', '6.591648439', 1, '6.591648439410271', '2019-04-06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `admin` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `admin`) VALUES
(1, 'Admin', 'Admin@Cryptomania.nl', '$2y$10$FpVjBHBHMn00I7hcexG3U.MTrzeMbBzJNP2U2zrD3pKqbL/EPi2YG', 1),
(2, 'xvLunatic', 'xvLunaFrost@gmail.com', '$2y$10$2aqDBM/pmAUt0ZPg6TYbXOvAuJVs7NjM6/6pVIiUapnqNIcoP0zNC', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cryptofolio`
--
ALTER TABLE `cryptofolio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cryptofolio`
--
ALTER TABLE `cryptofolio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
