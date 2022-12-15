const mysql = require('mysql2/promise');

// variáveis de ambiente
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

// é necessário que seja assim pois o projeto não autoriza variáveis de ambiente
// que não esteja na lista de testes
const connection = mysql.createPool({
  host: MYSQL_HOST || 'localhost',
  port: MYSQL_PORT || 3306,
  user: MYSQL_USER || 'root',
  password: MYSQL_PASSWORD || 'password',
  database: MYSQL_DATABASE || 'StoreManager',
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,
});

module.exports = connection;