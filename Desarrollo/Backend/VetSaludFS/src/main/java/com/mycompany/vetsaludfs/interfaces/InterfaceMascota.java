package com.mycompany.vetsaludfs.interfaces;

import com.mycompany.vetsaludfs.model.Mascota;
import java.sql.SQLException;
import java.util.List;

public interface InterfaceMascota {
    public int insertar(Mascota pet) throws SQLException;
    
    public int eliminar(Mascota pet) throws SQLException;
    
    public int modificar(Mascota pet) throws SQLException;
    
    public List<Mascota> listar() throws SQLException;
}
