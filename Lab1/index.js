const express = require('express');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

const node_session_secret = '2ec62a80-7111-4ca6-9a89-af20d800e0ef';

app.use(session({ 
    secret: node_session_secret, 
	saveUninitialized: false, 
	resave: true
}));

// Routes
app.get('/', (req, res) => {
    if(req.session.pageHits == null) {
        req.session.pageHits = 0;
    }
    if(req.session.color == null) {
        req.session.color = 'black';
    }
    if(req.session.bgColor == null) {
        req.session.bgColor = 'white';
    }

    res.send(`
        <body style="color:${req.session.color}; background-color:${req.session.bgColor};">
            <button onclick="location.href='/up'">Up</button>
            <span style="font-size: 2em;">${req.session.pageHits}</span>
            <button onclick="location.href='/down'">Down</button>
        </body>
    `);
});

app.get('/up', (req, res) => {
    req.session.pageHits++;    
    res.redirect('/');
});

app.get('/down', (req, res) => {
    req.session.pageHits--;
    res.redirect('/');
});

app.get('/changeStyle', (req, res) => {
    var color = req.query.color;
    var bgColor = req.query.bg;

    if(color) {
        req.session.color = color;
    }
    if(bgColor) {
        req.session.bgColor = bgColor;
    }
    res.redirect('/');
    
});

app.get(/.*/, (req,res) => {
	res.status(404);
	res.send("Page not found - 404");
})

app.listen(port, () => {
	console.log("Node application listening on port "+ port);
}); 