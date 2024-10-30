const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors:[authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
 const course = await Course.updateOne({_id: courseId},{
  $unset:{
    'authors' : ''
  }
 })
//  course.author.name = 'Mosh Hamedani'
//  course.save()
}

async function addAuthor(courseId,author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save()
}

async function removeAuthor(courseId,authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove()
  course.save()
}

removeAuthor('66e13254dba97b903c1b16ad', '66e13254dba97b903c1b16ac')
// addAuthor('66e13254dba97b903c1b16ad',  new Author({ name: 'Dania' }))

// updateAuthor('66e12f6ddbd478ac82dc032a')
// createCourse('Node Course',[
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'John' })
// ]);