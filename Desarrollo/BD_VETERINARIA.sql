CREATE DATABASE BD_VETERINARIA;
USE BD_VETERINARIA; 

----------------- TABLAS --------------------
CREATE TABLE TB_USUARIO(
	ID_USUARIO INT AUTO_INCREMENT PRIMARY KEY,
	DNI_USUARIO VARCHAR(9) NOT NULL,
    NOMBRES_USUARIO VARCHAR(50) NOT NULL,
    APELLIDOS_USUARIO VARCHAR(50) NOT NULL,
    DIRECCION_USUARIO VARCHAR(50),
    CELULAR_USUARIO INT(9) NOT NULL,
    EMAIL_USUARIO VARCHAR(100) UNIQUE NOT NULL,
    PASSWORD_USUARIO VARCHAR(64) NOT NULL, 
    ROL_USUARIO VARCHAR(14) NOT NULL
);


CREATE TABLE TB_MASCOTAS(
	ID_MASCOTA INT AUTO_INCREMENT PRIMARY KEY,
    ID_USUARIO INT,
    NOMBRE_MASCOTA VARCHAR(30) NOT NULL,
    ESPECIE_MASCOTA VARCHAR(20) NOT NULL,
    SEXO_MASCOTA CHAR(1),
    RAZA_MASCOTA VARCHAR(50) NOT NULL,
    FECHA_NACIMIENTO_MASCOTA DATE,
    IMAGEN_MASCOTA LONGBLOB NOT NULL,
    EVIDENCIA_MASCOTA LONGBLOB NOT NULL,
    
    CONSTRAINT FK_USUARIO01 FOREIGN KEY(ID_USUARIO) REFERENCES TB_USUARIO(ID_USUARIO) ON DELETE CASCADE
);

CREATE TABLE TB_CITAS(
	ID_CITA INT AUTO_INCREMENT PRIMARY KEY,
    ID_MASCOTA INT,
    FECHA_HORA_CITA DATETIME NOT NULL,
    MOTIVO_CITA VARCHAR(50) NOT NULL,
    
	CONSTRAINT FK_MASCOTA01 FOREIGN KEY(ID_MASCOTA) REFERENCES TB_MASCOTAS(ID_MASCOTA) ON DELETE CASCADE 
);

CREATE TABLE TB_FICHA_MEDICA(
	ID_FICHA INT AUTO_INCREMENT PRIMARY KEY, 
    ID_CITA INT, 
    FECHA_CREACION DATETIME NOT NULL, 
    ANTECEDENTES VARCHAR(255) NOT NULL,
    DIAGNOSTICO VARCHAR(255) NOT NULL, 
    TRATAMIENTO VARCHAR(255) NOT NULL, 
    
    CONSTRAINT FK_CITA01 FOREIGN KEY(ID_CITA) REFERENCES TB_CITAS(ID_CITA) ON DELETE CASCADE
);

----------------- INSERCIÓN DE DATOS --------------------

INSERT INTO TB_USUARIO(DNI_USUARIO, NOMBRES_USUARIO, APELLIDOS_USUARIO, DIRECCION_USUARIO,CELULAR_USUARIO,
						EMAIL_USUARIO, PASSWORD_USUARIO, ROL_USUARIO)
VALUES('75632148', 'Alejandro Saul', 'Rojas Gamboa', 'Av. Arequipa 4563', 965823179, 'alejandrorojas@gmail.com', '1234', 'Cliente');
INSERT INTO TB_USUARIO(DNI_USUARIO, NOMBRES_USUARIO, APELLIDOS_USUARIO, DIRECCION_USUARIO,CELULAR_USUARIO,
						EMAIL_USUARIO, PASSWORD_USUARIO, ROL_USUARIO)
VALUES('735417658', 'Maria Alejandra', 'Clemente Malasquez', 'Av. Tacna 6354', 975621493, 'mariaalejandrac@gmail.com', '7894', 'Cliente');
INSERT INTO TB_USUARIO(DNI_USUARIO, NOMBRES_USUARIO, APELLIDOS_USUARIO, DIRECCION_USUARIO,CELULAR_USUARIO,
						EMAIL_USUARIO, PASSWORD_USUARIO, ROL_USUARIO)
