-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 10, 2026 at 09:28 AM
-- Server version: 8.0.42
-- PHP Version: 8.2.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cinema_booking_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `showtime_id` int NOT NULL,
  `booking_reference` varchar(20) NOT NULL,
  `number_of_tickets` int NOT NULL,
  `booked_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `showtime_id`, `booking_reference`, `number_of_tickets`, `booked_at`) VALUES
(1, 1, 26, '1E4476297F', 3, '2026-10-09 09:57:12'),
(2, 1, 26, '585C708EE5', 4, '2026-10-09 09:58:14'),
(3, 1, 69, '278012D0A2', 3, '2026-10-09 11:25:39'),
(4, 1, 37, '78008DA52A', 1, '2026-10-09 11:25:58');

-- --------------------------------------------------------

--
-- Table structure for table `cinemas`
--

CREATE TABLE `cinemas` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cinemas`
--

INSERT INTO `cinemas` (`id`, `name`, `address`, `created_at`) VALUES
(1, 'Monte Casino Cinema', '1 Montecasino Boulevard, Fourways', '2026-10-08 12:54:34'),
(2, 'Fourways Mall Cinema', '11 Ruby Cl, Sandton', '2026-10-08 12:54:34'),
(4, 'Monte Casino Cinema', '1 Montecasino Boulevard, Fourways', '2026-10-08 12:56:30'),
(5, 'Fourways Mall Cinema', '11 Ruby Cl, Sandton', '2026-10-08 12:56:30');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text,
  `duration_minutes` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `title`, `description`, `duration_minutes`, `created_at`) VALUES
(1, 'The Simpsons Movie', 'Homer accidentally pollutes a lake of Springfield. When the town blames him for it, he decides to save the city and his family.', 87, '2026-10-08 12:56:30'),
(2, 'The Odyssey', 'After the Trojan War, Odysseus faces a dangerous voyage back to Ithaca, meeting creatures like the Cyclops Polyphemus, Sirens, and Circe along the way.', 173, '2026-10-08 12:56:30'),
(3, 'Tony', 'A 19-year-old Anthony Bourdain travels to Provincetown and stumbles into the chaotic world of a restaurant kitchen, setting off a summer that will shape the course of his life.', 106, '2026-10-08 12:56:30'),
(4, 'Moana', 'Live-action adaptation of the 2016 Disney animated film Moana.', 115, '2026-10-08 12:56:30');

-- --------------------------------------------------------

--
-- Table structure for table `showtimes`
--

