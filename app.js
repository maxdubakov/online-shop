const path = require('path'); // (1) for getting a path to different file on different machines

const express = require('express'); // (2) working with all the backend stuff
const bodyParser = require('body-parser'); // (3)

const app = express(); // for spinning up the server !!!and all the next executions!!!

const adminRoutes = require('./routes/admin'); 
const shopRoutes = require('./routes/shop'); 


app.use(bodyParser.urlencoded({ extended: true })); // (3) for parsing a user's information, currently an item ordered
app.use(express.static(path.join(__dirname, 'public'))); // (4) for detached css files working on the server

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);