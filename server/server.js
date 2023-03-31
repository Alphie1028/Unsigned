const express = require('express');
const{Pool} = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'mydb',
    password: 'password',
    port: 5432
})


//USER ROUTES


// GET /users
app.get('/users', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET /users/:id
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST /users
app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const { rows } = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password],
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// PUT /users/:id
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const { rows } = await pool.query(
            'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
            [name, email, password, id],
        );
        if (rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// DELETE /users/:id
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


//GROUP ROUTES


// GET /groups
app.get('/groups', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM groups');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /groups/:id
app.get('/groups/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM groups WHERE id = $1', [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Group not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /groups
app.post('/groups', async (req, res) => {
    const { name, description, creator_id } = req.body;
    try {
        const { rows } = await pool.query(
            'INSERT INTO groups (name, description, creator_id) VALUES ($1, $2, $3) RETURNING *',
            [name, description, creator_id]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /groups/:id
app.put('/groups/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const { rows } = await pool.query(
            'UPDATE groups SET name = $1, description = $2 WHERE id = $3 RETURNING *',
            [name, description, id]
        );
        if (rows.length === 0) {
            res.status(404).json({ error: 'Group not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /groups/:id
app.delete('/groups/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('DELETE FROM groups WHERE id = $1 RETURNING *', [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Group not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});











app.listen(3000, () => {
    console.log('Server listening on port 3000')
})