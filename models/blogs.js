// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;//Schema is a constructor function that can be used to create new Schemas

// const blogSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   snippet: {
//     type: String,
//     required: true,
//   },
//   body: {
//     type: String,
//     required: true
//   },
// }, { timestamps: true });

// const Blog = mongoose.model('Blog', blogSchema);//model is a user method
// //the name of the model passed in is important
// //it should start with capital
// //it should be the singular of ur collection name on the cloud
// module.exports = Blog;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;