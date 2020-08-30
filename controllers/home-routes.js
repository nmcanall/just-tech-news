const router = require("express").Router();
const sequelize = require("../config/connection"); // database connection
const {Post, User, Comment} = require("../models"); // Model connection

router.get("/", (req, res) => {
    Post.findAll({
        attributes: [
            "id", 
            "post_url", 
            "title", 
            "created_at",
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ], 
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({plain: true}));
            // Pass in a full object (array), then loop through that array in homepage.handlebars
            res.render("homepage", {posts});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Route to login page
router.get("/login", (req, res) => {
    if(req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("login");
})

// View screen for single post at /post/:id
router.get("/post/:id", (req, res) => {
    Post.findOne({
        where: {id: req.params.id},
        attributes: [
            "id", 
            "post_url", 
            "title", 
            "created_at",
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ], 
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({message: "No post found with this ID"});
                return;
            }

            // Serialize the data
            const post = dbPostData.get({plain: true});

            res.render("single-post", {post});
        })
        .catch(err => {
            console.log(error);
            res.status(500).json(err);
        });
});

module.exports = router;