CREATE TABLE `showtimes` (
  `id` int NOT NULL,
  `movie_id` int NOT NULL,
  `theatre_id` int NOT NULL,
  `show_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `showtimes`
--

INSERT INTO `showtimes` (`id`, `movie_id`, `theatre_id`, `show_time`) VALUES
(17, 1, 1, '2026-10-10 18:00:00'),
(18, 1, 1, '2026-10-10 21:00:00'),
(25, 1, 1, '2026-10-11 18:00:00'),
(26, 1, 1, '2026-10-11 21:00:00'),
(33, 1, 1, '2026-10-12 18:00:00'),
(34, 1, 1, '2026-10-12 21:00:00'),
(41, 1, 1, '2026-10-13 18:00:00'),
(42, 1, 1, '2026-10-13 21:00:00'),
(49, 1, 1, '2026-10-14 18:00:00'),
(50, 1, 1, '2026-10-14 21:00:00'),
(65, 1, 1, '2026-10-15 18:00:00'),
(66, 1, 1, '2026-10-15 21:00:00'),
(73, 1, 1, '2026-10-16 18:00:00'),
(74, 1, 1, '2026-10-16 21:00:00'),
(19, 2, 2, '2026-10-10 18:30:00'),
(20, 2, 2, '2026-10-10 21:30:00'),
(27, 2, 2, '2026-10-11 18:30:00'),
(28, 2, 2, '2026-10-11 21:30:00'),
(35, 2, 2, '2026-10-12 18:30:00'),
(36, 2, 2, '2026-10-12 21:30:00'),
(43, 2, 2, '2026-10-13 18:30:00'),
(44, 2, 2, '2026-10-13 21:30:00'),
(51, 2, 2, '2026-10-14 18:30:00'),
(52, 2, 2, '2026-10-14 21:30:00'),
(67, 2, 2, '2026-10-15 18:30:00'),
(68, 2, 2, '2026-10-15 21:30:00'),
(75, 2, 2, '2026-10-16 18:30:00'),
(76, 2, 2, '2026-10-16 21:30:00'),
(21, 3, 3, '2026-10-10 18:00:00'),
(22, 3, 3, '2026-10-10 21:30:00'),
(29, 3, 3, '2026-10-11 18:00:00'),
(30, 3, 3, '2026-10-11 21:30:00'),
(37, 3, 3, '2026-10-12 18:00:00'),
(38, 3, 3, '2026-10-12 21:30:00'),
(45, 3, 3, '2026-10-13 18:00:00'),
(46, 3, 3, '2026-10-13 21:30:00'),
(53, 3, 3, '2026-10-14 18:00:00'),
(54, 3, 3, '2026-10-14 21:30:00'),
(69, 3, 3, '2026-10-15 18:00:00'),
(70, 3, 3, '2026-10-15 21:30:00'),
(77, 3, 3, '2026-10-16 18:00:00'),
(78, 3, 3, '2026-10-16 21:30:00'),
(23, 4, 4, '2026-10-10 18:00:00'),
(24, 4, 4, '2026-10-10 21:30:00'),
(31, 4, 4, '2026-10-11 18:00:00'),
(32, 4, 4, '2026-10-11 21:30:00'),
(39, 4, 4, '2026-10-12 18:00:00'),
(40, 4, 4, '2026-10-12 21:30:00'),
(47, 4, 4, '2026-10-13 18:00:00'),
(48, 4, 4, '2026-10-13 21:30:00'),
(55, 4, 4, '2026-10-14 18:00:00'),
(56, 4, 4, '2026-10-14 21:30:00'),
(71, 4, 4, '2026-10-15 18:00:00'),
(72, 4, 4, '2026-10-15 21:30:00'),
(79, 4, 4, '2026-10-16 18:00:00'),
(80, 4, 4, '2026-10-16 21:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `theatres`
--

CREATE TABLE `theatres` (
  `id` int NOT NULL,
  `cinema_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `capacity` int NOT NULL DEFAULT '30'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `theatres`
--

INSERT INTO `theatres` (`id`, `cinema_id`, `name`, `capacity`) VALUES
(1, 1, 'Regular 1', 30),
(2, 1, 'IMAX', 30),
(3, 2, 'Regular 3D', 30),
(4, 2, 'IMAX 2', 30);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `email`, `password`, `created_at`) VALUES
(1, 'Gareth', 'gazaseanmoore09@gmail.com', '$2y$10$ZqNNjUWNxTPVkRE/TrqHmebd8OkDBgAxmYMrhn0GZKv91HQftBJnO', '2026-10-07 08:56:09'),
(2, 'liam', 'lmoore@gmail.com', '$2y$10$G08eGEbVD92df6gBZ7FnUusG/NKXudMJL267277rUbrDdeAWxYsNy', '2026-10-07 12:08:18'),
(3, 'Julie', 'juliemoore@gmail.com', '$2y$10$Y.CH9/ytbG.87w8LKYq4/.H5sHThHTsvQHcAwdtBOpm4WkdGMpaOa', '2026-10-08 09:15:05'),
(4, 'Geoff', 'gmoore@gmail.com', '$2y$10$jvqwGkuYlsPwO3dgxdmhOuovmnw4.JQyawJiIk6NTPoXxDHCKXSKy', '2026-10-08 09:17:45'),
(5, 'Dylan', 'dhanger@gmail.com', '$2y$10$2g2CpZlcUUwA73utSZPn9ODzzEO3jgKXkYyeit/sz4D3QnazWqqUy', '2026-10-10 09:17:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `booking_reference` (`booking_reference`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `showtime_id` (`showtime_id`);

--
-- Indexes for table `cinemas`
--
ALTER TABLE `cinemas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `showtimes`
--
ALTER TABLE `showtimes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `movie_id` (`movie_id`,`theatre_id`,`show_time`),
  ADD KEY `theatre_id` (`theatre_id`);

--
-- Indexes for table `theatres`
--
ALTER TABLE `theatres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cinema_id` (`cinema_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cinemas`
--
ALTER TABLE `cinemas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `showtimes`
--
ALTER TABLE `showtimes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `theatres`
--
ALTER TABLE `theatres`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`showtime_id`) REFERENCES `showtimes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `showtimes`
--
ALTER TABLE `showtimes`
  ADD CONSTRAINT `showtimes_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `showtimes_ibfk_2` FOREIGN KEY (`theatre_id`) REFERENCES `theatres` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `theatres`
--
ALTER TABLE `theatres`
  ADD CONSTRAINT `theatres_ibfk_1` FOREIGN KEY (`cinema_id`) REFERENCES `cinemas` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
