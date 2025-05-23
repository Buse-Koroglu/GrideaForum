const mysql = require('mysql2/promise');


const connectionConfig ={
    host : 'localhost',
    user : 'root',
    password : 'BuseMy05.19',
    database : 'mydb' 
};

const connectConfig = async () => {
    try {
         const connection = await mysql.createConnection(connectionConfig);
          return connection ;
         
    } catch (error) {
        console.log("Veritabanına Bağlanamadı...")
        throw error;
    }
}

module.exports = { config : connectConfig  } ;