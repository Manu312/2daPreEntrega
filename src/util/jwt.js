const jwt = require("jsonwebtoken");

const SECRET_JWT = "96f0ae55e8088b8a4d48b273d2297d943c8ba6cc"; 

const generateJWT = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ user }, SECRET_JWT, { expiresIn: "30m" }, (err, token) => {
      if (err) {
        console.log("JWT - ", err);
        reject("can not generate jwt token");
      }
      resolve(token);
    });
  });
};

module.exports = {
  SECRET_JWT,
  generateJWT,
};