const express = require('express');
const morgan = require('morgan');
const mongoose =require('mongoose');
const dbURI = 'mongodb+srv://akram:akram123@cluster1.t5o5h.mongodb.net/Blogdb?retryWrites=true&w=majority';
const Blog = require('./models/Blogs');
const { urlencoded } = require('express');
mongoose.connect(dbURI).then(result=>app.listen(3000)).catch((err)=>console.log(err));
// express app
const app = express();

// listen for requests
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');
app.get('/', (req, res) => {
  res.redirect('/blogs');
});
// show Blogs 
app.get('/blogs',(req,res)=>{
  Blog.find().sort({CreatedAt : -1 }).then((result)=>{
    res.render('index',{title : 'all blogs ' , blogs : result});
  }
  ).catch((err)=>console.log(err));
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

//CREATE BLOG   /
app.post('/blogset',(req,res)=>{
  const blog = new Blog (req.body)
  blog.save().then((result)=>{
    res.redirect('/blogs');
  }).catch((err)=>{
    console.log(err);
  })

})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});


