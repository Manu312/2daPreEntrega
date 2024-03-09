const {Router} =  require('express');
const passport = require("passport");
const authMdw = require("../middleware/auth.middleware");

class ViewsRouter{
    router = Router();
    constructor() {
        this.initViewsRouter();
    }
    initViewsRouter(){
        this.router.get(`/login`, async (req, res) => {
            res.render('login');
        });
        this.router.post('/login', passport.authenticate('local', {
            successRedirect: "/",
            failureRedirect: "/faillogin",
            failureFlash: true,
          }));

        this.router.get(`/faillogin`, async (req, res) => {
            res.send('fail login');
        });

        this.router.get(`/register`, async (req, res) => {
            res.render('register');
        });
        this.router.post('/register',
        passport.authenticate("register", {
          successRedirect: "/",
          failureRedirect: "/failregister",
          failureFlash: true,
        })
        );
        this.router.get(`/failregister`, async (req, res) => {
            res.send('fail register');
        });
        this.router.get('/recover', async (req, res) => {
            res.render('recover');
        });
        this.router.get(`/profile`, authMdw,async (req, res) => {
            const admin  = false;
            if(req.session.user === undefined){
                return res.status(401).json({message: 'unauthorized'});
            }else{
                if(req.session.user.rol === 'admin'){
                    admin = true;
                }
                res.render('profile', {user: req.session.user, admin: admin});
            }
        });
    }
}
module.exports = ViewsRouter;