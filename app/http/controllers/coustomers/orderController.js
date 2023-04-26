const Orders = require('../../../db/order');

function orderController(){
return{
    async store(req,res){
    	try{

var number =`${req.body.number}`;
var address = `${req.body.address}`;

if(!number||!address){
	req.flash('err',"Please fill all feilds");
	 res.redirect('/cart');
}
const nOrder = new Orders({
	coustomerID:req.user._id,
	items:req.session.cart.items,
number:number,
address:address
});
const data = await nOrder.save()
if(!data){
	req.flash('err',"someting went wrong");

	return res.redirect('/cart');
}
req.flash('sucess',"order placed sucessfully");	
delete req.session.cart;
 res.redirect("myorders")
}
catch(err){
console.log(err);
}



    },
    async index(req, res) {
         	
            const custorder = await Orders.find({coustomerID:req.user._id},null,{sort:{ 'createdAt': -1 }})
          return  res.render('coustomer/orders',{custorder:custorder})
        }


}


};

module.exports=orderController;