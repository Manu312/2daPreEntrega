const {Router} = require('express');
const userModels = require('../model/user.model');
const { createHashValue, isValidPasswd } = require("../util/encrypt");
const { generateJWT } = require("../util/jwt");
const passport = require("passport");
const checkAuthJwt = require("../middleware/auth-jwt.middleware");

class SessionRoute {
    path = '/session';
    router = Router();
    constructor() {
        this.initSessionRoutes();
    }
    initSessionRoutes(){
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
                const pswHashed = await createHashValue(password);

                const addUser = {first_name, last_name, email, age, pswHashed, rol};
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
                const isValidComparePsw = await isValidPasswd(password, findUser.password);
                if(!isValidComparePsw){
                    return res.status(400).json({message: 'invalid password'}).redirect('http://localhost:8080/api/v1/login');
                }
                const token = await generateJWT({
                    email,
                    first_name: user.first_name,
                    age: user.age,
                  }); 
                req.session.user = {email: user.email, first_name: user.first_name, rol: user.rol};
                return res
                    .cookie("cookieToken", token, {
                    maxAge: 60 * 60 * 1000,
                    httpOnly: true, // PROBAR quitando esta opcion y luego accediendo en el navegador en la consola al document.cookie
                    })
                    .send({ message: "login success" }).redirect('http://localhost:8080/api/v1/profile');
            }
            catch (e) {
                console.log(e);
            }
        }); 
        this.router.post("/recover-psw", async (req, res) => {
            try {
              const { new_password, email } = req.body;
              console.log(req.body
              );
          
              const newPswHash = await createHash(new_password);
              const user = await userModels.findOne({ email });
          
              if (!user) {
                return res
                  .status(401)
                  .json({ message: `credentials invalid` });
              }
          
              const updateUser = await userModels.findByIdAndUpdate(user._id, {
                password: newPswHash,
              });
          
              if (!updateUser) {
                return res.json({ message: "problems uploading password" });
              }
          
              return res.render("login");
            } catch (error) {
              console.log(error);
            }
        });
                
        this.router.get("/current", checkAuthJwt("jwt"), async (req, res) => {
            console.log(" VALIDANDO REQ", req.user, req.cookies);
            return res.json({ message: `jwt en las cookies` });
        });
    }
}
module.exports = SessionRoute;