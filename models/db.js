const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/Employessdb',{useNewUrlParser:true},(err)=>{
    if(!err){ 
        console.log('MongoDb Connection Succeed')
    }
    else{console.log('Error in db connection:'+err)}
});


require('./employe.model')