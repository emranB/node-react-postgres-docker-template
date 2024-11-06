const express = require('express');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const cors = require('cors');

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const app = express();
app.use(cors({
  origin: /^http:\/\/localhost(:\d+)?$/
}));
app.use(express.json());

const pool = new Pool(config.database);
const PORT = config.server.port || 3000;

app.get('/', async (req, res) => {
  try {
    const result = `Server running ok.`
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/get_users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/get_user_by_id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE uuid = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/create_user', async (req, res) => {
  try {
    const { fname, lname, age } = req.body;
    const id = uuidv4();
    await pool.query(
      'INSERT INTO users (uuid, fname, lname, age) VALUES ($1, $2, $3, $4)',
      [id, fname, lname, age]
    );
    res.json({ message: 'User created', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/delete_user_by_id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE uuid = $1', [id]);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/update_user_by_id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { fname, lname, age } = req.body;
    await pool.query(
      'UPDATE users SET fname = $1, lname = $2, age = $3 WHERE uuid = $4',
      [fname || null, lname || null, age || null, id]
    );
    res.json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
