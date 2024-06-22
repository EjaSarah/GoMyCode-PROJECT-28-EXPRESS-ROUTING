const express = require('express');
const app = express();
const path = require('path');

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware to check working hours
function checkWorkingHours(req, res, next) {
    const date = new Date();
    const day = date.getDay();
    const hour = date.getHours();
    
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.send("The web application is only available during working hours (Monday to Friday, from 9 to 17).");
    }
}

// Use the middleware
app.use(checkWorkingHours);

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
