//C:\Program Files\MongoDB\Server\3.2\bin

const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_CONNECTION_URL||"mongodb://localhost:27017/mynewapp22",{useCreateIndex:true,useUnifiedTopology:true,useNewUrlParser:true,useFindAndModify:false});
const connection = mongoose.connection;
connection.once('open',()=>{
	console.log("db connected")
}).catch(err=>{
	console.log("error in conn")
});

module.exports=connection;