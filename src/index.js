const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) =>{
//     // console.log(req.method, req.path);

//         res.status(503).send({message:"Maintaniace Mode"})

// })

const multer = require('multer');
const upload = multer({
  dest: 'images/',
  limits : {
    fieldSize: 1000000
  },
  fileFilter(req,file,cb){
    if(!file.originalname.match(/\.(doc|docx)$/)){
      return cb(new Error('Please upload a word document'));
  }

  cb(undefined,Error);
}

})

//  this is how error is handled in express
// const errmiddleware = (req, res, next) => {
//   throw new Error("this is from my middleware error");
// }

app.post('/profile', upload.single('upload'),  (req, res) => {
  res.send();
}, (err, req, res, next) => {
  res.status(400).send({err: err.message});
})

// __________________________________ //

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`app is running on port : ${port}`);
});



// const jwt =require('jsonwebtoken');

// const myFunc = async () => {
//     const token = jwt.sign({_id:'12345'}, 'thisisnew', {expiresIn: '2 days'});
//     console.log(token);
//    const data = jwt.verify(token,'thisisnew');
//     console.log(data);

// }

// myFunc();
// const bcrypt = require('bcryptjs');

// const myFunc = async() => {
//     const password = "Red12345";
//     const hashedPassword = await bcrypt.hash(password, 8);
//     console.log(hashedPassword);
//     console.log(password);

//     const isMatch = await bcrypt.compare('red12345', hashedPassword);
//     console.log(isMatch);
// }

// myFunc();

const Task = require('./models/task');
const User = require('./models/users');

// const main = async () => {
  //  getting task with user id
  // const task = await Task.findById("5ed42e2fc7548f5dfbeb402f");
  // await task.populate('owner').execPopulate()
  // console.log(task.owner);

  // getting each user task with owner id

  // const user = await User.findById("5ed41491893e0040ac9de37a");
  // await user.populate('task').execPopulate();
  // console.log(user.task);

// }

// main()