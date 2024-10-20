const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); // Database config
const ruleRoutes = require('./routes/rules');
const Rule = require('./models/Rule');
const app = express();
const path=require('path');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
// Routes
app.use('/rules', ruleRoutes);

// Home route
app.get('/', async (req, res) => {
    const rules = await Rule.find();  // Fetch all rules from the database
    res.render('index', { rules });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
