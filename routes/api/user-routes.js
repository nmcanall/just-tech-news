const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    User.findAll({
        // attributes: {exclude: ["password"]}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/id
router.get("/:id", (req, res) => {
    User.findOne({
        where: {id: req.params.id},
        // attributes: {exclude: ["password"]}
        
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users 
router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST for login at /api/users/login
router.post("/login", (req, res) => {
    // Expects {email: 'lernantino@gmail.com', password: 'password1234'}

    // Check for email first
    User.findOne({
        where: {email: req.body.email}
    }).then(dbUserData => {
        // If email doesn't exist, no need to decrypt and check password
        if(!dbUserData) {
            res.status(400).json({message: "No user with that email address"});
            return;
        }

        // Check given password matches password in database for given email
        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({message: "Sorry, that is an incorrect password"});
            return;
        }
        res.json({user: dbUserData, message: "You are now logged in"});
    });
});

// PUT /api/users/id
router.put("/:id", (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        where: {id: req.params.id},
        individualHooks: true
    })
        .then(dbUserData => {
            if(!dbUserData[0]) {
                res.status(404).json({message: "No user found with this ID"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err});
        });
});

// DELETE /api/users/id
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData[0]) {
                res.status(404).json({message: "No user found with this ID"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err});
        });
});

module.exports = router;