const { Router } = require('express');


const upload = require('../Utils/Upload');
const router = Router();

const Event = require('../Model/Event');
const Project = require('../Model/Project');
const Member = require('../Model/Member');

let loggedin = false;

router.get('/dashboard', (req, res) => {
    if (true) {
      loggedin = true;
        res.render('adminOptions');
    }
});

router.get("/editMember", (req, res) => {
    if (loggedin) {
        Member.find({}, (err, foundMember) => {
            if (!err) {
                res.render("editMember", { members: foundMember });
            } else {
                console.log(err);
            }
        });
    } else {
        res.redirect("/login");
    }
});

router.post("/editMember", (req, res) => {
    Member.deleteOne({ _id: req.body.delete }, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            console.log("sucessfully deleted" + item);
            res.redirect("/admin/editMember");
        }
    });

});

router.get("/editEvent", (req, res) => {

    if (loggedin) {

        Event.find({}, (err, foundEvent) => {
            if (!err) {
                res.render("editEvent", { events: foundEvent });
            } else {
                console.log(err);
            }
        });
    } else {
        res.redirect("/login");
    }


});

router.post("/editEvent", (req, res) => {



    Event.deleteOne({ _id: req.body.delete }, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            console.log("sucessfully deleted" + item);
            res.redirect("/admin/editEvent");
        }
    });

});

router.get("/editProject", (req, res) => {
    if (loggedin) {
        Project.find({}, (err, foundProject) => {
            if (!err) {
                res.render("editProject", { projects: foundProject });
            } else {
                console.log(err);
            }
        });
    } else {
        res.redirect("/login");
    }


});

router.post("/editProject", (req, res) => {



    Project.deleteOne({ _id: req.body.delete }, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            console.log("sucessfully deleted" + item);
            res.redirect("/admin/editProject");
        }
    });

});

router.get("/dashboard", (req, res) => {
    if (loggedin) {
        res.render("adminOptions");
    } else {
        res.redirect("/login");
    }

});

router.get("/addMember", (req, res) => {
    if (loggedin) {
        res.render("addMember");
    } else {
        res.redirect("/login");
    }
});

router.post("/addmember", upload.single('file'), (req, res) => {
    const photoId = req.file.filename;
    res.render("addMemberDetails", { id: photoId });
});

router.get("/addMemberDetails", (req, res) => {
    res.render("addMemberDetails");
});

router.post("/addMemberDetails", (req, res) => {
    const member = new Member({
        memberName: req.body.name,
        memberPost: req.body.post,
        memberCommittee: req.body.committee,
        year: req.body.year,
        image: req.body.id
    });

    member.save(function (err) {
        if (!err) {
            console.log("Database Updated");
            res.redirect("/admin/addMember");
        } else {
            console.log(err);
        }
    });

});

router.get("/addProject", (req, res) => {
    if (loggedin) {
        res.render("addProject");
    } else {
        res.redirect("/login");
    }

});

router.post("/addProject", upload.single('file'), (req, res) => {
    const photoId = req.file.filename;
    res.render("addProjectDetails", { id: photoId });
});

router.get("/addProjectDetails", (req, res) => {
    if (loggedin) {
        res.render("addProjectDetails");
    } else {
        res.redirect("/login");
    }

});

router.post("/addProjectDetails", (req, res) => {
    const project = new Project({
        projectName: req.body.name,
        projectLink: req.body.link,
        projectDescription: req.body.description,
        image: req.body.id
    });



    project.save(function (err) {
        if (!err) {
            console.log("Database Updated");
            res.redirect("addProject");
        } else {
            console.log(err);
        }
    });

});

router.get("/addEvent", (req, res) => {
    if (loggedin) {
        res.render("addEvent");
    } else {
        res.redirect("/login");
    }

});

router.post("/addEvent", upload.single('file'), (req, res) => {
    const photoId = req.file.filename;
    res.render("addEventDetails", { id: photoId });
});

router.get("/addEventDetails", (req, res) => {
    res.render("upload");
})

router.post("/addEventDetails", (req, res) => {
    const event = new Event({
        eventName: req.body.name,
        eventDate: req.body.date,
        eventDescription: req.body.description,
        image: req.body.id
    });
    event.save(function (err) {
        if (!err) {
            console.log("Database Updated");
            res.redirect("addEvent");
        } else {
            console.log(err);
        }
    });



});

// router.get("/specificEvent/:eventName", (req, res) => {
//
//     const eventname = req.params.eventName;
//     Event.findOne({ eventName: eventname }, (err, foundEvent) => {
//         if (!err) {
//             res.render("specificEvent", { event: foundEvent });
//         } else {
//             console.log("error:");
//             res.send(err);
//         }
//     });
// });
//
// router.get("/specificProject/:projectName", (req, res) => {
//     const projectname = req.params.projectName;
//     Project.findOne({ projectName: projectname }, (err, foundProject) => {
//         if (!err) {
//             res.render("specificProject", { project: foundProject });
//         } else {
//             console.log("error:");
//             res.send(err);
//         }
//     })
// })
//
//
// router.get("/team/:committee", (req, res) => {
//   console.log("here");
//     var committee  = req.params.committee;
//     Member.find({ memberCommittee: committee }, (err, foundMember) => {
//         if (!err) {
//             res.render("members", { members: foundMember });
//         } else {
//             res.send(err);
//         }
//     });
// });

module.exports = router;
