const {Router} =  require('express');

class ViewsRouter{
    router = Router();
    constructor() {
        this.initViewsRouter();
    }
    initViewsRouter(){
        this.router.get(`/login`, async (req, res) => {
            res.render('login');
        });
        this.router.get(`/register`, async (req, res) => {
            res.render('register');
        });
        this.router.get(`/profile`, async (req, res) => {
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