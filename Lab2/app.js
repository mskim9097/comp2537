const express = require('express');

const app = express();
const port = process.env.PORT || 3018;

const fs = require('fs');

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Index
app.get('/', (req, res) => {
    res.render("index");
});

// Color Indexes
app.get(/^\/(red|blue|green)$/, (req, res) => {
    const color = req.params[0];
    res.render('color', { color });
});

// Color Pages with Sizes
app.get(/^\/(red|blue|green)\/(20|30|40)$/, (req, res) => {
    const match = req.url.match(/^\/(red|blue|green)\/(20|30|40)$/);

    const color = match[1];
    const size = match[2];

    res.render('color-size', { color, size });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});