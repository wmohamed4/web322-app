
/*********************************************************************************
WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca 
Academic Policy.  
No part of this assignment has been copied manually or electronically from 
any other source (including 3rd party web sites) or distributed to other 
students
Name: Warsan Mohamed 
Student ID: 31055155
Date: Oct 15 2024 
Vercel Web App URL: 
GitHub Repository URL: 

********************************************************************************/ 

const express = require('express');
const path = require('path');
const storeService = require('./store-service');

const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static('public'));

// Redirect root to /about
app.get('/', (req, res) => {
  res.redirect('/about');
});

// About route to serve the about.html file
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Shop route to render the shop.ejs with the items data
app.get('/shop', (req, res) => {
  storeService.getPublishedItems()
    .then((items) => {
      res.render('shop', { items });
    })
    .catch((err) => res.status(500).send('Error fetching shop items'));
});

// Items route
app.get('/items', (req, res) => {
  storeService.getAllItems()
    .then((items) => {
      res.render('items', { items });
    })
    .catch((err) => res.status(500).send('Error fetching items'));
});


// Categories route
app.get('/categories', (req, res) => {
  storeService.getCategories()
    .then((categories) => {
      res.render('categories', { categories });
    })
    .catch((err) => res.status(500).send('Error fetching categories'));
});


// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Start the server after initializing the store service
storeService.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Express http server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`Unable to start the server: ${err}`);
  });
