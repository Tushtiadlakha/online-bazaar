const homeController = require("../app/http/controllers/homeController");
const cartController = require("../app/http/controllers/coustomers/cartController");
const authController = require("../app/http/controllers/authController")
const preventlogandreg = require("../app/http/middlewares/guest");
const orderController = require("../app/http/controllers/coustomers/orderController");
const adminorderController = require("../app/http/controllers/admin/adminorderController");
const auth = require("../app/http/middlewares/auth");
const admin = require("../app/http/middlewares/admin");
const call =(app)=>{
app.get("/" , homeController().index);
app.get("/cart",cartController().index);
app.get("/login",preventlogandreg,authController().login);
app.post("/login",authController().postLogin);
app.post("/logout",authController().logout);
app.get("/register",preventlogandreg,authController().register);
app.post("/register",authController().postRegister);
app.post("/updatecart",cartController().update);
app.post("/deletecart",cartController().delete);
app.post("/addcart",cartController().add);
app.post("/delcart",cartController().del);
app.post("/order",auth,orderController().store);
app.get("/myorders",auth,orderController().index);
app.get("/adminorders",admin,adminorderController().index);
app.post("/adminorders/status",admin,adminorderController().update);
app.get("/:id",auth,adminorderController().viewstatus);

};

module.exports = call;