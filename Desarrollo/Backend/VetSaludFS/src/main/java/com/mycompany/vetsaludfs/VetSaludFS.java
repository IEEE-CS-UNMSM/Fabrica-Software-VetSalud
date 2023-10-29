package com.mycompany.vetsaludfs;

import com.mycompany.vetsaludfs.dao.DAOMascota;
import com.mycompany.vetsaludfs.dao.DAOUsuario;
import com.mycompany.vetsaludfs.model.Mascota;
import com.mycompany.vetsaludfs.model.Usuario;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class VetSaludFS {

    public static void main(String[] args) throws SQLException {     
        DAOUsuario user = new DAOUsuario();
        DAOMascota pets = new DAOMascota();
        List<Mascota> pet = new ArrayList <>();        
        Usuario usuario = user.obtenerUsuario("DNI");
        
        //Usuario
        System.out.println("----------Informacion de cliente-----------");
        System.out.println("Nombres: " + usuario.getNombres());
        System.out.println("Apellidos: " + usuario.getApellidos());
        System.out.println("DNI: " + usuario.getDni());
        System.out.println("Email: " + usuario.getEmail());
        System.out.println("Celular: " + usuario.getCelular());
        
        //Mascota o mascotas
        pet = pets.obtenerMascotaPorIdUsuario(usuario.getIdUsuario());
        System.out.println("----------Mascotas-----------");
        
        for (Mascota mascota : pet){
            System.out.println("Nombre de la mascota: " + mascota.getNombreMascota());
            System.out.println("Especie de la mascota: " + mascota.getEspecieMascota());
            System.out.println("Raza de la mascota: " + mascota.getRazaMascota());
            System.out.println("Sexo de la mascota: " + mascota.getSexoMascota());
            System.out.println("Fecha de nacimiento de la mascota: " + mascota.getFechaNacimientoMascota());
        }
    }
}
