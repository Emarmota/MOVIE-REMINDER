const express = require('express');
const router = express.Router();
const User = require('../model/user');

var app = express();
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



router.get('/index', async function(req,res){

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

router.get('/register', async function(req,res){
  res.render('register');
});
router.get('/newUser', async (req,res) =>{
  res.render('newUser');
});

router.post('/newUser', async (req,res) =>{

  let user = new User(req.body)
  await user.save()
  res.redirect("/")
});


router.post('/', async (req,res) =>{

  let user = new User(req.body)
  await user.save()
  res.redirect("/")
});

router.post('/search', async (req,res) =>{
  let user = new User(req.body)
  await user.save()
  res.redirect("search")
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

router.post('/add', async(req, res) => {
  let body = req.body
  let userId = body["userId"]
  let movieId = body["movieId"]

  let response = await User
                        .updateOne( {_id: userId}, { movie_list: movieId} )
                        .exec()
  if(response) {
    res.status(200).json({
      message: 'success',
      code: 200,
      data: []
    })
  } else {
    res.status(400).json({
      message: 'Error',
      code: 400,
      data: []
    })
  }
})

module.exports = router;