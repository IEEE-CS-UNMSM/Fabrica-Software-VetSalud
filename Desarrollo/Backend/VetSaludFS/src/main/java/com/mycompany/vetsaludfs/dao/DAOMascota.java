package com.mycompany.vetsaludfs.dao;

import com.mycompany.vetsaludfs.CConexion;
import com.mycompany.vetsaludfs.interfaces.InterfaceMascota;
import com.mycompany.vetsaludfs.model.Mascota;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

public class DAOMascota implements InterfaceMascota {
    
    private final String SQL_INSERT = "INSERT INTO tb_mascotas (ID_USUARIO, NOMBRE_MASCOTA,"
            + "ESPECIE_MASCOTA, SEXO_MASCOTA,"
            + "RAZA_MASCOTA, FECHA_NACIMIENTO_MASCOTA) VALUES (?, ?, ?, ?, ?, ?)";
    //"+ "IMAGEN_MASCOTA, EVIDENCIA_MASCOTA //Desactivado Not Null en BD
    
    @Override
    public int insertar(Mascota pet) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        int rows = 0;
        try{
            conn = CConexion.estableceConexion();
            stmt = conn.prepareStatement(SQL_INSERT);
            stmt.setInt(1, pet.getIdUsuario());
            stmt.setString(2, pet.getNombreMascota());
            stmt.setString(3, pet.getEspecieMascota());
            stmt.setString(4, String.valueOf(pet.getSexoMascota()));
            stmt.setString(5, pet.getRazaMascota());
            stmt.setDate(6, java.sql.Date.valueOf(pet.getFechaNacimientoMascota()));
            //Imagen_Mascota
            //EvidenciaMascota
            rows = stmt.executeUpdate();
        }finally{
            CConexion.close(stmt);
            CConexion.close(conn);
        }
        return rows;
    }

    @Override
    public int eliminar(Mascota pet) throws SQLException {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public int modificar(Mascota pet) throws SQLException {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public List<Mascota> listar() throws SQLException {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
