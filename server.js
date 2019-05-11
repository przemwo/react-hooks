const express = require('express');

const app = express();


const data = {
    1: [
        { id: 1, title: 'Foo 1' },
        { id: 2, title: 'Foo 2' },
        { id: 3, title: 'Foo 3' },
    ],
    2: [
        { id: 4, title: 'Bar 1' },
        { id: 5, title: 'Bar 2' },
        { id: 6, title: 'Bar 3' },
    ]
};

app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    res.json(data[id]);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`API server is running on port ${PORT}...`));