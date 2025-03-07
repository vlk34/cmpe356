package com.group28.Stride.util;

import io.github.cdimascio.dotenv.Dotenv;
import java.sql.*;

public class Database {
    public static void basicQuery(String query) {
        Dotenv dotenv = Dotenv.configure()
                .directory("backend")
                .load();

        try {
            Connection connection = DriverManager.getConnection(String.format("jdbc:postgresql://%s:%s/%s", dotenv.get("DB_HOST"), dotenv.get("DB_PORT"), dotenv.get("DB_NAME")), dotenv.get("DB_USER"), dotenv.get("DB_PASSWORD"));
            Statement statement = connection.createStatement();
            ResultSet res = statement.executeQuery(query);
            while (res.next()) {
                System.out.println(res.getString("title"));
            }
            res.close();
            statement.close();
            connection.close();
        } catch (SQLException ex) {
            System.out.println("Database Error");
        }
    }
}
