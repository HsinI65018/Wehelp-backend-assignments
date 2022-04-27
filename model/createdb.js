const pool = require('./model/utility.js');

pool.getConnection((err, connection) => {
    if(err){
        console.log(err)
    }else{
        connection.query('CREATE DATABASE dashboard', (err, result) => {
            console.log(result);
            connection.release();
        })
    }
})

pool.getConnection((err, connection) => {
    if(err){
        console.log(err)
    }else{
        connection.query('CREATE Table message (id INT PRIMARY KEY AUTO_INCREMENT, message VARCHAR(255),filePath VARCHAR(255))', (err, result) => {
            console.log(result);
            connection.release();
        })
    }
})