VALUES('745612899', 'Camila Isabel', 'Dioses Ramos', 'Calle German Stiglich 4563', 963547819, 'camiladioses@gmail.com', '56Alos8', 'Cliente');
INSERT INTO TB_USUARIO(DNI_USUARIO, NOMBRES_USUARIO, APELLIDOS_USUARIO, DIRECCION_USUARIO,CELULAR_USUARIO,
						EMAIL_USUARIO, PASSWORD_USUARIO, ROL_USUARIO)
VALUES('78549657', 'Renzo Ricardo', 'Vasquez Perez', 'Calle C 10', 935689412, 'renzovasquez@gmail.com', 'REDU96547', 'Administrador');


INSERT INTO TB_MASCOTAS(ID_USUARIO,NOMBRE_MASCOTA, ESPECIE_MASCOTA, SEXO_MASCOTA, RAZA_MASCOTA, FECHA_NACIMIENTO_MASCOTA,
						IMAGEN_MASCOTA, EVIDENCIA_MASCOTA)
VALUES(1,'Zeus', 'Perro', 'M', 'Pitbull', '2022-10-03',
		'https://t1.uc.ltmcdn.com/es/posts/1/1/1/como_adiestrar_a_un_pitbull_34111_orig.jpg',
        'https://www.kivet.com/wp-content/uploads/2022/08/calendario_vacunacion_perro.webp'); 
INSERT INTO TB_MASCOTAS(ID_USUARIO,NOMBRE_MASCOTA, ESPECIE_MASCOTA, SEXO_MASCOTA, RAZA_MASCOTA, FECHA_NACIMIENTO_MASCOTA,
						IMAGEN_MASCOTA, EVIDENCIA_MASCOTA)
VALUES(2,'Copito', 'Conejo', 'F', 'MiniRex', '2023-01-22',
		'https://wakyma.com/blog/wp-content/uploads/2017/06/Te-lo-contamos-todo-sobre-el-conejo-mini-rex',
        'https://www.kivet.com/wp-content/uploads/2022/08/calendario_vacunacion_conejo.webp'); 
INSERT INTO TB_MASCOTAS(ID_USUARIO,NOMBRE_MASCOTA, ESPECIE_MASCOTA, SEXO_MASCOTA, RAZA_MASCOTA, FECHA_NACIMIENTO_MASCOTA,
						IMAGEN_MASCOTA, EVIDENCIA_MASCOTA)
VALUES(3,'Rose', 'Gato', 'F', 'Britanico de pelo corto', '2022-03-18',
		'https://smylepets.com/wp-content/uploads/2021/04/british-shorthair.jpg',
        'https://www.kivet.com/wp-content/uploads/2022/08/calendario_vacunacion_gato.webp');

INSERT INTO TB_CITAS(ID_MASCOTA, FECHA_HORA_CITA, MOTIVO_CITA)
VALUES(1, '2023-11-12 15:30:00', 'Chequeo anual');

INSERT INTO TB_CITAS(ID_MASCOTA, FECHA_HORA_CITA, MOTIVO_CITA)
VALUES(2, '2023-11-12 13:30:00', 'Chequeo anual');
        
INSERT INTO TB_FICHA_MEDICA(ID_CITA, FECHA_CREACION, ANTECEDENTES, DIAGNOSTICO, TRATAMIENTO)
VALUES(1, NOW(), 'No tiene ningun tipo de alergias o enfermedades diagnosticadas anteriormente',
		'Se encuentra bien de salud', 'Ninguno');
        
INSERT INTO TB_FICHA_MEDICA(ID_CITA, FECHA_CREACION, ANTECEDENTES, DIAGNOSTICO, TRATAMIENTO)
VALUES(2, NOW(), 'No tiene ningun tipo de alergias o enfermedades diagnosticadas anteriormente',
		'Se encuentra bien de salud', 'Ninguno');
        
DELETE FROM TB_FICHA_MEDICA
WHERE ID_CITA = 2; 

----------------- VISTAS --------------------

CREATE OR REPLACE VIEW VW_DATOSCLIENTE
AS 
SELECT 
    CONCAT(SUBSTRING_INDEX(NOMBRES_USUARIO, ' ', 1), ' ', SUBSTRING_INDEX(APELLIDOS_USUARIO, ' ', 1)) AS 'Nombre Completo',
    DNI_USUARIO AS 'DNI',
    CELULAR_USUARIO AS 'Numero celular'
FROM 
    TB_USUARIO 
