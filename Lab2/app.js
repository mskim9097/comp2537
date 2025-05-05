const express = require('express');

const app = express();
const port = process.env.PORT || 3018;

const fs = require('fs');

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Index
app.get('/', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/index.html', 'utf8');
    res.send(html);
});

// Color Indexes
app.get('/blue', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/blue.html', 'utf8');
    res.send(html);
});
app.get('/red', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/red.html', 'utf8');
    res.send(html);
});
app.get('/green', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/green.html', 'utf8');
    res.send(html);
});

// Color Pages with Sizes
app.get('/blue/20', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/blue20.html', 'utf8');
    res.send(html);
});
app.get('/blue/30', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/blue30.html', 'utf8');
    res.send(html);
});
app.get('/blue/40', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/blue40.html', 'utf8');
    res.send(html);
});
app.get('/red/20', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/red20.html', 'utf8');
    res.send(html);
});
app.get('/red/30', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/red30.html', 'utf8');
    res.send(html);
});
app.get('/red/40', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/red40.html', 'utf8');
    res.send(html);
});
app.get('/green/20', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/green20.html', 'utf8');
    res.send(html);
});
app.get('/green/30', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/green30.html', 'utf8');
    res.send(html);
});
app.get('/green/40', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/green40.html', 'utf8');
    res.send(html);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});