const router = require("express").Router();
const sequelize = require("../../config/connection");
const {Post, User, Vote, Comment} = require("../../models");

// GET /api/posts
router.get("/", (req, res) => {
    Post.findAll({
        attributes: [
            "id", 
            "post_url", 
            "title", 
            "created_at",
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ], 
        order: [["created_at", "DESC"]],
        include: [
            {
                model: User,
                attributes: ["username"]
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/posts/id
router.get("/:id", (req, res) => {
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
                model: User,
                attributes: ["username"]
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            }
        ]
    })
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({message: "No post found with this ID"});
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/posts
router.post("/", (req, res) => {
    Post.create({
        post_url: req.body.post_url,
        title: req.body.title,
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/posts/upvote
router.put("/upvote", (req, res) => {

    if(req.session) {
        // Upvote function defined in "../../models/Post.js"
        Post.upvote({...req.body, user_id: req.session.user_id}, {Vote, Comment, User})
            .then(updatedPostData => res.json(updatedPostData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

// PUT /api/posts/id
router.put("/:id", (req, res) => {
    // expects {title: 'My New News'}

    Post.update(
        {
            title: req.body.title
        },
        {
            where: {id: req.params.id}
        }

    )
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({message: "No post found at the given ID"});
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/posts/id
router.delete("/:id", (req, res) => {
    Post.destroy(
        {
            where: {id: req.params.id}
        }
    )
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({message: "No post found at the given ID"});
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;