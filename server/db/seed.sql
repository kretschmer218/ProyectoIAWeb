-- Insert courses (10)
INSERT OR IGNORE INTO courses (id, name, description) VALUES
(1,'1º A','Curso 1º A - Programación básica'),
(2,'1º B','Curso 1º B - Programación básica'),
(3,'2º A','Curso 2º A - Desarrollo web'),
(4,'2º B','Curso 2º B - Desarrollo web'),
(5,'3º A','Curso 3º A - IA aplicada'),
(6,'3º B','Curso 3º B - IA aplicada'),
(7,'4º A','Curso 4º A - Proyecto final'),
(8,'4º B','Curso 4º B - Proyecto final'),
(9,'Tecno 1','Técnico 1'),
(10,'Tecno 2','Técnico 2');

-- Insert students (10)
INSERT OR IGNORE INTO students (id, name, email, age, course_id) VALUES
(1,'Ana Pérez','ana.perez@example.com',16,1),
(2,'Bruno Gómez','bruno.gomez@example.com',17,1),
(3,'Carla Ruiz','carla.ruiz@example.com',16,2),
(4,'Diego López','diego.lopez@example.com',17,3),
(5,'Elena García','elena.garcia@example.com',18,4),
(6,'Facundo Díaz','facundo.diaz@example.com',18,5),
(7,'Gabriela Torres','gabriela.torres@example.com',17,6),
(8,'Héctor Morales','hector.morales@example.com',18,7),
(9,'Ivana Soto','ivana.soto@example.com',17,8),
(10,'Javier Castro','javier.castro@example.com',18,9);

-- Insert enrollments (10)
INSERT OR IGNORE INTO enrollments (id, student_id, course_id, grade) VALUES
(1,1,1,'A'),
(2,2,1,'B'),
(3,3,2,'A'),
(4,4,3,'B+'),
(5,5,4,'A-'),
(6,6,5,'B'),
(7,7,6,'A'),
(8,8,7,'B'),
(9,9,8,'A'),
(10,10,9,'B+');
