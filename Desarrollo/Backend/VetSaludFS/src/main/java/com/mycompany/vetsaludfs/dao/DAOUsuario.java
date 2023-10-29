package com.mycompany.vetsaludfs.dao;

import com.mycompany.vetsaludfs.CConexion;
import com.mycompany.vetsaludfs.interfaces.InterfaceUsuario;
import com.mycompany.vetsaludfs.model.Usuario;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DAOUsuario implements InterfaceUsuario{
    
    private final String SQL_SELECT = "SELECT * FROM tb_usuario";
    
    @Override
    public int insertar(Usuario user) throws SQLException {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public int eliminar(Usuario user) throws SQLException {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public int modificar(Usuario user) throws SQLException {
        throw new UnsupportedOperationException("Not supported yet."); 
    }

    @Override
    public List<Usuario> listar() throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Usuario user = new Usuario();
        List <Usuario> listUser = new ArrayList<>();
        try{
            conn = CConexion.estableceConexion();
            stmt = conn.prepareStatement(SQL_SELECT);
            rs = stmt.executeQuery();
            while(rs.next()){
                user.setIdUsuario(rs.getInt("ID_USUARIO"));
                user.setDni(rs.getString("DNI_USUARIO"));
                user.setNombres(rs.getString("NOMBRES_USUARIO"));
                user.setApellidos(rs.getString("APELLIDOS_USUARIO"));
                user.setDireccion(rs.getString("DIRECCION_USUARIO"));
                user.setCelular(rs.getInt("CELULAR_USUARIO"));
                user.setEmail(rs.getString("ENAIL_USUARIO"));
                user.setRol(rs.getString("ROL_USUARIO"));
                listUser.add(user);
            }
        }catch(SQLException sql){
            sql.printStackTrace();
        }finally{
            CConexion.close(stmt);
            CConexion.close(rs);
        }
        return listUser;
    }
    
}
