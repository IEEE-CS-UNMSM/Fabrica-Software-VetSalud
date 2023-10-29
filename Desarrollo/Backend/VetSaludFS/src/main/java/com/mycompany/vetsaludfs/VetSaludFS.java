package com.mycompany.vetsaludfs;

import com.mycompany.vetsaludfs.dao.DAOMascota;
import com.mycompany.vetsaludfs.dao.DAOUsuario;
import com.mycompany.vetsaludfs.model.Mascota;
import com.mycompany.vetsaludfs.model.Usuario;
import java.sql.SQLException;
import java.time.LocalDate;

public class VetSaludFS {

    public static void main(String[] args) throws SQLException {
        System.out.println("Hello World!");

        /*DAOUsuario user = new DAOUsuario();
        for (Usuario usuarios : user.listar()){
            System.out.println("Nombres: " + usuarios.getNombres());
            System.out.println("Apellidos: " + usuarios.getApellidos());
        }*/
        Mascota pet = new Mascota (); 
        DAOMascota pets = new DAOMascota();
        pet.setIdUsuario(1);
        pet.setNombreMascota("Bartolo");
        pet.setEspecieMascota("Perro");
        pet.setRazaMascota("Bulldog");
        pet.setSexoMascota('M');
        LocalDate hoy = LocalDate.now();
        pet.setFechaNacimientoMascota(hoy);
        pets.insertar(pet);
    }
}
