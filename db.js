
const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "repertorio",
  password: "1234",
  port: "5432",
  max: 12,
  min: 2,
  idleTimeoutMillis: 3000,
  connectTimeoutMillis: 2000,
});

async function insertar(cancion, artista, tono) {
  const client = await pool.connect();
  const { rows } = await client.query({
    text: `insert into repertorio (cancion, artista, tono) values ($1, $2, $3) returning*`,
    values: [cancion, artista, tono],
  })
  client.release();
  return rows[0];
}

async function consultar() {
  const client = await pool.connect()
  const { rows } = await client.query(`select * from repertorio`);
  client.release();
  return rows;
}

async function actualizar(id,cancion, artista, tono) {
  const client = await pool.connect();
  const { rows } = await client.query({
    text: `update repertorio set  cancion=$2, artista=$3, tono=$4  where id=$1 returning*`,
    values: [id,cancion, artista, tono],
  });
  client.release();
 
  return rows[0];
}

async function eliminar(id) {
  const client = await pool.connect();
  const { rows } = await client.query({
    text: `delete from repertorio where id=$1 returning*`,
    values: [id],
  });
  client.release();
  return rows[0];
}

module.exports={insertar,consultar,actualizar,eliminar}
