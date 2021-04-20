const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const crypto = require("crypto");
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const nodemailer = require('nodemailer');



const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mongoURI =
  "mongodb+srv://aditya:adityakrgupta@cluster0.dcgvv.mongodb.net/eventsDB";

const conn = mongoose.createConnection(mongoURI,{useNewUrlParser: true, useUnifiedTopology: true});

var loggedin = false;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:"technotix.bennett@gmail.com",
    pass:"bennettuniversity"
  }
});




let gfs;

conn.once('open', function(){
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('events');
});


// Storage Engine;

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {

          filename: filename,
          bucketName: 'events'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });




const eventSchema = {
  eventName: String,
  eventDate: String,
  eventDescription: String,
  image: String
}

const projectSchema = {
  projectName: String,
  projectLink: String,
  projectDescription: String,
  image: String
}

const memberSchema = {
  memberName: String,
  memberPost: String,
  memberCommittee: String,
  year: String,
  image: String
}

const Event = mongoose.model("Event", eventSchema);

const Project = mongoose.model("Project", projectSchema);

const Member = mongoose.model("Member", memberSchema);



app.get("/editMember", function(req,res){

  if (loggedin){
    mongoose.connect("mongodb+srv://aditya:adityakrgupta@cluster0.dcgvv.mongodb.net/eventsDB");
    Member.find({}, function(err, foundMember){
      if (!err){
        res.render("editMember",{members:foundMember});
      }else{
        console.log(err);
      }
    });
  }else{
    res.redirect("/login");
  }

});

app.post("/editMember", function(req,res){

  mongoose.connect("mongodb+srv://aditya:adityakrgupta@cluster0.dcgvv.mongodb.net/eventsDB");

  Member.deleteOne({_id:req.body.delete}, function(err,item){
    if (err){
      console.log(err);
    }else{
      console.log("sucessfully deleted" + item);
      res.redirect("/editMember");
    }
  });

});

app.get("/editEvent", function(req,res){

  if (loggedin){
    mongoose.connect("mongodb+srv://aditya:adityakrgupta@cluster0.dcgvv.mongodb.net/eventsDB");
    Event.find({}, function(err, foundEvent){
      if (!err){
        res.render("editEvent",{events:foundEvent});
      }else{
        console.log(err);
      }
    });
  }else{
    res.redirect("/login");
  }


});

app.post("/editEvent", function(req,res){

  mongoose.connect("mongodb+srv://aditya:adityakrgupta@cluster0.dcgvv.mongodb.net/eventsDB");

  Event.deleteOne({_id:req.body.delete}, function(err,item){
    if (err){
      console.log(err);
    }else{
      console.log("sucessfully deleted" + item);
      res.redirect("/editEvent");
    }
  });

});

app.get("/editProject", function(req,res){

  if (loggedin){
    mongoose.connect("mongodb+srv://aditya:adityakrgupta@cluster0.dcgvv.mongodb.net/eventsDB");
    Project.find({}, function(err, foundProject){
      if (!err){
        res.render("editProject",{projects:foundProject});
      }else{
        console.log(err);
      }
    });
  }else{
    res.redirect("/login");
  }


});

app.post("/editProject", function(req,res){

  mongoose.connect("mongodb+srv://aditya:adityakrgupta@cluster0.dcgvv.mongodb.net/eventsDB");

  Project.deleteOne({_id:req.body.delete}, function(err,item){
    if (err){
      console.log(err);
    }else{
      console.log("sucessfully deleted" + item);
      res.redirect("/editProject");
    }
  });

});

app.get("/adminOptions", function(req,res){
  if (loggedin){
    res.render("adminOptions");
  }else{
    res.redirect("/login");
  }

});

app.get("/login", function(req,res){
  res.render("login");
});

app.post("/login", function(req,res){
  const user = req.body.username;
  const password = req.body.password;

  if (user === "jadmin" && password === "admin@password"){
    loggedin = true;
    res.render("adminOptions");
  }else{
    //alert("Wrong Username or Password");
    console.log("wrong user name or password");
    res.redirect("/login");
  }
});

app.get("/addMember" , function(req,res){
  if (loggedin){
    res.render("addMember");
  }else{
    res.redirect("/login");
  }

});

app.post("/addmember", upload.single('file'), function(req,res){
  const photoId = req.file.filename;
  res.render("addMemberDetails", {id: photoId});
});

app.get("/addMemberDetails", function(req,res){
  res.render("addMemberDetails");
});

