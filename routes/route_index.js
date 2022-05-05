const express = require('express');
const { token } = require('morgan');
const router = express.Router();
const User = require('../model/user');
const mongoose = require('mongoose')

var app = express();
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var rand = function() {
  return Math.random().toString(36).substr(2); // remove `0.`
}

var tokenFs = function() {
  return rand() + rand(); // to make it longer
}

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

router.get('/login', async function(req,res) {
  res.render('login');
});

router.post('/loginUser', async (req, res) => {
  let mail = req.body["mail"];
  let password = req.body["password"];

  if(mail && password) {
    let response = await User.findOne({ $match: [ { mail: mail }, { password: password } ] })
    
    if(response) {
      let tokenGen = tokenFs();
      console.log(response["_id"].valueOf())
      let tokenRs = await User.updateOne({ "_id" : mongoose.Types.ObjectId(response["_id"].valueOf() )}, { token: tokenGen } )

      if(tokenRs) {
        res.status(200).json({
          message: "success",
          code: 200,
          data: {
            token: tokenGen
          }
        })
      } else {
        res.status(500).json({
          message: "Error, internal error",
          code: 500,
          data: []
        })
      }
    } else {
      res.status(404).json({
        message: "Error, not match password",
        code: 404,
        data: []
      })
    }
  } else {
    res.status(400).json({
      message: "Error, no password or mail",
      code: 400,
      data: []
    })
  }
})

router.get('/register', async function(req,res){
  res.render('register');
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

router.post('/movies', async(req, res) => {
  let body = req.body
  let userId = body["userId"]
  let movieId = body["movieId"]

  let response = await User
                      .insertMany( {_id: userId}, { movie_list: movieId} )
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

router.get('/movies/:id', async(req, res) => {
  let userId = req.params.id
  if(userId) {
    let response = User.findOne({_id: userId}, { movie_list : 1 })
    if(response) {
      res.status(200).json({
        message: 'Success',
        code: 200,
        data: response
      })
    } else {
      res.status(404).json({
        message: 'User has no movies in favorites',
        code: 400,
        data: []
      })
    }
  } else {
    res.status(404).json({
      message: 'Error, no User id',
      code: 400,
      data: []
    })
  }
})

module.exports = router;