WHERE 
    ROL_USUARIO != 'Administrador';
USE BD_VETERINARIA;
CREATE OR REPLACE VIEW VW_DETALLESCONSULTA
AS 
SELECT 
    CONCAT(SUBSTRING_INDEX(NOMBRES_USUARIO, ' ', 1), ' ', SUBSTRING_INDEX(APELLIDOS_USUARIO, ' ', 1)) AS 'Nombre',
    U.CELULAR_USUARIO AS 'Numero contacto',
    U.EMAIL_USUARIO AS 'Correo',
    C.MOTIVO_CITA AS 'Motivo',
    C.FECHA_HORA_CITA AS 'Fecha Cita',
    CONCAT(
        M.NOMBRE_MASCOTA, 
        ' (', 
        M.ESPECIE_MASCOTA, ' ', 
        M.RAZA_MASCOTA, ' ', 
        CASE 
            WHEN TIMESTAMPDIFF(YEAR, M.FECHA_NACIMIENTO_MASCOTA, CURDATE()) < 1 THEN
                TIMESTAMPDIFF(MONTH, M.FECHA_NACIMIENTO_MASCOTA, CURDATE()) 
            ELSE
                TIMESTAMPDIFF(YEAR, M.FECHA_NACIMIENTO_MASCOTA, CURDATE())
        END,
        CASE 
            WHEN TIMESTAMPDIFF(YEAR, M.FECHA_NACIMIENTO_MASCOTA, CURDATE()) < 1 THEN
                ' meses)'
            ELSE
                ' años)'
        END
    ) AS 'Mascota'
FROM 
    TB_USUARIO U 
INNER JOIN 
    TB_MASCOTAS M  ON U.ID_USUARIO = M.ID_USUARIO
JOIN 
    TB_CITAS C ON C.ID_MASCOTA = M.ID_MASCOTA;

CREATE OR REPLACE VIEW VW_HISTORIAL_FICHAS
AS 
SELECT 
	M.NOMBRE_MASCOTA AS 'Nombre Mascota',
    CONCAT(SUBSTRING_INDEX(NOMBRES_USUARIO, ' ', 1), ' ', SUBSTRING_INDEX(APELLIDOS_USUARIO, ' ', 1)) AS 'Propietario',
    F.FECHA_CREACION AS 'Fecha',
    CONCAT( 'Diagnóstico: ', F.DIAGNOSTICO, '\n', 'Tratamiento: ', F.TRATAMIENTO) AS 'Detalle consulta'
	
FROM 
	TB_FICHA_MEDICA F INNER JOIN TB_CITAS C 
    ON F.ID_CITA = C.ID_CITA INNER JOIN TB_MASCOTAS M 
    ON C.ID_MASCOTA = M.ID_MASCOTA INNER JOIN TB_USUARIO U
    ON M.ID_USUARIO = U.ID_USUARIO
ORDER BY F.FECHA_CREACION DESC; 


----------------- TRIGGERS --------------------
CREATE TABLE TB_AUDITA_CITAS(
	ID_CITA INT,
    ID_MASCOTA INT,
    FECHA_HORA_CITA DATETIME,
    MOTIVO_CITA VARCHAR(50),
    UPDATED_AT DATETIME NOT NULL,
    USUARIO VARCHAR(50) NOT NULL,
    OPERATION CHAR(3),
    CHECK(OPERATION ='INS' OR OPERATION = 'DEL' OR OPERATION = 'UPD')
);

DELIMITER //

CREATE TRIGGER TGR_INSERT_CITAS
AFTER INSERT ON TB_CITAS
FOR EACH ROW
BEGIN
    INSERT INTO TB_AUDITA_CITAS (
        ID_CITA,
        ID_MASCOTA,
        FECHA_HORA_CITA,
        MOTIVO_CITA,
        UPDATED_AT,
        USUARIO,
        OPERATION
    )
    VALUES (
        NEW.ID_CITA,
        NEW.ID_MASCOTA,
        NEW.FECHA_HORA_CITA,
        NEW.MOTIVO_CITA,
        NOW(),
        USER(),
        'INS'
    );
END //

DELIMITER ;


DELIMITER //

