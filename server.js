const express = require('express');
const data = require('./data.json');

const app = express();

app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    setTimeout(() => {
        res.json(data[id].repos);
    }, 500);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`API server is running on port ${PORT}...`));