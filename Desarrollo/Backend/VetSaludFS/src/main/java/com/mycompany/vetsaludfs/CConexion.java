package com.mycompany.vetsaludfs;

import java.sql.Connection;
import java.sql.DriverManager;
import javax.swing.JOptionPane;

public class CConexion {
    Connection conectar = null;
    String usuario = "root";
    String contraseña = "";
    String bd = "bd_veterinaria";
    String ip = "localhost";
    String puerto = "3306";
    
    String cadena = "jdbc:mysql://"+ip+":"+puerto+"/"+bd;  //jdbc:mysql://localhost:3306/bd_veterinaria
    
    public Connection estableceConexion(){
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conectar = DriverManager.getConnection(cadena,usuario,contraseña);
            JOptionPane.showMessageDialog(null, "Se realizo la conexion");
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "No se realizo la conexion"+e.toString());
        }
        return conectar;
    } 
}
