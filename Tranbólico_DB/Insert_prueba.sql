-- Inserts para la tabla user
INSERT INTO user (name, surname, birthdate, genre, email, password, phone_number, avatar, province_id, city_id, is_validated, is_disabled, user_type) VALUES
('Juan', 'Pérez', '2004-08-15', 1, 'juan.perez@example.com', 'password123', '123456789', NULL, 12, 40, FALSE, FALSE, 2),
('María', 'García', '2004-08-15', 2, 'maria.garcia@example.com', 'password456', '987654321', NULL, 12, 40, TRUE, FALSE, 2),
('Carlos', 'López', '2004-08-15', 1, 'carlos.lopez@example.com', 'password789', '456123789', NULL, 12, 40, FALSE, TRUE, 2),
('Ana', 'Martínez', '2004-08-15', 2, 'ana.martinez@example.com', 'password012', '321654987', NULL, 12, 9, TRUE, FALSE, 2),
('Luis', 'Hernández', '2004-08-15', 3,'luis.hernandez@example.com', 'password345', '789456123', NULL, 12, 9, FALSE, FALSE, 2),
('Laura', 'Gómez', '2004-08-15', 2, 'laura.gomez@example.com', 'password678', '654321987', NULL, 12, 9, TRUE, FALSE, 2),
('Pedro', 'Sánchez', '2004-08-15', NULL, 'pedro.sanchez@example.com', 'password901', '321987654', NULL, 12, 28, FALSE, TRUE, 1),
('Elena', 'Ruiz', '2004-08-15', 2, 'elena.ruiz@example.com', 'password234', '987123456', NULL, 12, 28, TRUE, FALSE, 2),
('Miguel', 'Torres', '2004-08-15', 1, 'miguel.torres@example.com', 'password567', '123789456', NULL, 12, 9, FALSE, FALSE, 2),
('Sara', 'Ramírez', '2004-08-15', 2, 'sara.ramirez@example.com', 'password890', '789123654', NULL, 12, 135, TRUE, FALSE, 2);

-- Inserts para la tabla route
INSERT INTO route (departure_province_id, departure_city_id, arrival_province_id, arrival_city_id, text, is_disabled) VALUES
(12, 40, 12, 28, 'Ruta de prueba 1', FALSE),
(12, 28, 12, 40, 'Ruta de prueba 2', FALSE),
(12, 40, 12, 9, 'Ruta de prueba 3', FALSE),
(12, 9, 12, 40, 'Ruta de prueba 4', FALSE),
(12, 9, 12, 28, 'Ruta de prueba 5', TRUE),
(12, 28, 12, 9, 'Ruta de prueba 6', TRUE),
(12, 40, 12, 135, 'Ruta de prueba 7', FALSE),
(12, 135, 12, 40, 'Ruta de prueba 8', FALSE);

-- Inserts para la tabla planning
INSERT INTO planning (route_id, planning_id, departure_date, departure_time) VALUES
(1, 1, '2024-08-15', '08:00:00'),
(1, 2, '2024-08-16', '09:00:00'),
(1, 3, '2024-08-17', '10:00:00'),
(2, 1, '2024-08-18', '11:00:00'),
(2, 2, '2024-08-19', '12:00:00'),
(2, 3, '2024-08-20', '13:00:00'),
(3, 1, '2024-08-21', '14:00:00'),
(3, 2, '2024-08-22', '15:00:00'),
(4, 1, '2024-08-23', '16:00:00'),
(4, 2, '2024-08-24', '17:00:00');

-- Inserts para la tabla reservation
INSERT INTO reservation (user_id, reservation_id, route_id, planning_id, reservation_type, is_deleted) VALUES
(1, 1, 1, 1, 1, FALSE),
(1, 1, 2, 3, 2, FALSE),
(1, 2, 1, 2, 1, FALSE),
(1, 2, 2, 2, 2, FALSE),
(3, 1, 3, 1, 1, FALSE),
(3, 1, 4, 2, 2, FALSE),
(4, 1, 3, 1, 1, TRUE),
(4, 1, 4, 2, 2, TRUE);