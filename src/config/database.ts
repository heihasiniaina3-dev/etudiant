import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'std25002',
  host: 'localhost',
  database: 'etudiant',
  port: 5432,
});