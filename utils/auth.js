// App middleware to force a user back to the login page if not already logged in

const withAuth = (req, res, next) => {
    if(!req.session.user_id) {
        res.redirect("/login");
    }
    else {
        next();
    }
};

module.exports = withAuth;