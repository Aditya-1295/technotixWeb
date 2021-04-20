const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Grid = require('gridfs-stream');

// Utils
const { mongoURI } = require('./constants');

// Models
const Event = require('./Model/Event');
const Project = require('./Model/Project');
const Member = require('./Model/Member');
const User = require('./Model/User');

// Routes
const adminRoutes = require('./Routes/admin-routes');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'technotix.bennett@gmail.com',
    pass: 'bennettuniversity'
  }
});

const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;
conn.once('open', function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('events');
});


app.get('/', function (req, res) {
  // mongoose.connect('mongodb+srv://aditya:adityakrgupta@cluster0.dcgvv.mongodb.net/projectsDB');
  Event.find({}, function (err, foundEvent) {
    // console.log(foundEvent);
    Project.find({}, function (errr, foundProject) {
      // console.log(foundProject);
      Member.find({}, function (errrr, foundMember) {
        // var memberCount = foundMember.length
        res.render('home', { events: foundEvent, projects: foundProject, members: foundMember });
      });

    });

  });

});

app.post('/', function (req, res) {
  var mailOptions = {
    from: req.body.cemail,
    to: 'robotics@bennett.edu.in',
    subject: req.body.csubject,
    text: req.body.cmessage
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (!err) {
      console.log('We will get in touch with you shortly !');
      res.redirect('/');
    } else {
      console.log('Seems something is broken :(');
    }
  })
});

app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login', function (req, res) {
  const user = req.body.username;
  const password = req.body.password;

  if (user === 'jadmin' && password === 'admin@password') {
    loggedin = true;
    res.redirect('/admin/dashboard');
  } else {
    //alert('Wrong Username or Password');
    console.log('wrong user name or password');
    res.redirect('/login');
  }
});

app.get("/specificEvent/:eventName", (req, res) => {

    const eventname = req.params.eventName;
    Event.findOne({ eventName: eventname }, (err, foundEvent) => {
        if (!err) {
            res.render("specificEvent", { event: foundEvent });
        } else {
            console.log("error:");
            res.send(err);
        }
    });
});

app.get("/specificProject/:projectName", (req, res) => {
    const projectname = req.params.projectName;
    Project.findOne({ projectName: projectname }, (err, foundProject) => {
        if (!err) {
            res.render("specificProject", { project: foundProject });
        } else {
            console.log("error:");
            res.send(err);
        }
    })
})


app.get("/team/:committee", (req, res) => {
  console.log("here");
    var committee  = req.params.committee;
    Member.find({ memberCommittee: committee }, (err, foundMember) => {
        if (!err) {
            res.render("members", { members: foundMember });
        } else {
            res.send(err);
        }
    });
});

app.get("/event/login" , (req, res) => {
  res.render("crypticLogin");
});

app.post("/event/login" , (req,res) => {

  var email = req.body.email;
  var pass = req.body.password;


  User.findOne({userEmail:email }, (err, foundUser) => {
    if (!err){
      if (foundUser.userPass == pass){
        // res.render("cryptichuntDashboard");
        res.send("Authenticated sucessfully " +email + " " + pass + " " +  foundUser.userPass);
      }else{
        res.send("user not found or email, password dont match "+email + " " + pass + " " +  foundUser.userPass);
      }
    }else{
      res.send(err);
    }
  });


});

app.get("/event/signup" , (req,res) => {
  res.render("crypticSignup");
});

app.post("/event/signup" , (req,res) => {

  const user = new User({
    userName: req.body.username,
    userPass: req.body.password,
    userEmail: req.body.mail,
    userCollege: req.body.college
  });

  user.save(function (err){
    if (!err){
      console.log("User added");
      res.render("crypticLogin");
    }else{
      res.send(err);
    }
  });
});



app.use('/admin', adminRoutes);

let port = process.env.PORT;
if (port == null || port ==""){
  port = 4000;
}

app.listen(port, async function () {
  console.log('server has started on port 4000 or heroku');
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
});
