const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ruleEngine', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});

module.exports = mongoose;
