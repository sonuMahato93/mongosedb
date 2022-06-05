const mongoose=require('mongoose')

var employeSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:'This field is required.'
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    city:{
        type:String
    }
});

// custom validation for email
employeSchema.path('email').validate((val)=>{
    emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
     return emailRegex.test(val);
},'Invalid e-mail.')





mongoose.model('Employess',employeSchema)