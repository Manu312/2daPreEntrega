const {Router} = require('express');
const userModels = require('../model/user.model');

class SessionRoute {
    path = '/session';
    router = Router();
    constructor() {
        this.initCookiesRoutes();
    }
    initCookiesRoutes(){
        this.router.get(`${this.path}/logout`, async (req, res) => {
            try{
                console.log('logout');
                req.session.destroy();
                return res.redirect('http://localhost:8080/api/v1/login');
            }catch(err){
                return res.send({message: 'logout error', body: err});
            }
        });
        this.router.post(`${this.path}/register`, async (req, res) => {
            try {
                console.log('Body register',req.body);
                const {first_name, last_name, email,age, password} = req.body;
                const rol = 'user';

                if(email==='adminCoder@coder.com'&& password ==='cod3r123'){
                    rol= 'admin';
                }

                const addUser = {first_name, last_name, email, age, password, rol};
                if(await  userModels.findOne({email: email})){
                    return res.status(400).json({message: 'user already exists'});
                }
                const newUser = await userModels.create(addUser);
                if(!newUser){
                    return res.status(500).json({message: 'error creating user'});
                }
                req.session.user = {email, first_name, email, age, rol};
                return res.redirect(`http://localhost:8080/api/v1/profile`);
            }
            catch (e) {
                console.log(e);
            }
        }); 
        this.router.post(`${this.path}/login`, async (req, res) => {
            try {
                const {email, password} = req.body;
                const user = await userModels.findOne({email: email, password: password});
                if(!user){
                    return res.status(400).json({message: 'user not found'}).redirect('http://localhost:8080/api/v1/login');
                }
                req.session.user = {email: user.email, first_name: user.first_name, rol: user.rol};
                return res.redirect(`http://localhost:8080/api/v1/profile`);
            }
            catch (e) {
                console.log(e);
            }
        }); 
    }
}
module.exports = SessionRoute;