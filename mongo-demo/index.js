const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/playground")
    .then(() => console.log("Connected to mongodb..."))
    .catch(err => console.error("Could not connect to mongodb",err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength: 5,
        maxlenght:255
    },
    category:{
        type:String,
        required:true,
        enum:['web',"mobile","network"],
        lowercase:true,
        trim:true
    },
    author:String,
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(v && v.length > 0);
                    }, 4000);
                });
            },
            message: 'A course should have at least 1 tag'
        }
    },
    date:{type:Date,default:Date.now},
    isPublished:Boolean,
    price:{type:Number, required:function(){
        return this.isPublished
    },
    min:10,
    max:150,
    get:v=> Math.round(v),
    set:v=> Math.round(v),
    }
});

const Course = mongoose.model('Course',courseSchema);
async function createCourse(){
    const course = new Course({
        name:"Angular Course",
        category:'Web',
        author: "Mosh",
        tags: ['frontend'],
        isPublished: true ,
        price:15.8
    });
    try{
        const result = await course.save();
        console.log(result);   
    }
    catch(err){
        for (i in err.errors)
          console.log(err.errors[i].message);
    }
}
// createCourse()

async function getCourses(id){
    const pageNumber = 2;
    const pagesize = 10;
   const courses = await Course
//    .find({ price:{ $gte: 10, $lte: 20} })
//    .find({ price: {$in:[10,15,20]}})
//    .find({author: /^Mosh/ })
   .find({_id:id})
//    .skip((pageNumber-1)*pagesize)
//    .limit(pagesize)
   .sort({name:1})
   .select({name:1,price:1,tags:1})
   console.log(courses[0].price);
}
getCourses('66dff79a0bec735d6476c114')


async function updateCourse(id){
    const course = await Course.findByIdAndUpdate({_id:id},{
        $set:{
            author:'Jack',
            isPublished:true
        }
    });
    console.log(course); 
}

// updateCourse("66ded1a0417f7fe3748b2054");

async function removeCourse(id){
    const result = await Course.deleteOne({_id:id});
    console.log(result); 
}
// removeCourse("66ded1a0417f7fe3748b2054")