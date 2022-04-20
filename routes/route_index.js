
const express = require('express');
const router = express.Router();
const User = require('../model/user');
let verify = require('../middleware/verifyAccess');
let bcrypt = require("bcrypt");
let jwt =require("jsonwebtoken")

var app = express();
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let userList= {
  user_name: "Misa",
  email: "Misalchicha@yo.com",
  password: "12345",
  user_id: "1",
  movie_list: [
    {
      title: "Titane",
      description:"Esta muy buena",
      img_path:"https://image.tmdb.org/t/p/w185//qSrHo1HEEMBuK2HrwZGPGJZg7gP.jpg"
    },
    {
      title: "Dont look up",
      description:"Esta muy buena",
      img_path:"https://image.tmdb.org/t/p/w185//38Pcnns6M8cmxNPrvFbw1cT1AW2.jpg"
    }
  ]
}

router.get('/', verify, async function(req,res){

  let users = await User.find()

  res.render('index');
});

router.get('/search', async function(req,res){
  res.render('search');
});

router.get('/about', async function(req,res){
  res.render('about');
});



router.get('/login', async function(req,res){
  res.render('login');
});

router.post('/login', async (req,res)=>{

  let email = req.body.email
  let passw = req.body.password

  let user = await User.findOne({email: email})

  if (!user){
    res.redirect('/login')
  }
  else{
    let valid = await bcrypt.compareSync(passw, user.password)

    if (valid){
      let token = jwt.sign({}, process.env.SECRET, {expiresIn: "2h"});
      console.log(token)
    }
    }

  //res.redirect('/')
})

router.get('/register', async function(req,res){
  res.render('register');
});



router.get('/newUser', async (req,res) =>{
  res.render('newUser');
});

router.post('/newUser', async (req,res) =>{

  let user = new User(req.body)

  user.password = bcrypt.hashSync(user.password,10)
  await user.save()
  res.redirect("/login")

});


router.post('/', async (req,res) =>{

  let user = new User(req.body)
  await user.save()
  res.redirect("/")
});

router.get('/edit/:id', async (req,res) =>{
  let id = req.params.id
  let user = await User.findById(id)

  res.render('edit',{user});
});


// # PENDIENTE
router.post('/edit/:id', async (req,res) =>{
  await User.updateOne({_id:req.params.id},req.body);
  res.redirect("/")
});

// # PENDIENTE
router.post('/delete/:id', async (req,res) =>{
  let id = req.params.id
  await User.remove({_id:id});
  res.redirect("/")
});


router.get('/delete/:id', async (req,res) =>{
  let id = req.params.id
  let user = await User.findById(id)

  res.render('delete',{user});
});

module.exports = router;