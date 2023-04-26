const Orders = require('../../../db/order');

function adminorderController (){

return{

   index(req,res){
      
    Orders.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).populate('coustomerID', '-password').exec((err, orders) => {
               if(req.xhr) {
                   return res.json(orders)
               } else {
                return res.render('admin/order')
               }
           })
    },

    async update(req,res){
     try{
       await Orders.updateOne({_id:req.body.orderId},{status:req.body.status},(err,result)=>{

      if(err){
      	req.flash("err","status not updated ");
       res.redirect("/adminorders");

      }else{
      	res.redirect("/adminorders");
      }


       })}
      catch(err){console.log(err)}

    },
   async viewstatus(req,res){
   	try{
        var statusch = await Orders.findById({_id:req.params.id});
       
       if(statusch){
        res.render("coustomer/status",{statusorder:statusch});

       }else{
       	req.flash('err','No order with such id ');
          res.redirect("/myorders");

       }
}
catch(err){
	console.log(err)
    }
}

}

}

module.exports=adminorderController;