import mysql from 'mysql2/promise';

interface DBConfig {
  host: string;
  user: string | undefined;
  password: string | undefined;
  database: string | undefined;
  port: number;
}

const dbConfig: DBConfig = {
  host: 'sql7.freemysqlhosting.net',
  user: 'sql7739893',
  password: 'hM42HmgAq5',
  database: 'sql7739893',
  port: 3306,
};

const pool: mysql.Pool = mysql.createPool(dbConfig);

pool
  .getConnection()
  .then((connection) => {
    console.log('Database connected successfully');
    connection.release();
  })
  .catch((error: Error) => {
    console.error('Error connecting to the database:', error.message);
  });

export default pool;
