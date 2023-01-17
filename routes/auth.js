const { registerCheck,authJwt } = require("../middleware");
const controller = require("../controllers/auth");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      registerCheck.checkDuplicateUsernameOrEmail,
      registerCheck.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/signout",[authJwt.verifyToken], controller.signout);
};
