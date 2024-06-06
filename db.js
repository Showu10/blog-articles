const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Showaiz:Motor2020@articles.hiixuuy.mongodb.net/').then(() => {
    console.log('MongoDB connected!!');
  })
  .catch(err => {
    console.log('Failed to connect to MongoDB', err);
  })
  
  mongoose.articles = mongoose.createConnection('mongodb+srv://Showaiz:Motor2020@articles.hiixuuy.mongodb.net/articles')
  mongoose.users = mongoose.createConnection('mongodb+srv://Showaiz:Motor2020@articles.hiixuuy.mongodb.net/users')
  
  module.exports = mongoose