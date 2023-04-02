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


//******************************************************************************************************************USER ROUTES
//Used to validate users for sign in page
app.get('/users', async (req, res) => {
    const { email, password } = req.query;
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({message:'User not found'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET /users/:user_id/groups
app.get('/users/:user_id/groups', async (req, res) => {
    const { user_id } = req.params;
    try {
        const { rows } = await pool.query(
            'SELECT groups.* FROM groups JOIN group_members ON groups.id=group_members.group_id WHERE group_members.user_id=$1',
            [user_id]
        );
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

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


//******************************************************************************************************************GROUP ROUTES


//GET GROUPS BY CREATOR
app.get('/users/:userId/creator', async (req, res) => {
    const userId = parseInt(req.params.userId);

    try {
        const groups = await pool.query(
            `SELECT * FROM groups WHERE creator_id = $1`,
            [userId]
        );

        res.json(groups.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



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


//******************************************************************************************************************GROUP MEMBER ROUTES


// Get all group members
app.get('/group_members', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM group_members');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a specific group member
app.get('/group_members/:group_id/:user_id', async (req, res) => {
  const { group_id, user_id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM group_members WHERE group_id=$1 AND user_id=$2', [group_id, user_id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Group member not found' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new group member
app.post('/group_members', async (req, res) => {
  const { group_id, user_id } = req.body;
  try {
    await pool.query('INSERT INTO group_members (group_id, user_id) VALUES ($1, $2)', [group_id, user_id]);
    res.status(201).json({ message: 'Group member created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update an existing group member
app.put('/group_members/:group_id/:user_id', async (req, res) => {
  const { group_id, user_id } = req.params;
  const { new_group_id, new_user_id } = req.body;
  try {
    const { rowCount } = await pool.query('UPDATE group_members SET group_id=$1, user_id=$2 WHERE group_id=$3 AND user_id=$4', [new_group_id, new_user_id, group_id, user_id]);
    if (rowCount === 0) {
      res.status(404).json({ message: 'Group member not found' });
    } else {
      res.status(200).json({ message: 'Group member updated successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a group member
app.delete('/group_members/:group_id/:user_id', async (req, res) => {
  const { group_id, user_id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM group_members WHERE group_id=$1 AND user_id=$2', [group_id, user_id]);
    if (rowCount === 0) {
      res.status(404).json({ message: 'Group member not found' });
    } else {
      res.status(200).json({ message: 'Group member deleted successfully' });
    }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


//******************************************************************************************************************POST ROUTES


// GET all posts
app.get('/posts', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM posts');
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).send(err);
    }
});

// GET post by ID
app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).send(`Post with ID ${id} not found.`);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

// CREATE post
app.post('/posts', async (req, res) => {
    const { title, content, author_id, group_id } = req.body;
    try {
        const { rows } = await pool.query(
            'INSERT INTO posts (title, content, author_id, group_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, content, author_id, group_id]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(400).send(err);
    }
});

// UPDATE post by ID
app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, author_id, group_id } = req.body;
    try {
        const { rows } = await pool.query(
            'UPDATE posts SET title = $1, content = $2, author_id = $3, group_id = $4 WHERE id = $5 RETURNING *',
            [title, content, author_id, group_id, id]
        );
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).send(`Post with ID ${id} not found.`);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

// DELETE post by ID
app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).send(`Post with ID ${id} not found.`);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});


//******************************************************************************************************************COMMENT ROUTES


// Create a new comment
app.post('/comments', async (req, res) => {
    try {
        const { content, author_id, post_id } = req.body;
        const newComment = await pool.query(
            'INSERT INTO comments (content, author_id, post_id) VALUES ($1, $2, $3) RETURNING *',
            [content, author_id, post_id]
        );
        res.json(newComment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get all comments for a specific post
app.get('/posts/:postId/comments', async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await pool.query(
            'SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC',
            [postId]
        );
        res.json(comments.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get a specific comment by id
app.get('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await pool.query(
            'SELECT * FROM comments WHERE id = $1',
            [id]
        );
        res.json(comment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update a comment
app.put('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const updatedComment = await pool.query(
            'UPDATE comments SET content = $1 WHERE id = $2 RETURNING *',
            [content, id]
        );
        res.json(updatedComment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete a comment
app.delete('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await pool.query(
            'DELETE FROM comments WHERE id = $1 RETURNING *',
            [id]
        );
        res.json(deletedComment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})