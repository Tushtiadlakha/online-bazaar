const Users = require("../../db/user");
const bcrypt = require("bcrypt");
const passport = require('passport');
const authController= ()=>{
  return{
        login(req,res){
            res.render("auth/login");
        },
 postLogin(req, res, next) {
          var email= `${req.body.email}`
          var  password= `${req.body.password}`
           // Validate request 
            if(!email || !password) {
                req.flash('err', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    req.flash('err', info.message )
                    return next(err)
                }
                if(!user) {
                    req.flash('err', info.message )
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if(err) {
                        req.flash('err', info.message ) 
                        return next(err)
                    }

                    return res.redirect('/')
                })
            })(req, res, next)
        },
        register(req,res){
        res.render("auth/register");
        },

        async postRegister(req,res){
          try{
         var name= `${req.body.name}`;
         var email= `${req.body.email}`;
         var password= `${req.body.password}`;
          if(!name||!email||!password)
          {
                 
             req.flash('err','All feilds required');
            
              req.flash('name',name)
               req.flash('email',email)
                return res.redirect('/register')
          }

          //check if email already exists
          Users.exists({email:email},(err,result)=>{
          if (result) {
            req.flash('err','Email already exists');
            
              req.flash('name',name)
               req.flash('email',email)
                return res.redirect('/register')

          }
            
          });


          
          password = await bcrypt.hash(password, 10);

         const nwuser = await new Users({
           name:name,
           email:email,
           password:password
         });
         const save = await nwuser.save();
         if(save){
          return res.redirect("/login");
         }else{
           req.flash('err','Email already exists');
          
                return res.redirect('/register')
         }

        }catch(err){
          console.log(err);
        }},
        logout(req,res){
           req.logout();
          return res.redirect("/login");

        }

  }	
};


module.exports=authController;