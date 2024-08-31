express makes routing easier

res.send() method automatically sets the content type after inferring the request, automatically sets status code as well

res.sendFile() used for routing looks for the absolute path
we can specify the root of the directory after entering the relative path
res.sendFile('relative path', {root: __dirname});

order of middleware is very important
middleware can be used for authentication
app.use() method is an example of middleware

install morgan as a middleware which is a logger

install mongoose
goto mongodb atlas collections create db
name ur db
create user and password and give read/write access


we work with mongodb and mongoose by creating schema first

sending post requests from create blog form can be done using api or directly from webform itself



Isues that i personally faced:
running nodemon: environment variables and path
mongodb connect-ip address not allowed



app.js
const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');

const Blog=require('./models/blogs');

// express app
const app = express();//create an instance of express

//mongodb uri:
const dbURI='mongodb+srv://Grace:ergrtbtrhrt1232345y@cluster0.4jq8n.mongodb.net/node1?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)//additional parameters to prevent deprecation warnings
//the above is a callback function that returns a promise. So we can make use of the then function

    .then((result)=>app.listen(3000)) //we want the app to listen only after establishing connecion to db
    .catch((err)=>console.log(err));

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

//invoke morgan middleware
app.use(express.static('public'));//helps us use images or files in public folder

app.use(morgan('dev')); //dev is for formatting

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


//basic routes:
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  // console.log(req.body);
  const blog = new Blog(req.body);

  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});