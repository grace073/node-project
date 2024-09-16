const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests
<<<<<<< HEAD
const dbURI = 'mongodb+srv://Grace:FqOCf3eYOYhukkiS@cluster0.4jq8n.mongodb.net/node1?retryWrites=true&w=majority&tls=true&appName=Cluster0';
=======
const dbURI = 'mongodb+srv://***@cluster0.4jq8n.mongodb.net/node1?retryWrites=true&w=majority&tls=true&appName=Cluster0';
>>>>>>> cc8329c5fdefe5002d33077b7388bd761dbcb2ba

mongoose.connect(dbURI)
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
