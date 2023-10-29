package com.mycompany.vetsaludfs.interfaces;

import com.mycompany.vetsaludfs.model.Usuario;
import java.sql.SQLException;
import java.util.List;

public interface InterfaceUsuario {
    public int insertar(Usuario user) throws SQLException;
    
    public int eliminar(Usuario user) throws SQLException;
    
    public int modificar(Usuario user) throws SQLException;
    
    public List<Usuario> listar() throws SQLException;
}
