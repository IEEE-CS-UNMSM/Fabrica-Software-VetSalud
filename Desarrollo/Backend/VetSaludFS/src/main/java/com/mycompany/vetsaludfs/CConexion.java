package com.mycompany.vetsaludfs;

import java.sql.*;
import javax.swing.JOptionPane;

public class CConexion {
    private static Connection conectar = null;
    private static final String USUARIO = "root";
    private static final String CONTRASENA = "root";
    private static final String BD = "bd_veterinaria";
    private static final String IP = "localhost";
    private static final String PUERTO = "3306";
    
    private static final String CADENA = "jdbc:mysql://"+IP+":"+PUERTO+"/"+BD;  //jdbc:mysql://localhost:3306/bd_veterinaria
    
    public static Connection estableceConexion(){
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conectar = DriverManager.getConnection(CADENA,USUARIO,CONTRASENA);
            System.out.println("Se realizo la conexion");
        } catch (Exception e) {
            System.out.println("No se realizo la conexion. Error: " + e);
        }
        return conectar;
    } 
    
    //Cierre del ResultSet
    public static void close (ResultSet rs){
        try {
            if (rs != null) {
                rs.close () ;
            } 
        }catch (SQLException sql){
            sql.printStackTrace();
        }
    }
          
    //Cierre del PrepareStatement
    public static void close (PreparedStatement stmt){
        try {
            if (stmt != null) 
                stmt.close() ;
        }catch (SQLException sql){
            sql.printStackTrace ( ) ;
        }
    }
    
    //Cierre de la conexión
    public static void close (Connection conn){
        try{
            if (conn != null)
                conn.close();
        }catch(SQLException sql){
            sql.printStackTrace();
        }
        
    }
}