CREATE TRIGGER TGR_DELETE_CITAS
AFTER DELETE ON TB_CITAS
FOR EACH ROW
BEGIN
    INSERT INTO TB_AUDITA_CITAS (
        ID_CITA,
        ID_MASCOTA,
        FECHA_HORA_CITA,
        MOTIVO_CITA,
        UPDATED_AT,
        USUARIO,
        OPERATION
    )
    VALUES (
        OLD.ID_CITA,
        OLD.ID_MASCOTA,
        OLD.FECHA_HORA_CITA,
        OLD.MOTIVO_CITA,
        NOW(),
        USER(),
        'DEL'
    );
END //

DELIMITER ;


DELIMITER //

CREATE TRIGGER TGR_UPDATE_CITAS
AFTER UPDATE ON TB_CITAS
FOR EACH ROW
BEGIN
    INSERT INTO TB_AUDITA_CITAS (
        ID_CITA,
        ID_MASCOTA,
        FECHA_HORA_CITA,
        MOTIVO_CITA,
        UPDATED_AT,
        USUARIO,
        OPERATION
    )
    VALUES (
        NEW.ID_CITA,
        NEW.ID_MASCOTA,
        NEW.FECHA_HORA_CITA,
        NEW.MOTIVO_CITA,
        NOW(),
        USER(),
        'UPD'
    );
END //

DELIMITER ;


CREATE TABLE TB_AUDITA_FICHA_MEDICA(
	ID_FICHA INT, 
    ID_CITA INT, 
    FECHA_CREACION DATETIME NOT NULL, 
    ANTECEDENTES VARCHAR(255) NOT NULL,
    DIAGNOSTICO VARCHAR(255) NOT NULL, 
    TRATAMIENTO VARCHAR(255) NOT NULL,
    UPDATED_AT DATETIME NOT NULL,
    USUARIO VARCHAR(50) NOT NULL,
    OPERATION CHAR(3),
    CHECK(OPERATION ='INS' OR OPERATION = 'DEL' OR OPERATION = 'UPD')
);

DELIMITER //

CREATE TRIGGER TGR_INSERT_FICHAS
AFTER INSERT ON TB_FICHA_MEDICA
FOR EACH ROW
BEGIN
    INSERT INTO TB_AUDITA_FICHA_MEDICA(
		ID_FICHA,
		ID_CITA,
		FECHA_CREACION, 
		ANTECEDENTES,
		DIAGNOSTICO, 
		TRATAMIENTO, 
        UPDATED_AT,
        USUARIO,
        OPERATION
    )
    VALUES (
        NEW.ID_FICHA,
        NEW.ID_CITA,
        NEW.FECHA_CREACION,
        NEW.ANTECEDENTES,
        NEW.DIAGNOSTICO,
        NEW.TRATAMIENTO,
        NOW(),
        USER(),
        'INS'
    );
END //

DELIMITER ;


DELIMITER //

CREATE TRIGGER TGR_DELETE_FICHAS
AFTER DELETE ON TB_FICHA_MEDICA
FOR EACH ROW
BEGIN
    INSERT INTO TB_AUDITA_FICHA_MEDICA (
		ID_FICHA,
		ID_CITA,
		FECHA_CREACION, 
		ANTECEDENTES,
		DIAGNOSTICO, 
		TRATAMIENTO, 
        UPDATED_AT,
        USUARIO,
        OPERATION
    )
    VALUES (
        OLD.ID_FICHA,
        OLD.ID_CITA,
        OLD.FECHA_CREACION,
        OLD.ANTECEDENTES,
        OLD.DIAGNOSTICO,
        OLD.TRATAMIENTO,
        NOW(),
        USER(),
        'DEL'
    );
END //

DELIMITER ;


DELIMITER //

CREATE TRIGGER TGR_UPDATE_FICHAS
AFTER UPDATE ON TB_FICHA_MEDICA
FOR EACH ROW
BEGIN
    INSERT INTO TB_AUDITA_FICHA_MEDICA (
		ID_FICHA,
		ID_CITA,
		FECHA_CREACION, 
		ANTECEDENTES,
		DIAGNOSTICO, 
		TRATAMIENTO, 
        UPDATED_AT,
        USUARIO,
        OPERATION
    )
    VALUES (
        NEW.ID_FICHA,
        NEW.ID_CITA,
        NEW.FECHA_CREACION,
        NEW.ANTECEDENTES,
        NEW.DIAGNOSTICO,
        NEW.TRATAMIENTO,
        NOW(),
        USER(),
        'UPD'
    );
END //

DELIMITER ;

