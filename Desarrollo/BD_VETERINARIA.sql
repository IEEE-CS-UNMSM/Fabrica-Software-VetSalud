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
    ENAIL_USUARIO VARCHAR(100) UNIQUE NOT NULL,
    PASSWORD_USUARIO VARCHAR(50) NOT NULL, 
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
    IMAGEN_MASCOTA BLOB NOT NULL,
    EVIDENCIA_MASCOTA BLOB NOT NULL,
    
    CONSTRAINT FK_USUARIO01 FOREIGN KEY(ID_USUARIO) REFERENCES TB_USUARIO(ID_USUARIO) 
);

CREATE TABLE TB_CITAS(
	ID_CITA INT AUTO_INCREMENT PRIMARY KEY,
    ID_USUARIO INT,
    COD_CITA INT NOT NULL, 
    FECHA_HORA_CITA DATETIME,
    MOTIVO_CITA VARCHAR(50),
    
	CONSTRAINT FK_USUARIO02 FOREIGN KEY(ID_USUARIO) REFERENCES TB_USUARIO(ID_USUARIO) 
);

/* Registro administrador
	INSERT INTO TB_USUARIO(DNI_USUARIO_,NOMBRES_USUARIO, APELLIDOS_USUARIO DIRECCION_USUARIO, 
		CELULAR_USUARIO, ENAIL_USUARIO, PASSWORD_USUARIO, ROL_USUARIO)
	VALUES ()
    )
*/