app.post("/addMemberDetails", function(req,res){
  const member = new Member({
    memberName: req.body.name,
    memberPost: req.body.post,
    memberCommittee: req.body.committee,
    year: req.body.year,
    image: req.body.id
  });

  mongoose.connect("mongodb+srv://aditya:adityakrgupta@cluster0.dcgvv.mongodb.net/eventsDB");

  member.save(function(err){
    if (!err){
      console.log("Database Updated");
      res.redirect("addMember");
    }else{
      console.log(err);
    }
  });

});

app.get("/addProject", function(req,res){
  if (loggedin){
    res.render("addProject");
  }else{
    res.redirect("/login");
  }

});

app.post("/addProject", upload.single('file'), function(req,res){
  const photoId = req.file.filename;
  res.render("addProjectDetails", {id: photoId});
});

app.get("/addProjectDetails", function(req,res){
  if (loggedin){
    res.render("addProjectDetails");
  }else{
    res.redirect("/login");
  }

});

app.post("/addProjectDetails", function(req,res){
  const project = new Project({
    projectName: req.body.name,
    projectLink: req.body.link,
    projectDescription: req.body.description,
    image: req.body.id
  });

  mongoose.connect("mongodb+srv://aditya:adityakrgupta@cluster0.dcgvv.mongodb.net/eventsDB");

  project.save(function(err){
    if (!err){
      console.log("Database Updated");
      res.redirect("addProject");
    }else{
      console.log(err);
    }
  });

});

app.get("/addEvent", function(req,res){
  if (loggedin){
    res.render("addEvent.ejs");
  }else{
    res.redirect("/login");
  }

});

app.post("/addEvent", upload.single('file'),function(req,res){
  const photoId = req.file.filename;
  res.render("addEventDetails", {id: photoId});
});

app.get("/addEventDetails",function(req,res){
  res.render("upload");
})

app.post("/addEventDetails", function(req,res){


  const event = new Event({
    eventName: req.body.name,
    eventDate: req.body.date,
    eventDescription: req.body.description,
    image: req.body.id
  });

  mongoose.connect("mongodb+srv://aditya:adityakrgupta@cluster0.dcgvv.mongodb.net/eventsDB");


  event.save(function(err){
    if (!err){
      console.log("Database Updated");
      res.redirect("addEvent");
    }else{
      console.log(err);
    }
  });



});

app.get("/", function(req,res){

  mongoose.connect("mongodb+srv://aditya:adityakrgupta@cluster0.dcgvv.mongodb.net/eventsDB");
  // mongoose.connect("mongodb+srv://aditya:adityakrgupta@cluster0.dcgvv.mongodb.net/projectsDB");



  Event.find({}, function(err, foundEvent){
    console.log(foundEvent);
    Project.find({}, function(errr, foundProject){
      console.log(foundProject);
      Member.find({}, function(errrr, foundMember){
        // var memberCount = foundMember.length
        res.render("home", {events: foundEvent, projects: foundProject, members: foundMember});
      });

    });

  });

});

app.post("/", function(req,res){


  var mailOptions = {
    from:req.body.cemail,
    to:'robotics@bennett.edu.in',
    subject:req.body.csubject,
    text:req.body.cmessage
  };

  transporter.sendMail(mailOptions, function(err,info){
    if (!err){
      console.log("We will get in touch with you shortly !");
      res.redirect("/");
    }else{
      console.log("Seems something is broken :(");
    }
  })


})

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

app.get("/specificEvent/:eventName", function(req,res){
  mongoose.connect("mongodb+srv://aditya:adityakrgupta@cluster0.dcgvv.mongodb.net/eventsDB");
  const eventname = req.params.eventName;
  Event.findOne({eventName:eventname}, function(err, foundEvent){
    if (!err){
      res.render("specificEvent", {event:foundEvent});
    }else{
      console.log("error:");
      res.send(err);
    }
  });
});

app.get("/specificProject/:projectName", function(req,res){
  mongoose.connect("mongodb+srv://aditya:adityakrgupta@cluster0.dcgvv.mongodb.net/eventsDB");
  const projectname = req.params.projectName;
  Project.findOne({projectName:projectname}, function(err,foundProject){
    if(!err){
      res.render("specificProject", {project:foundProject});
    }else{
      console.log("error:");
      res.send(err);
    }
  })
})


app.get("/team/:comm", function(req,res){
  mongoose.connect("mongodb+srv://aditya:adityakrgupta@cluster0.dcgvv.mongodb.net/eventsDB");
  var committee = req.params.comm;
  Member.find({memberCommittee:committee}, function(err,foundMember){
    if (!err){
      res.render("members", {members:foundMember});
    }else{
      res.send(err);
    }
  });
});



let port = process.env.PORT;
if (port == null || port ==""){
  port = 3000;
}




app.listen(port, function(){
  console.log("server has started");
});
