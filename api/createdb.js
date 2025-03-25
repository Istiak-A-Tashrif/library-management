// createDatabase.js

const { Client } = require('pg');

// Prompt the user for database connection details
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptUser = (query) => {
  return new Promise((resolve) => readline.question(query, resolve));
};

(async () => {
  const dbUser = await promptUser('Enter the PostgreSQL username [default: postgres]: ') || 'postgres';
  const dbPassword = await promptUser('Enter the PostgreSQL password [default: empty]: ') || '';
  const dbHost = await promptUser('Enter the PostgreSQL host [default: localhost]: ') || 'localhost';
  const dbPort = await promptUser('Enter the PostgreSQL port [default: 5432]: ') || '5432';
  const dbName = await promptUser('Enter the name of the database to connect to [default: postgres]: ') || 'postgres';
  const newDbName = await promptUser('Enter the database name to create if it doesn\'t exist: ');

  readline.close();

  const connectionString = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

  const client = new Client({ connectionString });

  try {
    await client.connect();

    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname='${newDbName}'`);
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${newDbName}"`);
    } else {
    }
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  } finally {
    await client.end();
  }
})();
