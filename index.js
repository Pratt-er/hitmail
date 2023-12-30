const express = require('express');
const path = require('path')
const nodemailer = require('nodemailer');

const commentRoute = require("./router/commentRouter");
const { connectionToMongodb } = require('./db/connect')
const Comment = require('./models/comment')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3550

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

connectionToMongodb();

app.use("/comments", commentRoute);

app.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.render('hire', { comments });
  } catch (err) {
    res.status(500).send('Error fetching comments');
                                                                            
  }
});
  

  app.get("/about", async (req, res) => {
    try {
    const comments = await Comment.find();
    res.render('about', { comments });
  } catch (err) {
    res.status(500).send('Error fetching comments');
                                                                            
  }

  });
  
  app.get("/contact", (req, res) => {
    res.render("contact");

  });
  
  app.get("/debt", (req, res) => {
    res.render("debt");

  });
  

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  